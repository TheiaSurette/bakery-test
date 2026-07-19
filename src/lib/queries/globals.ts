import { getPayload } from 'payload'
import config from '@payload-config'
import type { Header, Footer, SiteSetting } from '@/payload-types'

export async function getHeader(): Promise<Header> {
  const payload = await getPayload({ config })
  return payload.findGlobal({ slug: 'header' })
}

export async function getFooter(): Promise<Footer> {
  const payload = await getPayload({ config })
  return payload.findGlobal({ slug: 'footer' })
}

export async function getSiteSettings(): Promise<SiteSetting> {
  const payload = await getPayload({ config })
  return payload.findGlobal({ slug: 'site-settings' })
}
