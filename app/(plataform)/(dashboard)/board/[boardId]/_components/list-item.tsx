'use client'

import { ElementRef, useRef, useState } from 'react'
import { ListWithCards } from '@/types'

import { ListHeader } from './list-header'

type ListItemProps = {
  index: number
  data: ListWithCards
}

export function ListItem({ index, data }: ListItemProps) {
  const textareaRef = useRef<ElementRef<'textarea'>>(null)

  const [isEditing, setIsEditing] = useState(false)

  function disableEditing() {
    setIsEditing(false)
  }

  function enableEditing() {
    setIsEditing(true)
    setTimeout(() => {
      textareaRef.current?.focus()
    })
  }

  return (
    <li className="h-full w-[272px] shrink-0 select-none">
      <div className="w-full rounded-md bg-muted pb-2 shadow-md">
        <ListHeader onAddCard={enableEditing} data={data} />
      </div>
    </li>
  )
}
