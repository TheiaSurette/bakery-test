import { icons } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Section } from '@/components/layout/Section'

interface GridFeatureProps {
  heading: string
  features: Array<{
    icon?: string | null
    title: string
    description: string
  }>
}

export function GridFeature({ heading, features }: GridFeatureProps) {
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
      <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((feature, i) => {
          const Icon = feature.icon
            ? (icons[feature.icon as keyof typeof icons] ?? null)
            : null

          return (
            <Card
              key={i}
              className="border-border bg-card transition hover:border-primary/40 hover:shadow-lg"
            >
              <CardContent className="pt-6">
                {Icon && (
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                )}
                <h3 className="font-[family-name:var(--font-bebas)] text-2xl uppercase tracking-wide text-card-foreground">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </Section>
  )
}
