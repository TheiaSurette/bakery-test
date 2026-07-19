import Image from 'next/image'
import { Card, CardContent } from '@/components/ui/card'
import { Section } from '@/components/layout/Section'
import type { Media } from '@/payload-types'

interface GridTestimonialProps {
  heading?: string | null
  testimonials: Array<{
    quote: string
    author: string
    role?: string | null
    avatar?: Media | string | null
  }>
}

export function GridTestimonial({ heading, testimonials }: GridTestimonialProps) {
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
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((testimonial, i) => {
          const avatar = typeof testimonial.avatar === 'object' ? testimonial.avatar : null

          return (
            <Card key={i} className="bg-card">
              <CardContent className="pt-6">
                <span className="font-[family-name:var(--font-bebas)] text-6xl leading-none text-primary/30">
                  &ldquo;
                </span>
                <blockquote className="mt-2 text-lg leading-relaxed text-card-foreground">
                  {testimonial.quote}
                </blockquote>
                <div className="mt-6 border-t border-border pt-4">
                  <div className="flex items-center gap-3">
                    {avatar?.url && (
                      <Image
                        src={avatar.url}
                        alt={avatar.alt}
                        width={40}
                        height={40}
                        className="rounded-full object-cover"
                      />
                    )}
                    <div>
                      <p className="font-[family-name:var(--font-bebas)] text-lg uppercase text-card-foreground">
                        {testimonial.author}
                      </p>
                      {testimonial.role && (
                        <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </Section>
  )
}
