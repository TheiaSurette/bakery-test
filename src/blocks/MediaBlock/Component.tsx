import Image from 'next/image'
import type { Page, Media } from '@/payload-types'
import { Section } from '@/components/layout/Section'
import { Container } from '@/components/layout/Container'

type MediaBlockData = Extract<NonNullable<Page['layout']>[number], { blockType: 'mediaBlock' }>

export function MediaBlockComponent({ block }: { block: MediaBlockData }) {
  const media = typeof block.media === 'object' ? (block.media as Media) : null
  if (!media?.url) return null

  const size = block.size ?? 'wide'
  const isVideo = media.mimeType?.startsWith('video/')

  const content = (
    <figure className={size === 'normal' ? 'mx-auto max-w-3xl' : undefined}>
      {isVideo ? (
        <video
          src={media.url}
          controls
          className="w-full rounded-sm"
          aria-label={media.alt}
        />
      ) : (
        <div className="relative aspect-video overflow-hidden rounded-sm">
          <Image
            src={media.url}
            alt={media.alt}
            fill
            className="object-cover"
            sizes={size === 'full' ? '100vw' : size === 'wide' ? '80vw' : '48rem'}
          />
        </div>
      )}
      {block.caption && (
        <figcaption className="mt-3 text-center text-sm text-muted-foreground">
          {block.caption}
        </figcaption>
      )}
    </figure>
  )

  if (size === 'full') {
    return <Section container={false}>{content}</Section>
  }

  return (
    <Section>
      {content}
    </Section>
  )
}
