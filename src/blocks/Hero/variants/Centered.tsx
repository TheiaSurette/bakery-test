import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Section } from '@/components/layout/Section'
import { Container } from '@/components/layout/Container'
import type { Media } from '@/payload-types'

interface CenteredHeroProps {
  heading: string
  subheading?: string | null
  image?: Media | string | null
  links?: Array<{
    label: string
    url: string
    variant?: 'default' | 'outline' | null
  }> | null
}

export function CenteredHero({ heading, subheading, image, links }: CenteredHeroProps) {
  const media = typeof image === 'object' ? image : null

  return (
    <Section dark container={false} className="min-h-[85vh] flex items-center py-0">
      {media?.url && (
        <>
          <Image
            src={media.url}
            alt={media.alt}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-black/60" />
        </>
      )}

      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-primary/15" />
      <div className="absolute bottom-1/4 right-1/4 h-[300px] w-[300px] rounded-full bg-accent/10" />

      <Container className="relative z-10 py-24 sm:py-32 text-center">
        <h1 className="font-[family-name:var(--font-bebas)] text-7xl uppercase leading-[0.85] sm:text-8xl md:text-9xl lg:text-[10rem]">
          {heading}
        </h1>
        {subheading && (
          <p className="mx-auto mt-8 max-w-2xl text-lg text-muted-foreground sm:text-xl">
            {subheading}
          </p>
        )}
        {links && links.length > 0 && (
          <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
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
      </Container>
    </Section>
  )
}
