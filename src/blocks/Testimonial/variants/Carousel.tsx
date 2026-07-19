'use client'

import { useCallback, useState } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Section } from '@/components/layout/Section'
import type { Media } from '@/payload-types'

interface CarouselTestimonialProps {
  heading?: string | null
  testimonials: Array<{
    quote: string
    author: string
    role?: string | null
    avatar?: Media | string | null
  }>
}

export function CarouselTestimonial({ heading, testimonials }: CarouselTestimonialProps) {
  const [current, setCurrent] = useState(0)

  const next = useCallback(() => {
    setCurrent((c) => (c + 1) % testimonials.length)
  }, [testimonials.length])

  const prev = useCallback(() => {
    setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length)
  }, [testimonials.length])

  const testimonial = testimonials[current]
  if (!testimonial) return null

  const avatar = typeof testimonial.avatar === 'object' ? testimonial.avatar : null

  return (
    <Section className="bg-secondary">
      {heading && (
        <div className="mb-12 text-center">
          <p className="text-sm font-medium uppercase tracking-[0.3em] text-muted-foreground">
            Testimonials
          </p>
          <h2 className="mt-3 font-[family-name:var(--font-bebas)] text-4xl uppercase leading-[0.85] sm:text-5xl">
            {heading}
          </h2>
        </div>
      )}
      <div className="mx-auto max-w-3xl text-center">
        <span className="font-[family-name:var(--font-bebas)] text-7xl leading-none text-primary/30 sm:text-8xl">
          &ldquo;
        </span>
        <blockquote className="mt-4 text-xl leading-relaxed text-foreground sm:text-2xl">
          {testimonial.quote}
        </blockquote>
        <div className="mt-8 border-t border-border pt-6">
          <div className="flex flex-col items-center gap-3">
            {avatar?.url && (
              <Image
                src={avatar.url}
                alt={avatar.alt}
                width={56}
                height={56}
                className="rounded-full object-cover"
              />
            )}
            <div>
              <p className="font-[family-name:var(--font-bebas)] text-xl uppercase">
                {testimonial.author}
              </p>
              {testimonial.role && (
                <p className="text-sm text-muted-foreground">{testimonial.role}</p>
              )}
            </div>
          </div>
        </div>
        {testimonials.length > 1 && (
          <div className="mt-8 flex items-center justify-center gap-3">
            <Button variant="outline" size="icon" onClick={prev} aria-label="Previous testimonial">
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="font-[family-name:var(--font-bebas)] text-lg tracking-wider text-muted-foreground">
              {current + 1} / {testimonials.length}
            </span>
            <Button variant="outline" size="icon" onClick={next} aria-label="Next testimonial">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </Section>
  )
}
