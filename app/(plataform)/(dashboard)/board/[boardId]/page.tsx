import { redirect } from 'next/navigation'
import { auth } from '@clerk/nextjs'

import { db } from '@/lib/db'

import ListContainer from './_components/list-container'

type BoardIdPageProps = {
  params: {
    boardId: string
  }
}

export default async function BoardIdPage({ params }: BoardIdPageProps) {
  const { orgId } = auth()

  if (!orgId) {
    redirect('/select-org')
  }

  const lists = await db.list.findMany({
    where: {
      boardId: params.boardId,
      board: {
        orgId,
      },
    },
    include: {
      cards: {
        orderBy: {
          order: 'asc',
        },
      },
    },
    orderBy: {
      order: 'asc',
    },
  })

  return (
    <div className="h-full overflow-x-auto p-4">
      <ListContainer boardId={params.boardId} data={lists} />
    </div>
  )
}
