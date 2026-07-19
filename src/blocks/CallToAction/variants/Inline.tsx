import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Section } from '@/components/layout/Section'

interface InlineCTAProps {
  heading: string
  description?: string | null
  links?: Array<{
    label: string
    url: string
    variant?: 'default' | 'outline' | null
  }> | null
}

export function InlineCTA({ heading, description, links }: InlineCTAProps) {
  return (
    <Section className="bg-secondary py-16 sm:py-20">
      <div className="flex flex-col items-center gap-8 text-center sm:flex-row sm:text-left">
        <div className="flex-1">
          <h2 className="font-[family-name:var(--font-bebas)] text-4xl uppercase leading-[0.85] sm:text-5xl lg:text-6xl">
            {heading}
          </h2>
          {description && (
            <p className="mt-4 max-w-xl text-muted-foreground sm:text-lg">{description}</p>
          )}
        </div>
        {links && links.length > 0 && (
          <div className="flex flex-shrink-0 flex-wrap gap-3">
            {links.map((link, i) => (
              <Button
                key={i}
                variant={link.variant === 'outline' ? 'outline' : 'default'}
                size="lg"
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
