import { type PropsWithChildren } from 'react'
import { notFound, redirect } from 'next/navigation'
import { auth } from '@clerk/nextjs'

import { prisma } from '@/lib/db'

import { BoardNavbar } from './_components/board-navbar'

type Props = PropsWithChildren<{
  params: {
    boardId: string
  }
}>

export async function generateMetadata({
  params,
}: {
  params: { boardId: string }
}) {
  const { orgId } = auth()

  if (!orgId) {
    return {
      title: 'Board',
    }
  }

  const board = await prisma.board.findUnique({
    where: {
      id: params.boardId,
      orgId,
    },
  })

  return {
    title: board?.title || 'Board',
  }
}

export default async function BoardLayout({ children, params }: Props) {
  const { orgId } = auth()

  if (!orgId) {
    redirect('/select-org')
  }

  const board = await prisma.board.findUnique({
    where: {
      id: params.boardId,
      orgId,
    },
  })

  if (!board) {
    notFound()
  }

  return (
    <div
      className="relative h-full bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${board.imageFullUrl})` }}
    >
      <BoardNavbar data={board} />
      <main className="relative h-screen pt-28">{children}</main>
    </div>
  )
}
