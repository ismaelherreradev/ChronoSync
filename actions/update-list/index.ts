'use server'

import { revalidatePath } from 'next/cache'
import { auth } from '@clerk/nextjs'

import { createSafeAction } from '@/lib/create-safe-action'
import { prisma } from '@/lib/db'

import { UpdateList } from './schema'
import { InputType, ReturnType } from './types'

async function handler(data: InputType): Promise<ReturnType> {
  const { userId, orgId } = auth()

  if (!userId || !orgId) {
    return {
      error: 'Unauthorized',
    }
  }

  const { title, id, boardId } = data

  let list

  try {
    list = await prisma.list.update({
      where: {
        id,
        boardId,
        board: {
          orgId,
        },
      },
      data: {
        title,
      },
    })
  } catch (error) {
    return {
      error: 'Failed to update.',
    }
  }

  revalidatePath(`/board/${boardId}`)
  return { data: list }
}

export const updateList = createSafeAction(UpdateList, handler)