import type { Access } from 'payload'

export const publishedOnly: Access = ({ req: { user } }) => {
  if (user?.role === 'admin' || user?.role === 'editor') return true

  return {
    _status: {
      equals: 'published',
    },
  }
}
