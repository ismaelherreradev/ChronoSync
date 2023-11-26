'use server'

import { revalidatePath } from 'next/cache'
import { auth } from '@clerk/nextjs'

import { createSafeAction } from '@/lib/create-safe-action'
import { db } from '@/lib/db'

import { CreateBoard } from './schema'
import type { InputType, ReturnType } from './types'

export default async function handler(data: InputType): Promise<ReturnType> {
  const { userId } = auth()

  if (!userId) {
    return {
      error: 'Unauthorized',
    }
  }

  const { title } = data

  let board

  try {
    board = await db.board.create({
      data: {
        title,
      },
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
