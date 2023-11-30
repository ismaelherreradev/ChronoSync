'use client'

import { ElementRef, useRef, useState } from 'react'
import { updateBoard } from '@/actions/update-board'
import { type Board } from '@prisma/client'
import { toast } from 'sonner'

import { useAction } from '@/hooks/use-action'
import { Button } from '@/components/ui/button'
import { FormInput } from '@/components/form/form-input'

type BoardTitleFormProps = {
  data: Board
}

export function BoardTitleForm({ data }: BoardTitleFormProps) {
  const { execute } = useAction(updateBoard, {
    onSuccess: (data) => {
      toast.success(`Board "${data.title}" updated!`)
      setTitle(data.title)
      disableEditing()
    },
    onError: (error) => {
      toast.error(error)
    },
  })

  const formRef = useRef<ElementRef<'form'>>(null)
  const inputRef = useRef<ElementRef<'input'>>(null)

  const [isEditing, setIsEditing] = useState(false)
  const [title, setTitle] = useState(data.title)

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

  function onSumit(formData: FormData) {
    const title = formData.get('title') as string

    if (title === data.title) {
      return disableEditing()
    }

    execute({
      id: data.id,
      title,
    })
  }

  function onBlur() {
    formRef.current?.requestSubmit()
  }

  if (isEditing) {
    return (
      <form
        action={onSumit}
        ref={formRef}
        className="flex items-center gap-x-2"
      >
        <FormInput
          ref={inputRef}
          id="title"
          onBlur={onBlur}
          defaultValue={title}
          className="h-7 border-none border-ring bg-transparent px-[7px] py-1 text-lg font-bold focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-transparent "
        />
      </form>
    )
  }

  return (
    <Button
      onClick={enableEditing}
      variant={'transparent'}
      className="h-auto w-auto p-1 px-2 text-lg font-bold"
    >
      {title}
    </Button>
  )
}
