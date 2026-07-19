import Link from 'next/link'
import type { Footer as FooterType } from '@/payload-types'

interface FooterColumn {
  label: string
  links: Array<{
    label: string
    url: string
    id?: string | null
  }>
  id?: string | null
}

export function Footer({ data }: { data: FooterType }) {
  const columns = (data.columns ?? []) as FooterColumn[]
  const socialLinks = data.socialLinks as
    | Array<{ platform: string; url: string; id?: string | null }>
    | undefined

  return (
    <footer className="dark bg-background text-foreground">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        {columns.length > 0 && (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {columns.map((column, i) => (
              <div key={i}>
                <h3 className="font-[family-name:var(--font-bebas)] text-lg uppercase tracking-wider text-foreground">
                  {column.label}
                </h3>
                <ul className="mt-4 space-y-3">
                  {column.links?.map((link, j) => (
                    <li key={j}>
                      <Link
                        href={link.url}
                        className="text-sm text-muted-foreground transition-colors hover:text-primary"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-primary/30 pt-8 sm:flex-row">
          <p className="text-sm text-muted-foreground">
            {data.copyright ?? `© ${new Date().getFullYear()} All rights reserved.`}
          </p>
          {socialLinks && socialLinks.length > 0 && (
            <div className="flex gap-4">
              {socialLinks.map((social, i) => (
                <Link
                  key={i}
                  href={social.url}
                  className="text-sm text-muted-foreground transition-colors hover:text-primary"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {social.platform}
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </footer>
  )
}
