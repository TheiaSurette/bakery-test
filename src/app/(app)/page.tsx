import { notFound } from 'next/navigation'
import { getPageBySlug } from '@/lib/queries/pages'
import { RenderBlocks } from '@/blocks/RenderBlocks'

export const revalidate = 3600

export default async function HomePage() {
  const page = await getPageBySlug('home')
  if (!page) notFound()

  return <RenderBlocks blocks={page.layout} />
}
