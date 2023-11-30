'use client'

import { ListWithCards } from '@/types'

import { ListHeader } from './list-header'

type ListItemProps = {
  index: number
  data: ListWithCards
}

export function ListItem({ index, data }: ListItemProps) {
  return (
    <li className="h-full w-[272px] shrink-0 select-none">
      <div className="w-full rounded-md bg-muted pb-2 shadow-md">
        <ListHeader data={data} />
      </div>
    </li>
  )
}
