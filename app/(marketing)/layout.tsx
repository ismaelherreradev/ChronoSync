export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="bg-background h-full">
      <main className="bg-background py-40">{children}</main>
    </div>
  )
}
