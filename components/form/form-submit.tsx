'use client'

import { useFormStatus } from 'react-dom'

import { cn } from '@/lib/utils'
import { Button, ButtonProps } from '@/components/ui/button'

export function FormSubmit({
  variant,
  children,
  size,
  className,
}: ButtonProps & { children: React.ReactNode }) {
  return (
    <Button
      type="submit"
      variant={variant}
      size={size}
      className={cn(className)}
    >
      {children}
    </Button>
  )
}
