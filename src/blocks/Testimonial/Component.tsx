import type { Page } from '@/payload-types'
import { GridTestimonial } from './variants/Grid'
import { CarouselTestimonial } from './variants/Carousel'

type TestimonialBlockData = Extract<
  NonNullable<Page['layout']>[number],
  { blockType: 'testimonial' }
>

export function TestimonialBlock({ block }: { block: TestimonialBlockData }) {
  const { heading, testimonials, style } = block

  if (!testimonials || testimonials.length === 0) return null

  switch (style) {
    case 'carousel':
      return <CarouselTestimonial heading={heading} testimonials={testimonials} />
    default:
      return <GridTestimonial heading={heading} testimonials={testimonials} />
  }
}
