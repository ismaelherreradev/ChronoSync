import { OrganizationList } from "@clerk/nextjs"

export default function CreateOrganizationPage({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <OrganizationList
      hidePersonal
      afterCreateOrganizationUrl="/organization/:id"
      afterSelectOrganizationUrl="/organization/:id"
    />
  )
}
