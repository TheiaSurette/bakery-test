import { Section } from '@/components/layout/Section'

export const metadata = {
  title: 'About | Our Story',
  description: 'Learn about our bakery, our values, and the team behind every loaf.',
}

const values = [
  {
    title: 'No Shortcuts',
    description:
      'Every dough gets the time it needs. We ferment for 24 to 48 hours because flavour cannot be rushed.',
  },
  {
    title: 'Stone-Milled Only',
    description:
      'We source heritage grains and mill them in-house. The difference is in every bite.',
  },
  {
    title: 'Shaped by Hand',
    description:
      'No machines form our loaves. Every baguette, boule, and batard is shaped by a baker who cares.',
  },
]

const team = [
  {
    name: 'Elena Morales',
    role: 'Head Baker & Founder',
    bio: 'Trained in Lyon, obsessed with sourdough. Elena left restaurant kitchens in 2017 to start baking bread the way it was meant to be made.',
  },
  {
    name: 'James Whitfield',
    role: 'Pastry Chef',
    bio: 'James brings 12 years of pastry experience and an unhealthy dedication to laminated doughs. His croissants have a cult following.',
  },
  {
    name: 'Priya Desai',
    role: 'Operations & Community',
    bio: 'Priya keeps the ovens running and the community connected. She also manages our farmers market presence and wholesale accounts.',
  },
]

export default function AboutPage() {
  return (
    <>
      <Section dark>
        <div className="py-12 text-center sm:py-20">
          <p className="text-sm font-medium uppercase tracking-[0.3em] text-muted-foreground">
            Since 2017
          </p>
          <h1 className="mt-4 font-[family-name:var(--font-bebas)] text-5xl uppercase leading-[0.85] sm:text-7xl lg:text-8xl">
            Our <span className="text-primary">Story</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
            What started as one baker and a borrowed oven has grown into Portland&apos;s favourite
            neighbourhood bakery.
          </p>
        </div>
      </Section>

      <Section>
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.3em] text-muted-foreground">
              How it began
            </p>
            <h2 className="mt-4 font-[family-name:var(--font-bebas)] text-4xl uppercase leading-[0.85] sm:text-5xl">
              From a <span className="text-primary">Borrowed Oven</span> to Baker Street
            </h2>
            <div className="mt-6 space-y-4 text-muted-foreground">
              <p>
                In 2017, Elena Morales started baking sourdough in her apartment kitchen with a
                single cast-iron Dutch oven. What began as loaves for neighbours quickly became a
                weekend farmers market stall, then a pop-up, then a line around the block.
              </p>
              <p>
                By 2019, we opened our doors at 327 Baker Street. The name was too perfect to pass
                up. We gutted the space, installed a stone deck oven from France, and started baking
                seven days a week.
              </p>
              <p>
                Today, we bake over 500 loaves daily, but the process has not changed. Long
                fermentation, heritage grains, and hands that know the dough. No shortcuts, no
                compromises.
              </p>
            </div>
          </div>
          <div className="aspect-[4/3] rounded-2xl bg-muted" />
        </div>
      </Section>

      <Section className="bg-primary text-primary-foreground">
        <div className="text-center">
          <p className="text-sm font-medium uppercase tracking-[0.3em] text-primary-foreground/70">
            What we believe
          </p>
          <h2 className="mt-4 font-[family-name:var(--font-bebas)] text-4xl uppercase leading-[0.85] sm:text-5xl">
            Our Values
          </h2>
        </div>
        <div className="mt-12 grid gap-8 sm:grid-cols-3">
          {values.map((value) => (
            <div key={value.title} className="text-center">
              <h3 className="font-[family-name:var(--font-bebas)] text-2xl uppercase tracking-wider">
                {value.title}
              </h3>
              <p className="mt-3 text-primary-foreground/80">{value.description}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <div className="text-center">
          <p className="text-sm font-medium uppercase tracking-[0.3em] text-muted-foreground">
            The people
          </p>
          <h2 className="mt-4 font-[family-name:var(--font-bebas)] text-4xl uppercase leading-[0.85] sm:text-5xl">
            Meet the <span className="text-primary">Team</span>
          </h2>
        </div>
        <div className="mt-12 grid gap-8 sm:grid-cols-3">
          {team.map((member) => (
            <div key={member.name} className="text-center">
              <div className="mx-auto mb-6 size-32 rounded-full bg-muted" />
              <h3 className="font-[family-name:var(--font-bebas)] text-xl uppercase tracking-wider">
                {member.name}
              </h3>
              <p className="mt-1 text-sm text-primary">{member.role}</p>
              <p className="mt-3 text-sm text-muted-foreground">{member.bio}</p>
            </div>
          ))}
        </div>
      </Section>
    </>
  )
}
