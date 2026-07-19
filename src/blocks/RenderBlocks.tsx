import type { Page } from '@/payload-types'
import { HeroBlock } from './Hero/Component'
import { FeatureBlock } from './Feature/Component'
import { CallToActionBlock } from './CallToAction/Component'
import { ContentBlock } from './Content/Component'
import { MediaBlockComponent } from './MediaBlock/Component'
import { FAQBlock } from './FAQ/Component'
import { StatsBlock } from './Stats/Component'
import { TestimonialBlock } from './Testimonial/Component'
import { PricingBlock } from './Pricing/Component'

type BlockData = NonNullable<Page['layout']>[number]

const blockComponents: Record<string, React.ComponentType<{ block: never }>> = {
  hero: HeroBlock as React.ComponentType<{ block: never }>,
  feature: FeatureBlock as React.ComponentType<{ block: never }>,
  cta: CallToActionBlock as React.ComponentType<{ block: never }>,
  content: ContentBlock as React.ComponentType<{ block: never }>,
  mediaBlock: MediaBlockComponent as React.ComponentType<{ block: never }>,
  faq: FAQBlock as React.ComponentType<{ block: never }>,
  stats: StatsBlock as React.ComponentType<{ block: never }>,
  testimonial: TestimonialBlock as React.ComponentType<{ block: never }>,
  pricing: PricingBlock as React.ComponentType<{ block: never }>,
}

export function RenderBlocks({ blocks }: { blocks: BlockData[] | null | undefined }) {
  if (!blocks || blocks.length === 0) return null

  return (
    <>
      {blocks.map((block, i) => {
        const Component = blockComponents[block.blockType]
        if (!Component) return null

        return <Component key={`${block.blockType}-${i}`} block={block as never} />
      })}
    </>
  )
}
