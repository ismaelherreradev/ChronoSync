import { OrganizationSwitcher, UserButton } from '@clerk/nextjs'
import { Plus } from 'lucide-react'

import { Button } from '@/components/ui/button'
import Logo from '@/components/logo'

export function Navbar() {
  return (
    <div className="fixed top-0 z-50 flex h-14 w-full items-center border-b px-4">
      <div className="flex items-center gap-x-4">
        <div className="hidden md:flex">
          <Logo />
        </div>
        <Button
          size="sm"
          className="hidden h-auto rounded-sm px-2 py-1.5 md:block"
        >
          Create
        </Button>
        <Button size="sm" className="block md:hidden">
          <Plus className="h-4 w-4" />
        </Button>
      </div>
      <div className="ml-auto flex items-center gap-x-2">
        <OrganizationSwitcher
          hidePersonal
          afterCreateOrganizationUrl="/organization/:id"
          afterLeaveOrganizationUrl="/select-org"
          afterSelectOrganizationUrl="/organization/:id"
          appearance={{
            elements: {
              rootBox: {
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              },
            },
          }}
        />
        <UserButton
          afterSignOutUrl="/"
          appearance={{
            elements: {
              avatarBox: {
                height: '30px',
                width: '30px',
              },
            },
          }}
        />
      </div>
    </div>
  )
}
