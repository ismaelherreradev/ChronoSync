import { OrganizationProfile } from '@clerk/nextjs'

export default function Settingspage() {
  return (
    <div className="w-full">
      <OrganizationProfile
        appearance={{
          elements: {
            rootBox: {
              boxShadow: 'none',
              width: '100%',
            },
            card: {
              boxShadow: 'none',
              width: '100%',
            },
          },
        }}
      />
    </div>
  )
}
