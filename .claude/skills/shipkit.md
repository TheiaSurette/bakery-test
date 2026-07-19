---
description: "Shipkit project — adding blocks, collections, globals, features to a Next.js + Payload CMS site"
---

# Shipkit Project

## Overview
This is a Shipkit-generated site: Next.js 16 (App Router) + Payload CMS 3.x running in embedded mode. Payload is both the CMS admin and the data layer, accessed via the Local API (no REST calls needed for server-side data fetching).

## CLI Flags Reference (create-shipkit)
The project was scaffolded with `create-shipkit`. Available flags:

| Flag | Type | Valid Values | Default |
|------|------|-------------|---------|
| `name` | positional | valid directory name | `my-site` |
| `--color` | string | `blue`, `green`, `red`, `orange`, `violet`, `rose`, `amber`, `teal`, or OKLCH hue `0-360` | `blue` |
| `--features` | string | comma-separated: `blog`, `forms`, `events`, `ecommerce` | `blog,events` |
| `--storage` | string | `vercel-blob`, `s3` | `vercel-blob` |
| `-y, --yes` | boolean | skip prompts | `false` |
| `--dry-run` | boolean | preview only | `false` |
| `--json` | boolean | JSON output | `false` |

## Adding a New Block

### Step 1: Create the Payload Block config
```typescript
// src/blocks/MyBlock/config.ts
import type { Block } from 'payload'

export const MyBlock: Block = {
  slug: 'myBlock',
  labels: { singular: 'My Block', plural: 'My Blocks' },
  fields: [
    { name: 'heading', type: 'text', required: true },
    { name: 'content', type: 'richText' },
    {
      name: 'style',
      type: 'select',
      defaultValue: 'default',
      options: [
        { label: 'Default', value: 'default' },
        { label: 'Alternate', value: 'alternate' },
      ],
    },
    { name: 'image', type: 'upload', relationTo: 'media' },
  ],
}
```

### Step 2: Create the React component
```typescript
// src/blocks/MyBlock/Component.tsx
import type { Page } from '@/payload-types'
import { RichText } from '@/components/RichText'
import { Container } from '@/components/layout/Container'

type MyBlockData = Extract<NonNullable<Page['layout']>[number], { blockType: 'myBlock' }>

export function MyBlockComponent({ block }: { block: MyBlockData }) {
  const { heading, content, style } = block

  return (
    <section className="py-16 md:py-24">
      <Container>
        <h2 className="text-3xl font-bold tracking-tight md:text-4xl">{heading}</h2>
        {content && <RichText data={content} />}
      </Container>
    </section>
  )
}
```

### Step 3: Register the block config
```typescript
// src/blocks/index.ts — add to imports and array
import { MyBlock } from './MyBlock/config'

export const blocks: Block[] = [
  // ... existing blocks
  MyBlock,
]
```

### Step 4: Register the component
```typescript
// src/blocks/RenderBlocks.tsx — add to imports and mapper
import { MyBlockComponent } from './MyBlock/Component'

const blockComponents: Record<string, React.ComponentType<{ block: never }>> = {
  // ... existing entries
  myBlock: MyBlockComponent as React.ComponentType<{ block: never }>,
}
```

### Step 5: Regenerate types
```bash
pnpm generate:importmap && pnpm generate:types
```

## Adding a New Collection

### Step 1: Define the collection
```typescript
// src/collections/Projects.ts
import type { CollectionConfig, CollectionBeforeValidateHook } from 'payload'
import { isAdmin } from '../access/isAdmin'
import { isAdminOrEditor } from '../access/isAdminOrEditor'
import { publishedOnly } from '../access/publishedOnly'
import { revalidateCollection } from '../hooks/revalidateCollection'
import { populatePublishedAt } from '../hooks/populatePublishedAt'

const slugify = (text: string): string =>
  text.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-').trim()

const generateSlug: CollectionBeforeValidateHook = ({ data }) => {
  if (data?.title && !data.slug) {
    data.slug = slugify(data.title)
  }
  return data
}

export const Projects: CollectionConfig = {
  slug: 'projects',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', '_status'],
    group: 'Content',
  },
  versions: { drafts: true },
  access: {
    read: publishedOnly,
    create: isAdminOrEditor,
    update: isAdminOrEditor,
    delete: isAdmin,
  },
  hooks: {
    beforeValidate: [generateSlug],
    beforeChange: [populatePublishedAt],
    afterChange: [
      revalidateCollection(
        (doc) => `/projects/${doc.slug}`,
        (doc) => ['projects', `project-${doc.slug}`],
      ),
    ],
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    {
      name: 'slug',
      type: 'text',
      unique: true,
      admin: { position: 'sidebar', readOnly: true, description: 'Auto-generated from title' },
    },
    { name: 'content', type: 'richText' },
    { name: 'featuredImage', type: 'upload', relationTo: 'media' },
    { name: 'publishedAt', type: 'date', admin: { position: 'sidebar' } },
  ],
}
```

### Step 2: Register in payload.config.ts
```typescript
// src/payload.config.ts
import { Projects } from './collections/Projects'

// Add to collections array:
collections: [Pages, Media, Users, Projects],
```

