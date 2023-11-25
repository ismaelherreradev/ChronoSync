'use client'

import Link from 'next/link'

import { Plus } from 'lucide-react'

type SidebarProps = {
  storageKey?: string
}

export function Sidebar({ storageKey = 'sidebar' }: SidebarProps) {
  return <>Sidbar</>
}
