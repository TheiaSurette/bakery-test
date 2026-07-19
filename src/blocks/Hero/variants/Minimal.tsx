import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Section } from '@/components/layout/Section'

interface MinimalHeroProps {
  heading: string
  subheading?: string | null
  links?: Array<{
    label: string
    url: string
    variant?: 'default' | 'outline' | null
  }> | null
}

export function MinimalHero({ heading, subheading, links }: MinimalHeroProps) {
  return (
    <Section className="py-24 sm:py-32">
      <div className="max-w-4xl">
        <h1 className="font-[family-name:var(--font-bebas)] text-7xl uppercase leading-[0.85] sm:text-8xl lg:text-[10rem]">
          {heading}
        </h1>
        {subheading && (
          <p className="mt-8 max-w-2xl text-lg text-muted-foreground sm:text-xl">{subheading}</p>
        )}
        {links && links.length > 0 && (
          <div className="mt-12 flex flex-wrap gap-4">
            {links.map((link, i) => (
              <Button
                key={i}
                variant={link.variant === 'outline' ? 'outline' : 'default'}
                size="xl"
                asChild
              >
                <Link href={link.url}>{link.label}</Link>
              </Button>
            ))}
          </div>
        )}
      </div>
    </Section>
  )
}
