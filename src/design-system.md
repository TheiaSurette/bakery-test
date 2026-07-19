# Design System — Bakery Test (Bold Maximalist)

## Typography
- Display: Bebas Neue (weight 400, variable --font-bebas)
- Body: Inter (system default via --font-sans)
- Heading scale: text-7xl sm:text-8xl md:text-9xl lg:text-[10rem] (hero), text-6xl sm:text-7xl md:text-8xl (section headings)
- Section labels: text-sm font-medium uppercase tracking-[0.3em] text-muted-foreground
- All headings use font-[family-name:var(--font-bebas)] and uppercase text
- Leading: leading-[0.85] for stacked display headings

## Color Patterns
- Hero: dark bg-background with dark class, text-foreground (white), primary amber accents
- Signature/light sections: bg-background text-foreground
- Story section: bg-primary text-primary-foreground (full amber)
- Dark sections: use Section dark prop (activates dark mode tokens)
- Section alternation: dark → light → primary → dark → secondary → dark
- Stats numbers: text-primary (amber)
- Muted text: text-muted-foreground or opacity variants (/70, /60, /50, /40)

## Layout
- Container: max-w-7xl (via Container component)
- Section spacing: py-16 lg:py-24 (via Section component), hero gets extra py-24 md:py-32 lg:py-40
- Grid: 2-column for hero (content + image), 3-column for cards, single column for lists
- Image placeholders: bg-muted with aspect ratios, overlapping offset elements (bg-primary/30, bg-accent/40)
- Decorative circles: large translucent rounded-full elements positioned absolutely

## Component Variants Used
- Buttons: variant="default" + size="xl" for primary CTAs, variant="inverted" + size="xl" for secondary on dark/colored sections
- Cards: default with border-border, hover:border-primary/40 hover:shadow-lg transition
- Badges: variant="secondary" for tags (text-xs tracking-wider uppercase), variant="outline" for featured labels
- Testimonial cards: bg-card with large Bebas Neue open-quote in text-primary/30

## Visual Signatures
- Giant stacked uppercase headlines with leading-[0.85]
- Primary color word highlights within headlines (e.g., "BREAD <span class='text-primary'>WORTH</span> WAKING UP FOR")
- Overlapping decorative elements: offset colored divs behind images, large translucent circles
- Daily rotation as typographic list: day name in amber, item name in white, note in muted
- Stats bar: Bebas Neue large numbers in amber with small uppercase labels
- Section dividers via full-bleed background color changes, not lines
