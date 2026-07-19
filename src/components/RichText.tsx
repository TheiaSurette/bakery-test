import { RichText as PayloadRichText } from '@payloadcms/richtext-lexical/react'
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'

export function RichText({ data }: { data: SerializedEditorState | null | undefined }) {
  if (!data) return null

  return (
    <div className="prose prose-neutral max-w-none dark:prose-invert">
      <PayloadRichText data={data} />
    </div>
  )
}
