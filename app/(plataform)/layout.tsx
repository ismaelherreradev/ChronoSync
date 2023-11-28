import { ClerkProvider } from '@clerk/nextjs'
import { dark } from '@clerk/themes'
import { Toaster } from 'sonner'

export default function PlataformLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
      }}
    >
      <Toaster />
      {children}
    </ClerkProvider>
  )
}
