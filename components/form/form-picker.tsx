'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { defaultImages } from '@/constants/images'
import { Check, Loader2 } from 'lucide-react'
import { useFormStatus } from 'react-dom'

import { unsplash } from '@/lib/unsplash'
import { cn } from '@/lib/utils'

import { FormErrors } from './form-errors'

type FormPickerProps = {
  id: string
  errors?: Record<string, string[] | undefined>
}

export default function FormPicker({ id, errors }: FormPickerProps) {
  const { pending } = useFormStatus()

  const [images, setImages] = useState<Array<Record<string, any>>>(defaultImages)
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
              'group relative aspect-video cursor-pointer  bg-muted transition hover:opacity-75',
              pending && 'cursor-auto opacity-50 hover:opacity-50'
            )}
            onClick={() => {
              if (pending) return
              setSelectedImageId(image.id)
            }}
          >
            <input
              type="radio"
              id={id}
              name={id}
              className="hidden"
              onChange={() => (selectedImageId === image.id ? null : null)}
              checked={selectedImageId === image.id}
              disabled={pending}
              value={`${image.id}|${image.urls.thumb}|${image.urls.full}|${image.links.html}|${image.user.name}`}
            />
            <Image
              src={image.urls.small}
              alt={image.alt_description}
              fill
              className="overflow-hidden rounded-md object-cover"
            />
            {selectedImageId === image.id && (
              <div className="absolute inset-y-0 flex h-full w-full items-center justify-center bg-black/30">
                <Check className="h-4 w-4 text-white" />
              </div>
            )}
            <Link
              href={image.links.html}
              target="_blank"
              className="absolute bottom-0 w-full truncate bg-black/50 p-1 text-[10px] opacity-0 hover:underline group-hover:opacity-100"
            >
              {image.user.name}
            </Link>
          </div>
        ))}
      </div>
      <FormErrors errors={errors} id="image" />
    </div>
  )
}
