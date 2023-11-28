'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { defaultImages } from '@/constants/images'
import { Loader2 } from 'lucide-react'
import { useFormStatus } from 'react-dom'

import { unsplash } from '@/lib/unsplash'
import { cn } from '@/lib/utils'

type FormPickerProps = {
  id: string
  errors?: Record<string, string[] | undefined>
}

export default function FormPicker({ id, errors }: FormPickerProps) {
  const { pending } = useFormStatus()

  const [images, setImages] =
    useState<Array<Record<string, any>>>(defaultImages)
  const [isLoading, setIsLoading] = useState(true)
  const [selectedImageId, setSelectedImageId] = useState(null)

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const result = await unsplash.photos.getRandom({
          collectionIds: ['317099'],
          count: 9,
        })

        if (result && result.response) {
          const newImages = result.response as Array<Record<string, any>>
          setImages(newImages)
        } else {
          console.log('Failed to get images from Unsplash')
        }
      } catch (error) {
        console.log(error)
        setImages(defaultImages)
      } finally {
        setIsLoading(false)
      }
    }

    fetchImages()
  }, [])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-6">
        <Loader2 className="h-6 w-6 animate-spin" />
      </div>
    )
  }

  return (
    <div className="relative">
      <div className="mb-2 grid grid-cols-3 gap-2">
        {images.map((image) => (
          <div
            key={image.id}
            className={cn(
              'group relative aspect-video cursor-pointer bg-muted transition hover:opacity-75',
              pending && 'cursor-auto opacity-50 hover:opacity-50'
            )}
            onClick={() => {
              if (pending) return
              setSelectedImageId(image.id)
            }}
          >
            <Image
              src={image.urls.small}
              alt={image.alt_description}
              fill
              className="rounded-md object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  )
}
