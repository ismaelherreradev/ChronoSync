'use client'

import { ElementRef, useRef, type PropsWithChildren } from 'react'
import { useRouter } from 'next/navigation'
import { createBoard } from '@/actions/create-board'
import { X } from 'lucide-react'
import { toast } from 'sonner'

import { useAction } from '@/hooks/use-action'
import { Button } from '@/components/ui/button'
import { Popover, PopoverClose, PopoverContent, PopoverTrigger } from '@/components/ui/popover'

import { FormInput } from './form-input'
import FormPicker from './form-picker'
import { FormSubmit } from './form-submit'

type FormPopoverProps = {
  side?: 'left' | 'right' | 'top' | 'bottom'
  align?: 'start' | 'center' | 'end'
  sideOffset?: number
}

export function FormPopover({
  children,
  side = 'bottom',
  sideOffset = 0,
}: PropsWithChildren<FormPopoverProps>) {
  const router = useRouter()

  const closeRef = useRef<ElementRef<'button'>>(null)
  const { execute, fieldErrors } = useAction(createBoard, {
    onSuccess: (data) => {
      toast.success('Board created')
      closeRef.current?.click()
      router.push(`/board/${data.id}`)
    },
    onError: (error) => {
      toast.error(error)
    },
  })

  function onSubmit(formdata: FormData) {
    const title = formdata.get('title') as string
    const image = formdata.get('image') as string

    execute({ title, image })
  }

  return (
    <Popover>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent className="w-80 pt-3" side={side} sideOffset={sideOffset}>
        <div className="pb-4 text-center text-sm font-medium text-muted-foreground">
          Create board
        </div>
        <PopoverClose ref={closeRef} asChild>
          <Button
            variant="ghost"
            className="absolute right-2 top-2 h-auto w-auto p-2 text-muted-foreground"
          >
            <X className="h-4 w-4" />
          </Button>
        </PopoverClose>
        <form action={onSubmit} className="space-y-4">
          <div className="space-y-4">
            <FormPicker id="image" errors={fieldErrors} />
            <FormInput id="title" label="Board title" type="text" errors={fieldErrors} />
          </div>
          <FormSubmit className="w-full">Create</FormSubmit>
        </form>
      </PopoverContent>
    </Popover>
  )
}
