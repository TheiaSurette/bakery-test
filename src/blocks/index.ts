import type { Block } from 'payload'
import { Hero } from './Hero/config'
import { Content } from './Content/config'
import { CallToAction } from './CallToAction/config'
import { Feature } from './Feature/config'
import { FAQ } from './FAQ/config'
import { MediaBlock } from './MediaBlock/config'
import { Testimonial } from './Testimonial/config'
import { Pricing } from './Pricing/config'
import { Stats } from './Stats/config'

export const blocks: Block[] = [
  Hero,
  Content,
  CallToAction,
  Feature,
  FAQ,
  MediaBlock,
  Testimonial,
  Pricing,
  Stats,
  // [SHIPKIT:BLOG]
  // [SHIPKIT:EVENTS]
]
