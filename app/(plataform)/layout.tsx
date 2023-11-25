import { ClerkProvider } from "@clerk/nextjs"

export default function PlataformLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <ClerkProvider>{children}</ClerkProvider>
}
