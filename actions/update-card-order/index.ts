'use server'

import { revalidatePath } from 'next/cache'
import { auth } from '@clerk/nextjs'

import { createSafeAction } from '@/lib/create-safe-action'
import { prisma } from '@/lib/db'

import { UpdateCardOrder } from './schema'
import { InputType, ReturnType } from './types'

async function handler(data: InputType): Promise<ReturnType> {
  const { userId, orgId } = auth()

  if (!userId || !orgId) {
    return {
      error: 'Unauthorized',
    }
  }

  const { items, boardId } = data

  let updatedCards

  try {
    const transaction = items.map((card) =>
      prisma.card.update({
        where: {
          id: card.id,
          list: {
            board: {
              orgId,
            },
          },
        },
        data: {
          order: card.order,
          listId: card.listId,
        },
      })
    )

    updatedCards = await prisma.$transaction(transaction)
  } catch (error) {
    return {
      error: 'Failed to reorder.',
    }
  }

  revalidatePath(`/board/${boardId}`)
  return { data: updatedCards }
}

export const updateCardOrder = createSafeAction(UpdateCardOrder, handler)
