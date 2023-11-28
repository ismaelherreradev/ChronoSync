import { auth } from '@clerk/nextjs'

import { capitalizeOrg } from '@/lib/utils'

import { OrgControl } from './_components/org-control'

export async function generateMetadata() {
  const { orgSlug } = auth()

  return {
    title: capitalizeOrg(orgSlug!, '-') || 'organization',
  }
}

export default function OrganizationIdLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <OrgControl />
      {children}
    </>
  )
}
