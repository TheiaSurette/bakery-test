import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { Card, CardContent } from '@/components/ui/card'
import { Container } from '@/components/layout/Container'
import { getPosts } from '@/lib/queries/posts'
import type { Post, Media, Category } from '@/payload-types'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Read our latest posts.',
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
}

function getImageUrl(image: Post['featuredImage']): string | null {
  if (!image || typeof image !== 'object') return null
  return (image as Media).url ?? null
}

function getCategoryNames(categories: Post['categories']): string[] {
  if (!categories || !Array.isArray(categories)) return []
  return categories
    .map((cat) => (typeof cat === 'object' ? (cat as Category).title : null))
    .filter((name): name is string => Boolean(name))
}

interface PostsPageProps {
  searchParams: Promise<{ page?: string }>
}

export default async function PostsPage({ searchParams }: PostsPageProps) {
  const { page: pageParam } = await searchParams
  const page = pageParam ? parseInt(pageParam, 10) : 1
  const { docs: posts, totalPages } = await getPosts({ page, limit: 10 })

  return (
    <section className="py-16 md:py-24">
      <Container>
        <h1 className="text-4xl font-bold tracking-tight mb-12 md:text-5xl">Blog</h1>

        {posts.length === 0 && (
          <div className="text-center py-16">
            <p className="text-muted-foreground">No posts yet. Check back soon.</p>
          </div>
        )}

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => {
            const imageUrl = getImageUrl(post.featuredImage)
            const categories = getCategoryNames(post.categories)

            return (
              <Link key={post.id} href={`/posts/${post.slug}`}>
                <Card className="overflow-hidden transition-shadow hover:shadow-lg h-full">
                  {imageUrl && (
                    <div className="relative h-48 w-full">
                      <Image
                        src={imageUrl}
                        alt={post.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <CardContent className="p-6">
                    {categories.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-3">
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
                    <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
                    {post.excerpt && (
                      <p className="text-sm text-muted-foreground line-clamp-3 mb-3">
                        {post.excerpt}
                      </p>
                    )}
                    {post.publishedAt && (
                      <time className="text-xs text-muted-foreground">
                        {formatDate(post.publishedAt)}
                      </time>
                    )}
                  </CardContent>
                </Card>
              </Link>
            )
          })}
        </div>

        {totalPages > 1 && (
          <nav className="flex justify-center gap-4 mt-12">
            {page > 1 && (
              <Link
                href={`/posts?page=${page - 1}`}
                className="text-sm font-medium text-primary hover:underline"
              >
                Previous
              </Link>
            )}
            <span className="text-sm text-muted-foreground">
              Page {page} of {totalPages}
            </span>
            {page < totalPages && (
              <Link
                href={`/posts?page=${page + 1}`}
                className="text-sm font-medium text-primary hover:underline"
              >
                Next
              </Link>
            )}
          </nav>
        )}
      </Container>
    </section>
  )
}
