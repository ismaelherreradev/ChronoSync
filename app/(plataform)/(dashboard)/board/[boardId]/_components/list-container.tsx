'use client'

import { useEffect, useState } from 'react'
import { updateCardOrder } from '@/actions/update-card-order'
import { updateListOrder } from '@/actions/update-list-order'
import type { ListWithCards } from '@/types'
import { DragDropContext, Droppable } from '@hello-pangea/dnd'
import { toast } from 'sonner'

import { useAction } from '@/hooks/use-action'

import { ListForm } from './list-form'
import { ListItem } from './list-item'

type ListContainerProps = {
  boardId: string
  data: ListWithCards[]
}

function reorder<T>(list: T[], startIndex: number, endIndex: number): T[] {
  const result = Array.from(list)
  const [removed] = result.splice(startIndex, 1)
  result.splice(endIndex, 0, removed)

  return result
}

export function ListContainer({ boardId, data }: ListContainerProps) {
  const [orderedList, setOrderedList] = useState<ListWithCards[]>(data)

  const { execute: executeUpdateListOrder } = useAction(updateListOrder, {
    onSuccess: () => {
      toast.success('List reordered')
    },
    onError: (error) => {
      toast.error(error)
    },
  })

  const { execute: executeUpdateCardOrder } = useAction(updateCardOrder, {
    onSuccess: () => {
      toast.success('Card reordered')
    },
    onError: (error) => {
      toast.error(error)
    },
  })

  useEffect(() => {
    setOrderedList(data)
  }, [data])

  function onDragEnd(result: any) {
    const { source, destination, type } = result

    if (!destination) {
      return
    }

    // if dropped in the same position
    if (source.droppableId === destination.droppableId && source.index === destination.index) {
      return
    }

    // User moves a list
    if (type === 'list') {
      const items = reorder(orderedList, source.index, destination.index).map((item, index) => ({
        ...item,
        order: index,
      }))

      setOrderedList(items)
      executeUpdateListOrder({ items, boardId })
    }

    // user moves a card
    if (type === 'card') {
      let newOrderedList = [...orderedList]
      // Source and destination list
      const sourceList = newOrderedList.find((list) => list.id === source.droppableId)
      const destList = newOrderedList.find((list) => list.id === destination.droppableId)

      if (!sourceList || !destList) {
        return
      }

      // Check if cards exists on the sourceList
      if (!sourceList.cards) {
        sourceList.cards = []
      }

      // Check if cards exists on the destList
      if (!destList.cards) {
        destList.cards = []
      }

      // Moving the card in the same list
      if (source.droppableId === destination.droppableId) {
        const reorderedCards = reorder(sourceList.cards, source.index, destination.index)

        reorderedCards.forEach((card, idx) => {
          card.order = idx
        })

        sourceList.cards = reorderedCards

        setOrderedList(newOrderedList)
        executeUpdateCardOrder({
          boardId: boardId,
          items: reorderedCards,
        })

        // User moves the card to another list
      } else {
        // Remove card from the source list
        const [movedCard] = sourceList.cards.splice(source.index, 1)

        // Assign the new listId to the moved card
        movedCard.listId = destination.droppableId

        // Add card to the destination list
        destList.cards.splice(destination.index, 0, movedCard)

        sourceList.cards.forEach((card, idx) => {
          card.order = idx
        })

        // Update the order for each card in the destination list
        destList.cards.forEach((card, idx) => {
          card.order = idx
        })

        setOrderedList(newOrderedList)
        executeUpdateCardOrder({
          boardId: boardId,
          items: destList.cards,
        })
      }
    }
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="lists" type="list" direction="horizontal">
        {(provided) => (
          <ol {...provided.droppableProps} ref={provided.innerRef} className="flex h-full gap-x-3">
            {orderedList.map((list, index) => {
              return <ListItem key={list.id} index={index} data={list} />
            })}
            {provided.placeholder}
            <ListForm />
            <div className="w-1 shrink-0" />
          </ol>
        )}
      </Droppable>
    </DragDropContext>
  )
}
