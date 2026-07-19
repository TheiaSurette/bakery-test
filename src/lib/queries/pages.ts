import { getPayload } from 'payload'
import config from '@payload-config'
import { draftMode } from 'next/headers'
import type { Page } from '@/payload-types'

export async function getPageBySlug(slug: string): Promise<Page | null> {
  const { isEnabled: draft } = await draftMode()
  const payload = await getPayload({ config })

  const result = await payload.find({
    collection: 'pages',
    where: { slug: { equals: slug } },
    draft,
    limit: 1,
  })

  return result.docs[0] ?? null
}

export async function getAllPageSlugs(): Promise<string[]> {
  const payload = await getPayload({ config })

  const result = await payload.find({
    collection: 'pages',
    where: { _status: { equals: 'published' } },
    limit: 0,
  })

  return result.docs
    .map((doc) => doc.slug)
    .filter((slug): slug is string => typeof slug === 'string' && slug !== 'home')
}
