import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'
import type { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl
  const secret = searchParams.get('secret')
  const slug = searchParams.get('slug') ?? '/'
  const disable = searchParams.get('disable')

  if (disable) {
    const draft = await draftMode()
    draft.disable()
    redirect(slug)
  }

  if (secret !== process.env.DRAFT_SECRET) {
    return new Response('Invalid secret', { status: 401 })
  }

  const draft = await draftMode()
  draft.enable()
  redirect(slug)
}
