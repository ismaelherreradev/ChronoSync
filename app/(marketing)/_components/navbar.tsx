import Link from 'next/link'

import { Button } from '@/components/ui/button'

import Logo from '@/components/logo'

export function Navbar() {
  return (
    <div className="fixed top-0 flex h-16 w-full items-center border-b px-4">
      <div className="mx-auto flex w-full items-center justify-between md:max-w-screen-2xl">
        <Logo />
        <div className="flex w-full items-center justify-between space-x-4 md:block md:w-auto">
          <Button size="sm" variant="outline" asChild>
            <Link href="/sign-in">Login</Link>
          </Button>
          <Button size="sm" asChild>
            <Link href="/sign-up">Get Taskify for free</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
