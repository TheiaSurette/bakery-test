import type { Page } from '@/payload-types'
import { CenteredHero } from './variants/Centered'
import { SplitHero } from './variants/Split'
import { MinimalHero } from './variants/Minimal'

type HeroBlockData = Extract<NonNullable<Page['layout']>[number], { blockType: 'hero' }>

export function HeroBlock({ block }: { block: HeroBlockData }) {
  const { heading, subheading, style, image, links } = block

  switch (style) {
    case 'split':
      return <SplitHero heading={heading} subheading={subheading} image={image} links={links} />
    case 'minimal':
      return <MinimalHero heading={heading} subheading={subheading} links={links} />
    default:
      return (
        <CenteredHero heading={heading} subheading={subheading} image={image} links={links} />
      )
  }
}
