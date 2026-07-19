import { Section } from '@/components/layout/Section'

export const metadata = {
  title: 'Contact | Get in Touch',
  description: 'Visit us at 327 Baker Street, Portland OR. Open daily 6 AM to 4 PM.',
}

const contactInfo = [
  { label: 'Address', value: '327 Baker Street\nPortland, OR 97205' },
  { label: 'Phone', value: '(503) 555-0172' },
  { label: 'Email', value: 'hello@bakeryonbaker.com' },
]

const hours = [
  { day: 'Monday - Friday', time: '6:00 AM - 4:00 PM' },
  { day: 'Saturday', time: '7:00 AM - 4:00 PM' },
  { day: 'Sunday', time: '7:00 AM - 2:00 PM' },
]

export default function ContactPage() {
  return (
    <>
      <Section dark>
        <div className="py-12 text-center sm:py-20">
          <p className="text-sm font-medium uppercase tracking-[0.3em] text-muted-foreground">
            We&apos;d love to hear from you
          </p>
          <h1 className="mt-4 font-[family-name:var(--font-bebas)] text-5xl uppercase leading-[0.85] sm:text-7xl lg:text-8xl">
            Get in <span className="text-primary">Touch</span>
          </h1>
        </div>
      </Section>

      <Section>
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <h2 className="font-[family-name:var(--font-bebas)] text-3xl uppercase leading-[0.85] sm:text-4xl">
              Find Us
            </h2>
            <div className="mt-8 space-y-6">
              {contactInfo.map((item) => (
                <div key={item.label}>
                  <p className="text-sm font-medium uppercase tracking-[0.3em] text-muted-foreground">
                    {item.label}
                  </p>
                  <p className="mt-1 whitespace-pre-line text-lg text-foreground">{item.value}</p>
                </div>
              ))}
            </div>
            <div className="mt-8">
              <p className="text-sm font-medium uppercase tracking-[0.3em] text-muted-foreground">
                Hours
              </p>
              <div className="mt-3 space-y-2">
                {hours.map((item) => (
                  <div key={item.day} className="flex justify-between text-foreground">
                    <span>{item.day}</span>
                    <span className="text-muted-foreground">{item.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="aspect-[4/3] rounded-2xl bg-muted" />
        </div>
      </Section>

      <Section className="bg-primary text-primary-foreground">
        <div className="text-center">
          <h2 className="font-[family-name:var(--font-bebas)] text-4xl uppercase leading-[0.85] sm:text-5xl">
            Visit Us
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-primary-foreground/80">
            327 Baker Street, Portland, OR 97205. Walk-ins welcome, no reservation needed. We save
            the best loaves for early risers.
          </p>
        </div>
      </Section>
    </>
  )
}
