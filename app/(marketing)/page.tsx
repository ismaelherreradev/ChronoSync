import Link from 'next/link'
import { headingFont, textFont } from '@/fonts'
import { Medal } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

export default function MarketingPage() {
  return (
    <div className="flex flex-col items-center  justify-center">
      <div className={cn('flex flex-col items-center justify-center', headingFont.className)}>
        <div className="item-center mb-4 flex rounded-full border bg-amber-100 p-4 uppercase text-amber-700 shadow-md shadow-amber-700">
          <Medal className="mr-2 h-6 w-6" />
          No 1 task managment
        </div>
        <h1 className="mb-6 text-center text-3xl md:text-6xl">Taskify helps team move</h1>
        <div className="to w-fit rounded-md bg-pink-600 bg-gradient-to-r from-fuchsia-600 p-2 px-4 pb-4 text-3xl text-white md:text-6xl">
          work forward.
        </div>
      </div>
      <div
        className={cn(
          'mx-auto mt-4 max-w-xs text-center text-sm text-muted-foreground md:max-w-2xl md:text-xl',
          textFont.className
        )}
      >
        Collaborate, manage projects, and reach new productivity peaks. From high rises to the home
        office, the way your team works is unique—accomplish it all with Taskify.
      </div>
      <Button className="mt-6" size="lg" asChild>
        <Link href="/sign-up">Get Taskify for free</Link>
      </Button>
    </div>
  )
}
