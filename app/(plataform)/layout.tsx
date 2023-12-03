import { ClerkProvider } from '@clerk/nextjs'
import { dark } from '@clerk/themes'
import { Toaster } from 'sonner'

import { ModalProvider } from '@/components/providers/modal-provider'

export default function PlataformLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
      }}
    >
      <Toaster />
      <ModalProvider />
      {children}
    </ClerkProvider>
  )
}
