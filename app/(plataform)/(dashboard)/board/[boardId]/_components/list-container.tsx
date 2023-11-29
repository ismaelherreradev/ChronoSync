import type { ListWithCards } from '@/types'
import { ListForm } from './list-form'

type ListContainerProps = {
  boardId: string
  data: ListWithCards[]
}

export default function ListContainer({ boardId, data }: ListContainerProps) {
  return (
    <ol>
      <ListForm />
      <div className="w-1 shrink-0"></div>
    </ol>
  )
}
