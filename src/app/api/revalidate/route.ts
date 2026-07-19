import { revalidatePath, revalidateTag } from 'next/cache'
import type { NextRequest } from 'next/server'

export async function POST(request: NextRequest) {
  const secret = request.headers.get('x-revalidate-secret')

  if (secret !== process.env.REVALIDATION_SECRET) {
    return Response.json({ error: 'Invalid secret' }, { status: 401 })
  }

  const body = (await request.json()) as { path?: string; tag?: string }

  if (body.path) {
    revalidatePath(body.path)
    return Response.json({ revalidated: true, path: body.path })
  }

  if (body.tag) {
    revalidateTag(body.tag, 'default')
    return Response.json({ revalidated: true, tag: body.tag })
  }

  return Response.json({ error: 'Missing path or tag' }, { status: 400 })
}
