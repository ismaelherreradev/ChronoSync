'use client'

import { createBoard } from '@/actions/create-board'

import { useAction } from '@/hooks/use-action'
import { FormInput } from '@/components/form/form-input'

export default function Form() {
  const { execute, fieldErrors } = useAction(createBoard, {
    onSuccess: (data) => {
      console.log(data)
    },

    onError: (error) => {
      console.log(error)
    },
  })

  function onSubmit(formData: FormData) {
    const title = formData.get('title') as string

    console.log(title)

    // execute({ title })
  }

  return (
    <form action={onSubmit}>
      <div className="flex flex-col space-y-2">
        <FormInput id="title" label="Board Title" errors={fieldErrors} />
      </div>
    </form>
  )
}
