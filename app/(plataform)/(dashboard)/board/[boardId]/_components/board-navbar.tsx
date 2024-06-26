import { type Board } from '@prisma/client'

import { prisma } from '@/lib/db'

import { BoardOptions } from './board-options'
import { BoardTitleForm } from './board-title-form'

type BoardNavbarProps = {
  data: Board
}

export async function BoardNavbar({ data }: BoardNavbarProps) {
  return (
    <div className="fixed top-14 z-[40] flex h-14 w-full items-center gap-x-4 bg-black/50 px-6">
      <BoardTitleForm data={data} />
      <div className="ml-auto">
        <BoardOptions id={data.id} />
      </div>
    </div>
  )
}
