import type { Page } from '@/payload-types'
import { BannerCTA } from './variants/Banner'
import { InlineCTA } from './variants/Inline'

type CTABlockData = Extract<NonNullable<Page['layout']>[number], { blockType: 'cta' }>

export function CallToActionBlock({ block }: { block: CTABlockData }) {
  const { heading, description, links, style } = block

  switch (style) {
    case 'inline':
      return <InlineCTA heading={heading} description={description} links={links} />
    default:
      return <BannerCTA heading={heading} description={description} links={links} />
  }
}
