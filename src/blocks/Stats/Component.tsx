import { Section } from '@/components/layout/Section'
import type { Page } from '@/payload-types'

type StatsBlockData = Extract<NonNullable<Page['layout']>[number], { blockType: 'stats' }>

export function StatsBlock({ block }: { block: StatsBlockData }) {
  const { heading, stats } = block

  if (!stats || stats.length === 0) return null

  return (
    <Section className="bg-secondary">
      {heading && (
        <div className="text-center">
          <p className="text-sm font-medium uppercase tracking-[0.3em] text-muted-foreground">
            By the numbers
          </p>
          <h2 className="mt-4 font-[family-name:var(--font-bebas)] text-6xl uppercase leading-[0.85] sm:text-7xl md:text-8xl">
            {heading}
          </h2>
        </div>
      )}
      <div className="mt-14 grid grid-cols-2 divide-x divide-border lg:grid-cols-4">
        {stats.map((stat, i) => (
          <div key={i} className="px-6 text-center">
            <p className="font-[family-name:var(--font-bebas)] text-5xl text-primary md:text-6xl">
              {stat.value}
            </p>
            <p className="mt-3 text-xs font-medium uppercase tracking-[0.2em] text-foreground">
              {stat.label}
            </p>
            {stat.description && (
              <p className="mt-1 text-sm text-muted-foreground">{stat.description}</p>
            )}
          </div>
        ))}
      </div>
    </Section>
  )
}
