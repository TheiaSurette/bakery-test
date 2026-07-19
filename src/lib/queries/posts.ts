import { getPayload } from 'payload'
import type { Where } from 'payload'
import config from '@payload-config'
import { draftMode } from 'next/headers'
import type { Post } from '@/payload-types'

export async function getPosts(options?: {
  page?: number
  limit?: number
  category?: string
  draft?: boolean
}): Promise<{ docs: Post[]; totalPages: number; page: number }> {
  const { isEnabled: isDraft } = await draftMode()
  const draft = options?.draft ?? isDraft
  const payload = await getPayload({ config })

  const where: Where = {}

  if (options?.category) {
    where['categories.slug'] = { equals: options.category }
  }

  const result = await payload.find({
    collection: 'posts',
    where,
    draft,
    limit: options?.limit ?? 10,
    page: options?.page ?? 1,
    sort: '-publishedAt',
    depth: 1,
  })

  return {
    docs: result.docs,
    totalPages: result.totalPages,
    page: result.page ?? 1,
  }
}

export async function getPost(slug: string, draft?: boolean): Promise<Post | null> {
  const { isEnabled: isDraft } = await draftMode()
  const payload = await getPayload({ config })

  const result = await payload.find({
    collection: 'posts',
    where: { slug: { equals: slug } },
    draft: draft ?? isDraft,
    limit: 1,
    depth: 2,
  })

  return result.docs[0] ?? null
}

export async function getAllPostSlugs(): Promise<string[]> {
  const payload = await getPayload({ config })

  const result = await payload.find({
    collection: 'posts',
    where: { _status: { equals: 'published' } },
    limit: 0,
    select: { slug: true },
  })

  return result.docs
    .map((doc) => doc.slug)
    .filter((slug): slug is string => typeof slug === 'string')
}
