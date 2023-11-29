'use client'

import { ElementRef, useRef, useState } from 'react'
import { type Board } from '@prisma/client'

import { Button } from '@/components/ui/button'
import { FormInput } from '@/components/form/form-input'

type BoardTitleFormProps = {
  data: Board
}

export function BoardTitleForm({ data }: BoardTitleFormProps) {
  const formRef = useRef<ElementRef<'form'>>(null)
  const inputRef = useRef<ElementRef<'input'>>(null)

  const [isEditing, setIsEditing] = useState(false)

  function enableEditingTimeout() {
    const timeoutId = setTimeout(() => {
      inputRef.current?.focus()
      inputRef.current?.select()
    })

    return () => clearTimeout(timeoutId)
  }

  function enableEditing() {
    setIsEditing(true)
    enableEditingTimeout()
  }

  function disableEditing() {
    setIsEditing(false)
  }

  function onSumit(formData: FormData) {
    const title = formData.get('title') as string

    if (title === data.title) {
      return disableEditing()
    }
    console.log(title)
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
          defaultValue={data.title}
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
      {data.title}
    </Button>
  )
}
