import Link from 'next/link'
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'
import { MobileNav } from './MobileNav'
import type { Header as HeaderType, Page } from '@/payload-types'

interface NavLink {
  label: string
  url: string
  newTab: boolean
}

function getNavLinks(header: HeaderType): NavLink[] {
  if (!header.navLinks) return []

  return header.navLinks
    .map((item) => {
      const label = item.label
      if (!label) return null

      let url = '/'
      if (item.link?.type === 'internal' && item.link.reference) {
        const ref = item.link.reference as Page
        url = ref.slug === 'home' ? '/' : `/${ref.slug}`
      } else if (item.link?.type === 'external' && item.link.url) {
        url = item.link.url
      } else {
        return null
      }

      return { label, url, newTab: item.newTab ?? false }
    })
    .filter((link): link is NavLink => link !== null)
}

export function Header({ data }: { data: HeaderType }) {
  const links = getNavLinks(data)

  return (
    <header className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-lg">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="font-[family-name:var(--font-bebas)] text-2xl tracking-tight text-foreground">
          ShipKit
        </Link>

        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList>
            {links.map((link, i) => (
              <NavigationMenuItem key={i}>
                <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                  <Link
                    href={link.url}
                    target={link.newTab ? '_blank' : undefined}
                    rel={link.newTab ? 'noopener noreferrer' : undefined}
                  >
                    {link.label}
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        <MobileNav links={links} />
      </div>
    </header>
  )
}
