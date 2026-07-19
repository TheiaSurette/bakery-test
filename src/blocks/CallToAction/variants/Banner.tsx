import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Section } from '@/components/layout/Section'

interface BannerCTAProps {
  heading: string
  description?: string | null
  links?: Array<{
    label: string
    url: string
    variant?: 'default' | 'outline' | null
  }> | null
}

export function BannerCTA({ heading, description, links }: BannerCTAProps) {
  const words = heading.split(' ')
  const highlightIndex = Math.max(0, words.length - 1)

  return (
    <Section dark className="py-24 sm:py-32">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-primary/10" />

      <div className="relative z-10 text-center">
        <h2 className="font-[family-name:var(--font-bebas)] text-7xl uppercase leading-[0.85] sm:text-8xl lg:text-9xl">
          {words.map((word, i) => (
            <span key={i}>
              {i === highlightIndex ? (
                <span className="text-primary">{word}</span>
              ) : (
                word
              )}
              {i < words.length - 1 ? ' ' : ''}
            </span>
          ))}
        </h2>
        {description && (
          <p className="mx-auto mt-8 max-w-2xl text-lg text-muted-foreground sm:text-xl">
            {description}
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
      </div>
    </Section>
  )
}
