import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

interface PayloadRedirect {
  from: string
  to: {
    type: 'custom' | 'reference'
    url?: string
    reference?: {
      relationTo: string
      value: string | { slug?: string }
    }
  }
  type: '301' | '302'
}

interface RedirectsResponse {
  docs: PayloadRedirect[]
}

let cachedRedirects: PayloadRedirect[] | null = null
let cacheTimestamp = 0
const CACHE_TTL = 60_000

async function getRedirects(): Promise<PayloadRedirect[]> {
  const now = Date.now()

  if (cachedRedirects && now - cacheTimestamp < CACHE_TTL) {
    return cachedRedirects
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

  try {
    const res = await fetch(`${siteUrl}/api/redirects?limit=0&depth=1`, {
      next: { revalidate: 60 },
    })

    if (!res.ok) return cachedRedirects ?? []

    const data = (await res.json()) as RedirectsResponse
    cachedRedirects = data.docs
    cacheTimestamp = now
    return cachedRedirects
  } catch {
    return cachedRedirects ?? []
  }
}

function resolveRedirectUrl(redirect: PayloadRedirect): string | null {
  if (redirect.to.type === 'custom' && redirect.to.url) {
    return redirect.to.url
  }

  if (redirect.to.type === 'reference' && redirect.to.reference) {
    const { relationTo, value } = redirect.to.reference
    const slug = typeof value === 'string' ? value : value?.slug

    if (!slug) return null

    if (relationTo === 'pages') {
      return slug === 'home' ? '/' : `/${slug}`
    }

    return `/${relationTo}/${slug}`
  }

  return null
}

export default async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl
  const redirects = await getRedirects()

  const match = redirects.find((r) => r.from === pathname)

  if (!match) return NextResponse.next()

  const destination = resolveRedirectUrl(match)

  if (!destination) return NextResponse.next()

  const url = request.nextUrl.clone()
  url.pathname = destination

  const statusCode = match.type === '301' ? 301 : 302
  return NextResponse.redirect(url, statusCode)
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon\\.ico|admin|api).*)',
  ],
}
