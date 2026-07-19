import Link from 'next/link'
import { Check } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Section } from '@/components/layout/Section'
import type { Page } from '@/payload-types'

type PricingBlockData = Extract<NonNullable<Page['layout']>[number], { blockType: 'pricing' }>

export function PricingBlock({ block }: { block: PricingBlockData }) {
  const { heading, description, plans } = block

  if (!plans || plans.length === 0) return null

  return (
    <Section>
      <div className="text-center">
        <p className="text-sm font-medium uppercase tracking-[0.3em] text-muted-foreground">
          Pricing
        </p>
        <h2 className="mt-4 font-[family-name:var(--font-bebas)] text-6xl uppercase leading-[0.85] sm:text-7xl md:text-8xl">
          {heading}
        </h2>
        {description && (
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">{description}</p>
        )}
      </div>
      <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {plans.map((plan, i) => (
          <Card
            key={i}
            className={cn(
              'relative flex flex-col border-border transition hover:border-primary/40 hover:shadow-lg',
              plan.highlighted && 'bg-primary text-primary-foreground border-primary shadow-xl',
            )}
          >
            {plan.highlighted && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                <span className="rounded-full bg-foreground px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-background">
                  Most Popular
                </span>
              </div>
            )}
            <CardHeader className="text-center">
              <h3 className="font-[family-name:var(--font-bebas)] text-3xl uppercase tracking-wide">
                {plan.name}
              </h3>
              <div className="mt-4">
                <span
                  className={cn(
                    'font-[family-name:var(--font-bebas)] text-5xl md:text-6xl',
                    plan.highlighted ? 'text-primary-foreground' : 'text-primary',
                  )}
                >
                  {plan.price}
                </span>
                {plan.period && (
                  <span
                    className={cn(
                      'ml-1 text-sm',
                      plan.highlighted ? 'text-primary-foreground/70' : 'text-muted-foreground',
                    )}
                  >
                    {plan.period}
                  </span>
                )}
              </div>
              {plan.description && (
                <p
                  className={cn(
                    'mt-3 text-sm',
                    plan.highlighted ? 'text-primary-foreground/70' : 'text-muted-foreground',
                  )}
                >
                  {plan.description}
                </p>
              )}
            </CardHeader>
            <CardContent className="flex-1">
              {plan.features && plan.features.length > 0 && (
                <ul className="space-y-3">
                  {plan.features.map((f, j) => (
                    <li key={j} className="flex items-start gap-3 text-sm">
                      <Check
                        className={cn(
                          'mt-0.5 h-4 w-4 flex-shrink-0',
                          plan.highlighted ? 'text-primary-foreground' : 'text-primary',
                        )}
                      />
                      <span
                        className={cn(
                          plan.highlighted
                            ? 'text-primary-foreground/80'
                            : 'text-muted-foreground',
                        )}
                      >
                        {f.feature}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>
            <CardFooter>
              {plan.link?.url && (
                <Button
                  variant={plan.highlighted ? 'inverted' : 'default'}
                  size="xl"
                  className="w-full"
                  asChild
                >
                  <Link href={plan.link.url}>{plan.link.label ?? 'Get started'}</Link>
                </Button>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>
    </Section>
  )
}
