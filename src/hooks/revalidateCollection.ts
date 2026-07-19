import { revalidatePath, revalidateTag } from 'next/cache'
import type { CollectionAfterChangeHook } from 'payload'

export const revalidateCollection = (
  getPath: (doc: Record<string, unknown>) => string,
  tags?: (doc: Record<string, unknown>) => string[],
): CollectionAfterChangeHook => {
  return ({ doc, req }) => {
    if (req.context?.seed) return doc

    const path = getPath(doc)
    revalidatePath(path)

    if (tags) {
      for (const tag of tags(doc)) {
        revalidateTag(tag, 'default')
      }
    }

    return doc
  }
}
