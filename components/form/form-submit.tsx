'use client'

import { useFormStatus } from 'react-dom'

import { cn } from '@/lib/utils'
import { Button, ButtonProps } from '@/components/ui/button'

export function FormSubmit({
  variant,
  children,
  size,
  disabled,
  className,
}: ButtonProps & { children: React.ReactNode }) {
  const { pending } = useFormStatus()

  return (
    <Button
      disabled={pending || disabled}
      type="submit"
      variant={variant}
      size={size}
      className={cn(className)}
    >
      {children}
    </Button>
  )
}