### Step 3: Generate migration and types
```bash
pnpm payload:migrate:create
pnpm payload:migrate
pnpm generate:types
```

## Adding Query Functions

```typescript
// src/lib/queries/projects.ts
import { getPayload } from 'payload'
import config from '@payload-config'
import { draftMode } from 'next/headers'
import type { Project } from '@/payload-types'

export async function getProjects(options?: {
  page?: number
  limit?: number
  draft?: boolean
}): Promise<{ docs: Project[]; totalPages: number }> {
  const { isEnabled: isDraft } = await draftMode()
  const draft = options?.draft ?? isDraft
  const payload = await getPayload({ config })

  return payload.find({
    collection: 'projects',
    draft,
    limit: options?.limit ?? 10,
    page: options?.page ?? 1,
    sort: '-publishedAt',
  })
}

export async function getProject(slug: string, draft?: boolean): Promise<Project | null> {
  const { isEnabled: isDraft } = await draftMode()
  const payload = await getPayload({ config })

  const result = await payload.find({
    collection: 'projects',
    where: { slug: { equals: slug } },
    draft: draft ?? isDraft,
    limit: 1,
  })

  return result.docs[0] ?? null
}
```

## Adding Routes

### Listing page
```typescript
// src/app/(app)/projects/page.tsx
import type { Metadata } from 'next'
import { getProjects } from '@/lib/queries/projects'

export const revalidate = 3600

export const metadata: Metadata = { title: 'Projects' }

export default async function ProjectsPage() {
  const { docs: projects } = await getProjects()

  return (
    <section className="py-16">
      <div className="container mx-auto max-w-6xl px-6">
        <h1 className="text-4xl font-bold mb-8">Projects</h1>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <article key={project.id}>
              <h2>{project.title}</h2>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
```

### Detail page
```typescript
// src/app/(app)/projects/[slug]/page.tsx
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getProject } from '@/lib/queries/projects'
import { RichText } from '@/components/RichText'

export const revalidate = 3600

interface Props { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const project = await getProject(slug)
  return project ? { title: project.title } : {}
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params
  const project = await getProject(slug)
  if (!project) notFound()

  return (
    <article className="py-16">
      <div className="container mx-auto max-w-3xl px-6">
        <h1 className="text-4xl font-bold mb-8">{project.title}</h1>
        {project.content && <RichText data={project.content} />}
      </div>
    </article>
  )
}
```

## Theme Customization

Edit OKLCH variables in `src/app/globals.css` under the `BRAND COLORS` comment. The color system uses OKLCH for perceptually uniform theming.

Key variables:
- `--color-primary` / `--color-primary-foreground` — buttons, links, accents
- `--color-secondary` / `--color-accent` — secondary surfaces
- `--color-muted` — subtle backgrounds
- `--color-destructive` — error states

Both light and dark mode variants are defined. Change the hue value to shift the entire palette.

## Access Control

Import shared access functions from `src/access/`:

| Function | Description |
|----------|-------------|
| `isAdmin` | Only users with `role: 'admin'` |
| `isAdminOrEditor` | Users with `role: 'admin'` or `role: 'editor'` |
| `publishedOnly` | Public sees only `_status: 'published'`; admins/editors see all |

## Revalidation

Use the `revalidateCollection` factory from `src/hooks/revalidateCollection.ts`:

```typescript
afterChange: [
  revalidateCollection(
    (doc) => `/projects/${doc.slug}`,       // path to revalidate
    (doc) => ['projects', `project-${doc.slug}`], // cache tags
  ),
],
```

## Working with Rich Text

Render Payload Lexical rich text with the `RichText` component:
```typescript
import { RichText } from '@/components/RichText'

<RichText data={doc.content} />
```

## ISR / Draft Mode

- All listing/detail pages export `revalidate = 3600`
- `afterChange` hooks call `revalidatePath` and `revalidateTag` on save
- Draft mode: Payload sets `draftMode()` automatically via `/admin`; queries read `isEnabled` from `draftMode()` to include draft documents

## Environment Variables

| Variable | Purpose |
|----------|---------|
| `DATABASE_URI` | Neon Postgres connection (pooled, for runtime) |
| `DATABASE_URI_UNPOOLED` | Neon direct connection (for migrations) |
| `PAYLOAD_SECRET` | Payload encryption secret |
| `BLOB_READ_WRITE_TOKEN` | Vercel Blob storage token |
| `NEXT_PUBLIC_SITE_URL` | Public site URL |

## Troubleshooting

- **Types out of date**: Run `pnpm generate:types`
- **Admin import map errors**: Run `pnpm generate:importmap`
- **Migration issues**: Use `DATABASE_URI_UNPOOLED` for `pnpm payload:migrate`
- **Block not rendering**: Check slug matches in both `blocks/index.ts` and `RenderBlocks.tsx` mapper
- **Access denied in API**: Check collection access control functions
- **Stale pages**: Verify `afterChange` hook calls `revalidateCollection` with correct path/tags
