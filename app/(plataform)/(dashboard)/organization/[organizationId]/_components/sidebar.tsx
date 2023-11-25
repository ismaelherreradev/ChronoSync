"use client"

import { Plus } from "lucide-react"
import Link from "next/link"

type SidebarProps = {
  storageKey?: string
}

export function Sidebar({ storageKey = "sidebar" }: SidebarProps) {
  return <>Sidbar</>
}
