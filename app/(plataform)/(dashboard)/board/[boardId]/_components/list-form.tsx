'use client'

import { ElementRef, useRef, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { createList } from '@/actions/create-list'
import { Plus, X } from 'lucide-react'
import { toast } from 'sonner'
import { useEventListener, useOnClickOutside } from 'usehooks-ts'

import { useAction } from '@/hooks/use-action'
import { Button } from '@/components/ui/button'
import { FormInput } from '@/components/form/form-input'
import { FormSubmit } from '@/components/form/form-submit'

import { ListWrapper } from './list-wrapper'

export function ListForm() {
  const { execute, fieldErrors } = useAction(createList, {
    onSuccess: (data) => {
      toast.success(`List "${data.title}" created!`)
      disableEditing()
      router.refresh()
    },
    onError: (error) => {
      toast.error(error)
    },
  })

  const router = useRouter()
  const params = useParams()

  const formRef = useRef<ElementRef<'form'>>(null)
  const inputRef = useRef<ElementRef<'input'>>(null)

  const [isEditing, setIsEditing] = useState(false)

  function enableEditing() {
    setIsEditing(true)
    setTimeout(() => {
      inputRef.current?.focus()
    })
  }

  function disableEditing() {
    setIsEditing(false)
  }

  function onKeyDown(e: KeyboardEvent) {
    if (e.key === 'Escape') {
      disableEditing()
    }
  }

  useEventListener('keydown', onKeyDown)
  useOnClickOutside(formRef, disableEditing)

  function onSubmit(formData: FormData) {
    const title = formData.get('title') as string
    const boardId = formData.get('boardId') as string

    execute({
      title,
      boardId,
    })
  }

  if (isEditing) {
    return (
      <ListWrapper>
        <form action={onSubmit} ref={formRef} className="w-full space-y-4 rounded-md  bg-muted p-3">
          <FormInput
            ref={inputRef}
            id="title"
            errors={fieldErrors}
            className="h-7 border-transparent px-2 py-1 text-sm font-medium transition hover:border-input focus:border-input"
            placeholder="Enter list title..."
          />
          <input hidden value={params.boardId} name="boardId" />
          <div className="flex items-center gap-x-1">
            <FormSubmit>Add list</FormSubmit>
            <Button onClick={disableEditing} size="sm" variant="ghost">
              <X className="h-5 w-5" />
            </Button>
          </div>
        </form>
      </ListWrapper>
    )
  }

  return (
    <ListWrapper>
      <button
        onClick={enableEditing}
        className="flex  w-full items-center rounded-md bg-muted/75 p-3 text-sm font-medium transition hover:bg-muted"
      >
        <Plus className="mr-2 h-4 w-4" />
        Add a list
      </button>
    </ListWrapper>
  )
}
