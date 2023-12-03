import Link from 'next/link'
import { redirect } from 'next/navigation'
import { MAX_FREE_BOARDS } from '@/constants/boards'
import { auth } from '@clerk/nextjs'
import { HelpCircle, User2 } from 'lucide-react'

import { prisma } from '@/lib/db'
import { getAvailableCount } from '@/lib/org-limit'
import { Skeleton } from '@/components/ui/skeleton'
import { FormPopover } from '@/components/form/form-popover'
import { Hint } from '@/components/hint'

export async function BoardList() {
  const { orgId } = auth()

  if (!orgId) {
    return redirect('/select-org')
  }

  const boards = await prisma.board.findMany({
    where: {
      orgId,
    },
    orderBy: {
      createdAt: 'desc',
    },
  })

  const availableCount = await getAvailableCount()

  return (
    <div className="space-y-4">
      <div className="flex items-center text-lg font-semibold text-muted-foreground">
        <User2 className="mr-2 h-6 w-6" />
        Your boards
      </div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {boards.map((board) => (
          <Link
            key={board.id}
            href={`/board/${board.id}`}
            className="group relative flex aspect-video h-full w-full flex-col items-center overflow-hidden rounded-md bg-muted bg-cover bg-center bg-no-repeat p-2"
            style={{ backgroundImage: `url(${board.imageThumbUrl})` }}
          >
            <div className="absolute inset-0 bg-black/30 transition group-hover:bg-black/40">
              <p className="relative p-2 font-semibold text-white">{board.title}</p>
            </div>
          </Link>
        ))}
        <FormPopover sideOffset={10} side="right">
          <div
            role="button"
            className="relative flex aspect-video h-full w-full flex-col items-center 
          justify-center gap-y-1 rounded-md bg-muted transition hover:opacity-75"
          >
            <p className="text-sm">Create new board</p>
            <span className="text-xs">{`${MAX_FREE_BOARDS - availableCount} remaining`}</span>
            <Hint
              sideOffset={40}
              description={`Free Workspagit aces can have up to 5 open boards. For unlimited boards, upgrade this workspace.`}
            >
              <HelpCircle className="absolute bottom-2 right-2 h-[14px] w-[14px]" />
            </Hint>
          </div>
        </FormPopover>
      </div>
    </div>
  )
}

BoardList.Skeleton = function SkeletonBoardList() {
  return (
    <div className="gird-cols-2 grid gap-4 sm:grid-cols-3 lg:grid-cols-4">
      <Skeleton className="aspect-video h-full w-full p-2" />
      <Skeleton className="aspect-video h-full w-full p-2" />
      <Skeleton className="aspect-video h-full w-full p-2" />
      <Skeleton className="aspect-video h-full w-full p-2" />
      <Skeleton className="aspect-video h-full w-full p-2" />
      <Skeleton className="aspect-video h-full w-full p-2" />
      <Skeleton className="aspect-video h-full w-full p-2" />
      <Skeleton className="aspect-video h-full w-full p-2" />
    </div>
  )
}
