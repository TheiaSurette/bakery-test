import type { Payload } from 'payload'

export async function seed(payload: Payload) {
  const { totalDocs: existingUsers } = await payload.count({ collection: 'users' })

  if (existingUsers > 0) {
    payload.logger.info('Database already seeded — skipping.')
    return
  }

  payload.logger.info('Seeding database...')

  const context = { seed: true }

  await payload.create({
    collection: 'users',
    context,
    data: {
      email: 'admin@example.com',
      password: 'changeme',
      role: 'admin',
    },
  })

  await payload.create({
    collection: 'pages',
    context,
    data: {
      title: 'Home',
      slug: 'home',
      _status: 'published',
      publishedAt: new Date().toISOString(),
      layout: [
        {
          blockType: 'hero',
          heading: 'BREAD WORTH WAKING UP FOR',
          subheading:
            'Handcrafted sourdough and pastries baked fresh every morning at 327 Baker Street, Portland. Open daily from 6 AM.',
          style: 'centered',
          links: [
            { label: 'See Our Menu', url: '/menu', variant: 'default' },
            { label: 'Visit Us', url: '/contact', variant: 'outline' },
          ],
        },
        {
          blockType: 'feature',
          heading: 'What We Bake',
          style: 'grid',
          features: [
            {
              icon: 'wheat',
              title: 'Artisan Sourdough',
              description:
                'Our signature country loaf, fermented for 48 hours with a heritage wheat starter we have kept alive since 2017.',
            },
            {
              icon: 'croissant',
              title: 'Laminated Pastries',
              description:
                'Croissants, pain au chocolat, and seasonal danishes — 27 layers of hand-folded butter dough, baked until shattering.',
            },
            {
              icon: 'cake',
              title: 'Cakes & Celebration',
              description:
                'Custom layer cakes, tarts, and desserts for every occasion. Order 48 hours ahead for custom work.',
            },
          ],
        },
        {
          blockType: 'stats',
          heading: 'By the Numbers',
          stats: [
            { value: '8+', label: 'Years Baking', description: 'Serving Portland since 2017' },
            {
              value: '500+',
              label: 'Loaves Daily',
              description: 'Baked fresh every morning before dawn',
            },
            {
              value: '100%',
              label: 'Stone-Milled',
              description: 'Heritage grains milled in-house',
            },
            { value: '48hr', label: 'Ferment', description: 'Slow-fermented for deep flavour' },
          ],
        },
        {
          blockType: 'testimonial',
          heading: 'What People Say',
          style: 'grid',
          testimonials: [
            {
              quote:
                'I have tried sourdough from every bakery in Portland. This is the one I drive across town for. The crust crackles, the crumb is open and tangy — it is everything bread should be.',
              author: 'Rachel Kim',
              role: 'Food Blogger',
            },
            {
              quote:
                'We ordered a custom cake for our wedding and it was the highlight of the reception. Guests are still asking about it two years later. The lemon-elderflower was transcendent.',
              author: 'Marcus & David Chen-Wright',
              role: 'Wedding Clients',
            },
            {
              quote:
                'Their morning bun is a religious experience. I stop by every Saturday and have never once been disappointed. The team genuinely cares about what they make.',
              author: 'Tom Adeyemi',
              role: 'Regular Customer',
            },
          ],
        },
        {
          blockType: 'cta',
          heading: "LIFE'S TOO SHORT FOR BAD BREAD",
          description:
            'Visit us at 327 Baker Street, Portland. Open daily from 6 AM. The best loaves go early — set your alarm.',
          style: 'banner',
          links: [
            { label: 'Get Directions', url: '/contact', variant: 'default' },
            { label: 'See the Menu', url: '/menu', variant: 'outline' },
          ],
        },
      ],
    },
  })

  await payload.updateGlobal({
    slug: 'site-settings',
    data: {
      siteName: 'Baker Street Bakery',
      tagline: 'Bread Worth Waking Up For',
    },
  })

  await payload.updateGlobal({
    slug: 'header',
    data: {
      navLinks: [
        { label: 'Home', link: { type: 'external', url: '/' } },
        { label: 'About', link: { type: 'external', url: '/about' } },
        { label: 'Blog', link: { type: 'external', url: '/posts' } },
        { label: 'Events', link: { type: 'external', url: '/events' } },
        { label: 'Contact', link: { type: 'external', url: '/contact' } },
      ],
    },
  })

  await payload.updateGlobal({
    slug: 'footer',
    data: {
      columns: [
        {
          label: 'Visit Us',
          links: [
            { label: '327 Baker Street', url: '/contact' },
            { label: 'Portland, OR 97205', url: '/contact' },
            { label: 'Open Daily 6 AM - 4 PM', url: '/contact' },
          ],
        },
        {
          label: 'Quick Links',
          links: [
            { label: 'Menu', url: '/menu' },
            { label: 'About', url: '/about' },
            { label: 'Blog', url: '/posts' },
            { label: 'Events', url: '/events' },
          ],
        },
        {
          label: 'Connect',
          links: [
            { label: 'Instagram', url: 'https://instagram.com' },
            { label: 'Newsletter', url: '/newsletter' },
          ],
        },
        {
          label: 'Legal',
          links: [
            { label: 'Privacy Policy', url: '/privacy' },
            { label: 'Terms of Service', url: '/terms' },
          ],
        },
      ],
      copyright: `© ${new Date().getFullYear()} Baker Street Bakery. All rights reserved.`,
    },
  })

  payload.logger.info('Seed complete.')
}
