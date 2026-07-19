import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import { Container } from '@/components/layout/Container'
import { RichText } from '@/components/RichText'
import { getPost, getAllPostSlugs } from '@/lib/queries/posts'
import type { Media, Category, User } from '@/payload-types'

export const revalidate = 3600

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const slugs = await getAllPostSlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const post = await getPost(slug)
  if (!post) return {}

  return {
    title: post.title,
    description: post.excerpt ?? undefined,
  }
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
}

export default async function PostPage({ params }: PageProps) {
  const { slug } = await params
  const post = await getPost(slug)
  if (!post) notFound()

  const imageUrl =
    post.featuredImage && typeof post.featuredImage === 'object'
      ? (post.featuredImage as Media).url
      : null

  const author =
    post.author && typeof post.author === 'object'
      ? (post.author as User)
      : null

  const categories =
    post.categories && Array.isArray(post.categories)
      ? post.categories
          .filter((cat): cat is Category => typeof cat === 'object')
          .map((cat) => cat.title)
      : []

  return (
    <article className="py-16 md:py-24">
      <Container className="max-w-3xl">
        {imageUrl && (
          <div className="relative aspect-video w-full mb-8 rounded-lg overflow-hidden">
            <Image
              src={imageUrl}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        <header className="mb-10">
          {categories.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {categories.map((name) => (
                <span
                  key={name}
                  className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-secondary text-secondary-foreground"
                >
                  {name}
                </span>
              ))}
            </div>
          )}

          <h1 className="text-4xl font-bold tracking-tight mb-4 md:text-5xl">
            {post.title}
          </h1>

          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            {author && <span>By {author.email}</span>}
            {author && post.publishedAt && <span aria-hidden="true">&middot;</span>}
            {post.publishedAt && (
              <time dateTime={post.publishedAt}>
                {formatDate(post.publishedAt)}
              </time>
            )}
          </div>
        </header>

        {post.content && <RichText data={post.content} />}
      </Container>
    </article>
  )
}
