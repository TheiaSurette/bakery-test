import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Section } from '@/components/layout/Section'
import type { Media } from '@/payload-types'

interface SplitHeroProps {
  heading: string
  subheading?: string | null
  image?: Media | string | null
  links?: Array<{
    label: string
    url: string
    variant?: 'default' | 'outline' | null
  }> | null
}

export function SplitHero({ heading, subheading, image, links }: SplitHeroProps) {
  const media = typeof image === 'object' ? image : null

  return (
    <Section dark className="py-20 lg:py-32">
      <div className="absolute top-0 right-0 h-[400px] w-[400px] translate-x-1/3 -translate-y-1/4 rounded-full bg-primary/10" />
      <div className="absolute bottom-0 left-0 h-[250px] w-[250px] -translate-x-1/4 translate-y-1/4 rounded-full bg-accent/10" />

      <div className="relative z-10 grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <h1 className="font-[family-name:var(--font-bebas)] text-7xl uppercase leading-[0.85] sm:text-8xl lg:text-9xl">
            {heading}
          </h1>
          {subheading && (
            <p className="mt-8 max-w-lg text-lg text-muted-foreground sm:text-xl">{subheading}</p>
          )}
          {links && links.length > 0 && (
            <div className="mt-12 flex flex-wrap gap-4">
              {links.map((link, i) => (
                <Button
                  key={i}
                  variant={link.variant === 'outline' ? 'inverted' : 'default'}
                  size="xl"
                  asChild
                >
                  <Link href={link.url}>{link.label}</Link>
                </Button>
              ))}
            </div>
          )}
        </div>
        {media?.url && (
          <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
            <Image
              src={media.url}
              alt={media.alt}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        )}
      </div>
    </Section>
  )
}
