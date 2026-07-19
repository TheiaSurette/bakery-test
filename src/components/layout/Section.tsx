import { cn } from '@/lib/utils'
import { Container } from './Container'

function Section({
  children,
  className,
  dark = false,
  container = true,
}: {
  children: React.ReactNode
  className?: string
  dark?: boolean
  container?: boolean
}) {
  return (
    <section
      className={cn(
        'relative overflow-hidden py-16 lg:py-24',
        dark && 'dark bg-background text-foreground',
        className,
      )}
    >
      {container ? <Container>{children}</Container> : children}
    </section>
  )
}

export { Section }
