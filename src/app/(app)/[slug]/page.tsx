import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getPageBySlug, getAllPageSlugs } from '@/lib/queries/pages'
import { RenderBlocks } from '@/blocks/RenderBlocks'

export const revalidate = 3600

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const slugs = await getAllPageSlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const page = await getPageBySlug(slug)
  if (!page) return {}

  return {
    title: page.title,
  }
}

export default async function DynamicPage({ params }: PageProps) {
  const { slug } = await params
  const page = await getPageBySlug(slug)
  if (!page) notFound()

  return <RenderBlocks blocks={page.layout} />
}
