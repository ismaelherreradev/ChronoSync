'use client'

import { forwardRef } from 'react'
import { useFormStatus } from 'react-dom'

import { cn } from '@/lib/utils'
import { Input, InputProps } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

import FormErrors from './form-errors'

interface FormInputProps extends InputProps {
  label?: string
  errors?: Record<string, string[] | undefined>
}

const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  ({ className, label, type, errors, id, disabled, ...props }, ref) => {
    const { pending } = useFormStatus()

    return (
      <div className="space-y-2">
        <div className="space-y-1">
          {label ? (
            <Label htmlFor={id} className="text-xs font-semibold">
              {label}
            </Label>
          ) : null}
          <Input
            ref={ref}
            id={id}
            type={type}
            disabled={pending || disabled}
            className={cn('h-7 px-2 py-1 text-sm', className)}
            aria-describedby={`${id}-error`}
            {...props}
          />
        </div>
        <FormErrors id={id} errors={errors} />
      </div>
    )
  }
)

FormInput.displayName = 'FormInput'

export { FormInput }
