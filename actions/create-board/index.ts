'use server'

import { log } from 'console'

import { revalidatePath } from 'next/cache'
import { auth } from '@clerk/nextjs'
import { ACTION, ENTITY_TYPE } from '@prisma/client'

import { createAuditLog } from '@/lib/create-audit-log'
import { createSafeAction } from '@/lib/create-safe-action'
import { prisma } from '@/lib/db'
import { hasAvailableCount, incrementAvailableCount } from '@/lib/org-limit'

import { CreateBoard } from './schema'
import type { InputType, ReturnType } from './types'

export async function handler(data: InputType): Promise<ReturnType> {
  const { userId, orgId } = auth()

  if (!userId || !orgId) {
    return {
      error: 'Unauthorized',
    }
  }

  const canCreate = await hasAvailableCount()

  if (!canCreate) {
    return {
      error:
        'You have reached your limit of free boards. Please upgrade your plan to create more boards.',
    }
  }

  const { title, image } = data

  const [imageId, imageThumbUrl, imageFullUrl, imageLinkHTML, imageUserName] = image.split('|')

  if (!imageId || !imageThumbUrl || !imageFullUrl || !imageUserName || !imageLinkHTML) {
    return {
      error: 'Missing fields. Failed to create board.',
    }
  }

  let board

  try {
    board = await prisma.board.create({
      data: {
        title,
        orgId,
        imageId,
        imageThumbUrl,
        imageFullUrl,
        imageUserName,
        imageLinkHTML,
      },
    })

    await incrementAvailableCount()

    await createAuditLog({
      entityTitle: board.title,
      entityId: board.id,
      entityType: ENTITY_TYPE.BOARD,
      action: ACTION.CREATE,
    })
  } catch (error) {
    return {
      error: 'Failed to create board',
    }
  }

  revalidatePath(`/board/${board.id}`)

  return { data: board }
}

export const createBoard = createSafeAction(CreateBoard, handler)
