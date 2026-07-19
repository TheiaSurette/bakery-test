import type { Page } from '@/payload-types'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { RichText } from '@/components/RichText'
import { Section } from '@/components/layout/Section'

type FAQBlockData = Extract<NonNullable<Page['layout']>[number], { blockType: 'faq' }>

export function FAQBlock({ block }: { block: FAQBlockData }) {
  const { heading, items } = block

  if (!items || items.length === 0) return null

  return (
    <Section>
      <div className="mx-auto max-w-3xl">
        {heading && (
          <div className="mb-12 text-center">
            <p className="text-sm font-medium uppercase tracking-[0.3em] text-muted-foreground">
              FAQ
            </p>
            <h2 className="mt-3 font-[family-name:var(--font-bebas)] text-4xl uppercase leading-[0.85] sm:text-5xl">
              {heading}
            </h2>
          </div>
        )}
        <Accordion type="single" collapsible className="w-full">
          {items.map((item, i) => (
            <AccordionItem key={i} value={`item-${i}`} className="border-b border-border">
              <AccordionTrigger className="text-left text-lg font-medium">
                {item.question}
              </AccordionTrigger>
              <AccordionContent>
                <RichText data={item.answer} />
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </Section>
  )
}
