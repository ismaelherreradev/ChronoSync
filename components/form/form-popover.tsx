'use client'

import { type PropsWithChildren } from 'react'
import { CreateBoard } from '@/actions/create-board/schema'
import { X } from 'lucide-react'

import { useAction } from '@/hooks/use-action'
import { Button } from '@/components/ui/button'
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

import { FormInput } from './form-input'
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
  return (
    <Popover>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent className="w-80 pt-3" side={side} sideOffset={sideOffset}>
        <div className="pb-4 text-center text-sm font-medium text-muted-foreground">
          Create board
        </div>
        <PopoverClose asChild>
          <Button
            variant="ghost"
            className="absolute right-2 top-2 h-auto w-auto p-2 text-muted-foreground"
          >
            <X className="h-4 w-4" />
          </Button>
        </PopoverClose>
        <form></form>
      </PopoverContent>
    </Popover>
  )
}
