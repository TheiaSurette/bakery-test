import { getPayload } from 'payload'
import type { Where } from 'payload'
import config from '@payload-config'
import type { Event } from '@/payload-types'

export async function getEvents(options?: {
  upcoming?: boolean
  featured?: boolean
  limit?: number
  draft?: boolean
}): Promise<Event[]> {
  const payload = await getPayload({ config })

  const where: Where = {
    status: { equals: 'published' },
  }

  if (options?.featured) {
    where.featured = { equals: true }
  }

  if (options?.upcoming) {
    where.date = { greater_than_equal: new Date().toISOString() }
  }

  const result = await payload.find({
    collection: 'events',
    where,
    sort: options?.upcoming ? 'date' : '-date',
    limit: options?.limit ?? 100,
    draft: options?.draft ?? false,
  })

  return result.docs
}

export async function getEvent(slug: string, draft?: boolean): Promise<Event | null> {
  const payload = await getPayload({ config })

  const result = await payload.find({
    collection: 'events',
    where: {
      slug: { equals: slug },
      ...(draft ? {} : { status: { equals: 'published' } }),
    },
    limit: 1,
    draft: draft ?? false,
    depth: 1,
  })

  return result.docs[0] ?? null
}

export async function getAllEventSlugs(): Promise<string[]> {
  const payload = await getPayload({ config })

  const result = await payload.find({
    collection: 'events',
    where: { status: { equals: 'published' } },
    limit: 0,
    select: { slug: true },
  })

  return result.docs
    .map((doc) => doc.slug)
    .filter((slug): slug is string => typeof slug === 'string')
}
