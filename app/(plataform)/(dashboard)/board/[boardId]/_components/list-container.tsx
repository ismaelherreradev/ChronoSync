'use client'

import { useEffect, useState } from 'react'
import type { ListWithCards } from '@/types'

import { ListForm } from './list-form'
import { ListItem } from './list-item'

type ListContainerProps = {
  boardId: string
  data: ListWithCards[]
}

export function ListContainer({ boardId, data }: ListContainerProps) {
  const [orderedList, setOrderedList] = useState<ListWithCards[]>(data)

  useEffect(() => {
    setOrderedList(data)
  }, [data])

  return (
    <ol  className="flex h-full gap-x-3">
      {orderedList.map((list, index) => {
        return <ListItem key={list.id} index={index} data={list} />
      })}
      <ListForm />
      <div className="w-1 shrink-0" />
    </ol>
  )
}
