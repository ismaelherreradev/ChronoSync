import { useCallback, useState } from 'react'

import type { ActionState, FieldErrors } from '@/lib/create-safe-action'

type Action<TInput, TOutput> = (data: TInput) => Promise<ActionState<TInput, TOutput>>

type UseActionOptions<TOutput> = {
  onSuccess?: (data: TOutput) => void
  onError?: (error: string) => void
  onCompleted?: () => void
}

export function useAction<TInput, TOutput>(
  action: Action<TInput, TOutput>,
  options: UseActionOptions<TOutput> = {}
) {
  const [fieldErrors, setFieldErrors] = useState<FieldErrors<TInput> | undefined>(undefined)

  const [error, setError] = useState<string | null>(null)
  const [data, setData] = useState<TOutput | undefined>(undefined)
  const [isLoading, setIsLoading] = useState(false)

  const execute = useCallback(
    async (data: TInput) => {
      setIsLoading(true)

      try {
        const result = await action(data)

        if (!result) {
          return
        }

        setFieldErrors(result.fieldErrors)

        if (result.error) {
          setError(result.error)
          options.onError?.(result.error)
        }

        if (result.data) {
          setData(result.data)
          options.onSuccess?.(result.data)
        }
      } finally {
        setIsLoading(false)
        options.onCompleted?.()
      }
    },
    [action, options]
  )

  return {
    execute,
    data,
    isLoading,
    error,
    fieldErrors,
  }
}
