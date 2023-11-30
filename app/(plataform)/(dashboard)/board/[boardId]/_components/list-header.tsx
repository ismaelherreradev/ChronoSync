import { ElementRef, useRef, useState } from 'react'
import { updateList } from '@/actions/update-list'
import { List } from '@prisma/client'
import { toast } from 'sonner'
import { useEventListener } from 'usehooks-ts'

import { useAction } from '@/hooks/use-action'
import { FormInput } from '@/components/form/form-input'

import { ListOptions } from './list-options'

type ListHeaderProps = {
  data: List
  onAddCard: () => void
}

export function ListHeader({ data, onAddCard }: ListHeaderProps) {
  const { execute } = useAction(updateList, {
    onSuccess: (data) => {
      toast.success(`Renamed to "${data.title}"`)
      setTitle(data.title)
      disableEditing()
    },
    onError: (error) => {
      toast.error(error)
    },
  })

  const [title, setTitle] = useState(data.title)
  const [isEditing, setIsEditing] = useState(false)

  const formRef = useRef<ElementRef<'form'>>(null)
  const inputRef = useRef<ElementRef<'input'>>(null)

  function enableEditing() {
    setIsEditing(true)
    setTimeout(() => {
      inputRef.current?.focus()
      inputRef.current?.select()
    })
  }

  function disableEditing() {
    setIsEditing(false)
  }

  function onBlur() {
    formRef.current?.requestSubmit()
  }

  function onKeyDown(e: KeyboardEvent) {
    if (e.key === 'Escape') {
      formRef.current?.requestSubmit()
    }
  }

  function onSumit(formData: FormData) {
    const title = formData.get('title') as string
    const id = formData.get('id') as string
    const boardId = formData.get('boardId') as string

    if (title === data.title) {
      return disableEditing()
    }

    execute({
      title,
      id,
      boardId,
    })
  }

  useEventListener('keydown', onKeyDown)

  return (
    <div className="items-start- flex justify-between gap-x-2 px-2 pt-2 text-sm font-semibold">
      {isEditing ? (
        <form ref={formRef} action={onSumit} className="flex-1 px-[2px]">
          <input hidden id="id" name="id" value={data.id} />
          <input hidden id="boardId" name="boardId" value={data.boardId} />
          <FormInput
            ref={inputRef}
            onBlur={onBlur}
            id="title"
            placeholder="Enter list title.."
            defaultValue={title}
            className="h-7 truncate border-transparent bg-transparent px-[7px] py-1 text-sm font-medium"
          />
          <button type="submit" hidden />
        </form>
      ) : (
        <div
          onClick={enableEditing}
          className="h-7 w-full border-transparent px-2.5 py-1 text-sm font-medium"
        >
          {title}
        </div>
      )}
      <ListOptions onAddCard={onAddCard} data={data} />
    </div>
  )
}
