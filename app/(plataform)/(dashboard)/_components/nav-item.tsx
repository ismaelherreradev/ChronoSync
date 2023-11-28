import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import { Activity, Layout, Settings } from 'lucide-react'

import { cn } from '@/lib/utils'
import { AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'

export type Organization = {
  id: string
  name: string
  imageUrl: string
  slug: string
}

type NavItemProps = {
  organization: Organization
  isActive: boolean
  isExpanded: boolean
  onExpand: (id: string) => void
}

export function NavItem({ organization, isActive, isExpanded, onExpand }: NavItemProps) {
  const router = useRouter()
  const pathname = usePathname()

  const routes = [
    {
      label: 'Board',
      icon: <Layout className="mr-2 h-2 w-2" />,
      href: `/organization/${organization.id}`,
    },
    {
      label: 'Activity',
      icon: <Activity className="mr-2 h-2 w-2" />,
      href: `/organization/${organization.id}/activity`,
    },
    {
      label: 'Settings',
      icon: <Settings className="mr-2 h-2 w-2" />,
      href: `/organization/${organization.id}/settings`,
    },
    {
      label: 'Billing',
      icon: <Settings className="mr-2 h-2 w-2" />,
      href: `/organization/${organization.id}/billing`,
    },
  ]

  function onClick(href: string) {
    router.push(href)
  }

  return (
    <AccordionItem value={organization.id} className="border-none">
      <AccordionTrigger
        onClick={() => onExpand(organization.id)}
        className={cn(
          'flex items-center gap-x-2 rounded-md p-1.5 text-start no-underline transition hover:bg-muted hover:no-underline',
          isActive && !isExpanded && 'bg-muted'
        )}
      >
        <div className="flex items-center gap-x-2">
          <div className="relative h-7 w-7">
            <Image fill src={organization.imageUrl} alt={organization.name} className="rounded-sm object-cover" />
          </div>
          <span className="text-sm font-medium">{organization.name}</span>
        </div>
      </AccordionTrigger>
      <AccordionContent className="pt-1">
        {routes.map(({ label, icon, href }) => (
          <Button
            key={href}
            size="sm"
            onClick={() => onClick(href)}
            className={cn(
              'mb-1 w-full justify-start pl-10 font-normal transition hover:bg-muted',
              pathname === href && 'bg-muted'
            )}
            variant="ghost"
          >
            {icon}
            {label}
          </Button>
        ))}
      </AccordionContent>
    </AccordionItem>
  )
}

NavItem.Skeleton = function SkeletonNavItem() {
  return (
    <div className="flex items-center gap-x-2">
      <div className="relative h-10 w-10 shrink-0">
        <Skeleton className="absolute h-full w-full" />
      </div>
      <Skeleton className="h-10 w-full" />
    </div>
  )
}
