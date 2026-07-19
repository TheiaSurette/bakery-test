import { getHeader, getFooter } from '@/lib/queries/globals'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const [header, footer] = await Promise.all([getHeader(), getFooter()])

  return (
    <>
      <Header data={header} />
      <main className="min-h-[calc(100vh-4rem)]">{children}</main>
      <Footer data={footer} />
    </>
  )
}
