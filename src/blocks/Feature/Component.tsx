import type { Page } from '@/payload-types'
import { GridFeature } from './variants/Grid'
import { AlternatingFeature } from './variants/Alternating'

type FeatureBlockData = Extract<NonNullable<Page['layout']>[number], { blockType: 'feature' }>

export function FeatureBlock({ block }: { block: FeatureBlockData }) {
  const { heading, features, style } = block

  if (!features || features.length === 0) return null

  switch (style) {
    case 'alternating':
      return <AlternatingFeature heading={heading} features={features} />
    default:
      return <GridFeature heading={heading} features={features} />
  }
}
