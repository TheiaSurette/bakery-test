import { icons } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Section } from '@/components/layout/Section'

interface AlternatingFeatureProps {
  heading: string
  features: Array<{
    icon?: string | null
    title: string
    description: string
  }>
}

export function AlternatingFeature({ heading, features }: AlternatingFeatureProps) {
  return (
    <Section>
      <div className="text-center">
        <p className="text-sm font-medium uppercase tracking-[0.3em] text-muted-foreground">
          What we offer
        </p>
        <h2 className="mt-4 font-[family-name:var(--font-bebas)] text-6xl uppercase leading-[0.85] sm:text-7xl md:text-8xl">
          {heading}
        </h2>
      </div>
      <div className="mt-16 space-y-24">
        {features.map((feature, i) => {
          const Icon = feature.icon
            ? (icons[feature.icon as keyof typeof icons] ?? null)
            : null

          return (
            <div
              key={i}
              className={cn(
                'flex flex-col items-center gap-10 md:flex-row md:gap-16',
                i % 2 !== 0 && 'md:flex-row-reverse',
              )}
            >
              <div className="flex-1 space-y-5">
                {Icon && (
                  <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10">
                    <Icon className="h-7 w-7 text-primary" />
                  </div>
                )}
                <h3 className="font-[family-name:var(--font-bebas)] text-4xl uppercase leading-[0.9] text-foreground sm:text-5xl">
                  {feature.title}
                </h3>
                <p className="text-base leading-relaxed text-muted-foreground">
                  {feature.description}
                </p>
              </div>
              <div className="flex-1">
                <div className="aspect-[4/3] rounded-2xl bg-muted" />
              </div>
            </div>
          )
        })}
      </div>
    </Section>
  )
}
