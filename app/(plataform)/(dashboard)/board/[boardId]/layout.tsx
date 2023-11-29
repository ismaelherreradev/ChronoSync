import { type PropsWithChildren } from 'react'
import { notFound, redirect } from 'next/navigation'
import { auth } from '@clerk/nextjs'

import { db } from '@/lib/db'

type Props = PropsWithChildren<{
  params: {
    boardId: string
  }
}>

export default async function BoardLayout({ children, params }: Props) {
  const { orgId } = auth()

  if (!orgId) {
    redirect('/select-org')
  }

  const board = await db.board.findUnique({
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
      className="relative h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${board.imageFullUrl})` }}
    >
      <main className="relative h-full pt-28">{children}</main>
    </div>
  )
}
