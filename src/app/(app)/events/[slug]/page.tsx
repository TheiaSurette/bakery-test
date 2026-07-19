import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import { Calendar, MapPin, Ticket, ExternalLink } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Container } from '@/components/layout/Container'
import { RichText } from '@/components/RichText'
import { getEvent, getAllEventSlugs } from '@/lib/queries/events'
import type { Event, Media } from '@/payload-types'

export const revalidate = 3600

interface PageProps {
  params: Promise<{ slug: string }>
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  ticket: Ticket,
  'external-link': ExternalLink,
  calendar: Calendar,
  'map-pin': MapPin,
}

export async function generateStaticParams() {
  const slugs = await getAllEventSlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const event = await getEvent(slug)
  if (!event) return {}

  return {
    title: event.title,
    description: `${event.title} — event details`,
  }
}

function formatFullDate(dateStr: string): string {
  const date = new Date(dateStr)
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
}

function formatTime(dateStr: string): string {
  const date = new Date(dateStr)
  return date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
  })
}

function getLocationParts(location: Event['location']): string[] {
  if (!location) return []
  return [
    location.venueName,
    location.address,
    [location.city, location.state].filter(Boolean).join(', '),
  ].filter((part): part is string => Boolean(part))
}

export default async function EventDetailPage({ params }: PageProps) {
  const { slug } = await params
  const event = await getEvent(slug)
  if (!event) notFound()

  const imageUrl =
    event.image && typeof event.image === 'object'
      ? (event.image as Media).url
      : null

  const locationParts = getLocationParts(event.location)
  const links = event.eventLinks ?? []

  return (
    <article className="py-16 md:py-24">
      <Container className="max-w-3xl">
        {imageUrl && (
          <div className="relative aspect-video w-full mb-8 rounded-lg overflow-hidden">
            <Image
              src={imageUrl}
              alt={event.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        <h1 className="text-4xl font-bold tracking-tight mb-6 md:text-5xl">
          {event.title}
        </h1>

        <div className="flex flex-col gap-3 mb-8 text-muted-foreground">
          <div className="flex items-center gap-2">
            <Calendar className="h-5 w-5 shrink-0" />
            <span>
              {formatFullDate(event.date)} at {formatTime(event.date)}
              {event.endDate && (
                <> — {formatFullDate(event.endDate)} at {formatTime(event.endDate)}</>
              )}
            </span>
          </div>
          {locationParts.length > 0 && (
            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5 shrink-0" />
              <span>{locationParts.join(' | ')}</span>
            </div>
          )}
        </div>

        {event.description && (
          <div className="mb-10">
            <RichText data={event.description} />
          </div>
        )}

        {links.length > 0 && (
          <div className="flex flex-wrap gap-3 pt-6 border-t">
            {links.map((link, i) => {
              const Icon = link.icon ? iconMap[link.icon] ?? ExternalLink : ExternalLink
              return (
                <Button key={i} variant="outline" asChild>
                  <a href={link.url} target="_blank" rel="noopener noreferrer">
                    <Icon className="h-4 w-4 mr-2" />
                    {link.label}
                  </a>
                </Button>
              )
            })}
          </div>
        )}
      </Container>
    </article>
  )
}
