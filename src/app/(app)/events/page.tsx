import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { Calendar, MapPin } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Container } from '@/components/layout/Container'
import { getEvents } from '@/lib/queries/events'
import type { Event, Media } from '@/payload-types'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Events',
  description: 'Browse upcoming and past events.',
}

function formatEventDate(dateStr: string): string {
  const date = new Date(dateStr)
  return date.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
}

function formatEventTime(dateStr: string): string {
  const date = new Date(dateStr)
  return date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
  })
}

function getLocationText(location: Event['location']): string | null {
  if (!location) return null
  const parts = [
    location.venueName,
    [location.city, location.state].filter(Boolean).join(', '),
  ].filter(Boolean)
  return parts.length > 0 ? parts.join(' — ') : null
}

function getImageUrl(image: Event['image']): string | null {
  if (!image || typeof image !== 'object') return null
  return (image as Media).url ?? null
}

function EventCard({ event }: { event: Event }) {
  const imageUrl = getImageUrl(event.image)
  const locationText = getLocationText(event.location)

  return (
    <Link href={`/events/${event.slug}`}>
      <Card className="overflow-hidden transition-shadow hover:shadow-lg h-full">
        {imageUrl && (
          <div className="relative h-48 w-full">
            <Image
              src={imageUrl}
              alt={event.title}
              fill
              className="object-cover"
            />
          </div>
        )}
        <CardContent className="p-6">
          <h3 className="text-xl font-semibold mb-3">{event.title}</h3>
          <div className="space-y-2 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 shrink-0" />
              <span>
                {formatEventDate(event.date)}
                {' at '}
                {formatEventTime(event.date)}
              </span>
            </div>
            {locationText && (
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 shrink-0" />
                <span>{locationText}</span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}

export default async function EventsPage() {
  const allEvents = await getEvents()
  const now = new Date()

  const upcomingEvents = allEvents
    .filter((event) => new Date(event.date) >= now)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

  const pastEvents = allEvents
    .filter((event) => new Date(event.date) < now)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  return (
    <section className="py-16 md:py-24">
      <Container>
        <h1 className="text-4xl font-bold tracking-tight mb-12 md:text-5xl">Events</h1>

        {upcomingEvents.length > 0 && (
          <div className="mb-16">
            <h2 className="text-2xl font-semibold mb-8">Upcoming Events</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {upcomingEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          </div>
        )}

        {upcomingEvents.length === 0 && (
          <div className="text-center py-16 mb-16">
            <h2 className="text-2xl font-semibold mb-4">No Upcoming Events</h2>
            <p className="text-muted-foreground">
              Check back soon for new events.
            </p>
          </div>
        )}

        {pastEvents.length > 0 && (
          <div>
            <h2 className="text-2xl font-semibold mb-8">Past Events</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {pastEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          </div>
        )}
      </Container>
    </section>
  )
}
