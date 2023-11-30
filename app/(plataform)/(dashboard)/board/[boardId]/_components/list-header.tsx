'use client'

import { ElementRef, useRef, useState } from 'react'
import { List } from '@prisma/client'
import { toast } from 'sonner'
import { useEventListener } from 'usehooks-ts'

import { useAction } from '@/hooks/use-action'

type ListHeaderProps = {
  data: List
}

export function ListHeader({ data }: ListHeaderProps) {
  return (
    <div className="items-start- flex justify-between gap-x-2 px-2 pt-2 text-sm font-semibold">
      <div className="h-7 w-full border-transparent px-2.5 py-1 text-sm font-medium">
        {data.title}
      </div>
    </div>
  )
}
