'use client'

import { Draggable } from '@hello-pangea/dnd'
import { Card } from '@prisma/client'

import { useCardModal } from '@/hooks/use-card-modal'

type CardItemProps = {
  data: Card
  index: number
}

export default function CardItem({ data, index }: CardItemProps) {
  const cardModal = useCardModal()

  return (
    <Draggable draggableId={data.id} index={index}>
      {(provided) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          role="button"
          onClick={() => cardModal.onOpen(data.id)}
          className="truncate rounded-md border-2 border-transparent bg-primary-foreground px-3 py-2 text-sm shadow-sm hover:border-background"
        >
          {data.title}
        </div>
      )}
    </Draggable>
  )
}
