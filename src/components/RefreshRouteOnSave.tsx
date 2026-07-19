'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export function RefreshRouteOnSave() {
  const router = useRouter()

  useEffect(() => {
    function handleMessage(event: MessageEvent) {
      if (event.data?.type === 'payload-live-preview') {
        router.refresh()
      }
    }

    window.addEventListener('message', handleMessage)
    return () => window.removeEventListener('message', handleMessage)
  }, [router])

  return null
}
