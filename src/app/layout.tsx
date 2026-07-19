import type { Metadata } from 'next'
import { Inter, Bebas_Neue } from 'next/font/google'
import './globals.css'
import { getSiteSettings } from '@/lib/queries/globals'

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' })
const bebasNeue = Bebas_Neue({ weight: '400', subsets: ['latin'], variable: '--font-bebas' })

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings()

  return {
    title: {
      default: settings.siteName ?? 'ShipKit',
      template: `%s | ${settings.siteName ?? 'ShipKit'}`,
    },
    description: settings.tagline ?? '',
  }
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${bebasNeue.variable} font-sans`}>{children}</body>
    </html>
  )
}
