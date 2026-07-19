# bakery-test

## Stack
- Next.js 16 (App Router) + Payload CMS 3.x (embedded mode)
- Tailwind CSS v4 + shadcn/ui (OKLCH tokens, CSS-first config)
- Postgres via @payloadcms/db-postgres (local Docker for dev, Neon via Vercel in prod)
- Vercel Blob for media storage
- pnpm for package management

## Commands
- `pnpm db:start` — start local Postgres (Docker)
- `pnpm db:stop` — stop local Postgres
- `pnpm dev` — start dev server (site + CMS admin at /admin)
- `pnpm build` — run migrations then build for production
- `pnpm lint` — ESLint
- `pnpm payload:migrate` — run pending database migrations
- `pnpm payload:migrate:create` — generate a new migration
- `pnpm payload:seed` — seed database with sample content
- `pnpm generate:types` — regenerate Payload TypeScript types
- `pnpm generate:importmap` — regenerate admin import map

## Project Structure
- `src/app/(app)/` — public site routes
- `src/app/(payload)/` — CMS admin (auto-generated, NEVER edit)
- `src/blocks/` — content blocks: each has config.ts + Component.tsx
- `src/collections/` — Payload collection definitions
- `src/globals/` — Header, Footer, SiteSettings
- `src/access/` — shared access control (isAdmin, publishedOnly)
- `src/hooks/` — lifecycle hooks (revalidation, timestamps)
- `src/components/ui/` — shadcn primitives
- `src/components/layout/` — Header, Footer, Container, MobileNav
- `src/lib/queries/` — data fetching via Payload Local API

## Conventions
- Fetch data in Server Components: `const payload = await getPayload({ config })`
- Blocks: `src/blocks/Name/{config.ts, Component.tsx, variants/}`
- After adding/removing blocks: `pnpm generate:importmap && pnpm generate:types`
- Access control: import from `src/access/`
- ISR: afterChange hooks auto-revalidate; fallback `revalidate: 3600`
- Theme: edit OKLCH variables under `BRAND COLORS` in `src/app/globals.css`
- Database: local Docker Postgres for dev (`pnpm db:start`), Neon via Vercel Marketplace in prod
- NEVER edit files inside `src/app/(payload)/`
- Use semantic colors (bg-primary) not raw Tailwind (bg-blue-500)

## Adding a New Block
1. Create `src/blocks/NewBlock/config.ts` — Payload Block definition
2. Create `src/blocks/NewBlock/Component.tsx` — React component
3. Add config to the array in `src/blocks/index.ts`
4. Add component to the mapper in `src/blocks/RenderBlocks.tsx`
5. Run `pnpm generate:importmap && pnpm generate:types`

## Adding a New Collection
1. Create `src/collections/NewCollection.ts`
2. Import and add to collections array in `src/payload.config.ts`
3. Run `pnpm payload:migrate:create` then `pnpm payload:migrate`
4. Run `pnpm generate:types`
