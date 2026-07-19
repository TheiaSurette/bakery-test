import type { Page } from '@/payload-types'
import { RichText } from '@/components/RichText'
import { Section } from '@/components/layout/Section'

type ContentBlockData = Extract<NonNullable<Page['layout']>[number], { blockType: 'content' }>

export function ContentBlock({ block }: { block: ContentBlockData }) {
  if (!block.content) return null

  return (
    <Section>
      <div className="mx-auto max-w-3xl">
        <RichText data={block.content} />
      </div>
    </Section>
  )
}
