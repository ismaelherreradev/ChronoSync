'use client'

import Link from 'next/link'
import { useOrganization, useOrganizationList } from '@clerk/nextjs'
import { Plus } from 'lucide-react'
import { useLocalStorage } from 'usehooks-ts'

import { Button } from '@/components/ui/button'

type SidebarProps = {
  storageKey?: string
}

export function Sidebar({ storageKey = 'sidebar' }: SidebarProps) {
  return <>Sidbar</>
}
