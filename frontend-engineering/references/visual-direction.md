# Visual direction

## Contents
- Design brief
- Process: plan → review → build → critique
- Anti-generic ("AI slop" patterns)
- Layout and spacing
- Typography
- Color and surfaces
- Motion
- Interface copy (UX writing)

## Design brief

Before coding, choose **one** direction that fits the product. Examples: restrained editorial, premium monochrome, warm tactile SaaS, precise technical tooling, dense data workspace, calm finance/productivity, playful consumer product, high-contrast launch page.

Define internally:

1. **Mood** — 3 to 5 adjectives.
2. **Visual anchor** — the most memorable element on the screen.
3. **Density** — airy, balanced, or dense.
4. **Surfaces** — flat, layered, bordered, tinted, or elevated.
5. **Typography** — display-led, utility-led, editorial, technical.
6. **Interaction character** — quiet, crisp, playful, tactile, or utilitarian.

Every later decision should serve this direction. Draw visual references from the subject's world (industry, materials, vernacular), not from SaaS templates.

**Spend your boldness in one place.** One or two memorable decisions; everything else disciplined.

If the project already has a font, palette, or brand, keep it — unless the request includes a rebrand. If `docs/design/DESIGN.md` exists, the direction comes from it.

## Process

1. **Plan:** 4–6 named colors (hex), type roles, a layout concept (ASCII wireframe if it helps), alignment principles.
2. **Review the plan:** compare it with the brief; replace anything that is a generic default; note what changed and why.
3. **Build:** semantic, responsive structure first. Watch CSS specificity and section margins that cancel out or stack.
4. **Critique:** responsiveness, visible focus, reduced motion, contrast, palette harmony. Take screenshots if possible. Try **removing one element** — if nothing is lost, it should not be there.

## Anti-generic

### Do not default to
- giant centered hero + gradient word + two CTAs
- purple/blue gradients without brand justification
- excessive glassmorphism, blobs, glowing orbs, random mesh gradients
- every section inside a rounded card; three identical feature cards
- fake metrics with no product meaning ("10x faster")
- excessive pills, badges, `rounded-2xl`/`rounded-3xl`
- huge shadows instead of hierarchy
- an icon inside a colored square on every row
- sparkles, wand, rocket, brain, or robot icons for ordinary actions
- empty copy: "revolutionize", "supercharge", "unlock", "next-generation"
- tracked all-caps eyebrows, middle-dot metadata, "WORD — fragment" labels, decorative monospace labels, arrows on every link
- worn-out AI aesthetic clusters: cream background + terracotta, near-black + acid green, "broadsheet" hairlines
- perfect symmetry when the content wants editorial asymmetry
- a dashboard that is just a grid of cards

Use any of these **only** if the brief or brand explicitly asks for it.

### Prefer
- content-driven hierarchy
- restrained color accents; intentional whitespace
- borders and dividers that **encode information** (numbering only for real sequences)
- rhythm created by spacing and typography
- asymmetry when it improves emphasis
- realistically shaped content, not placeholder
- subtle surface changes instead of gratuitous shadows

## Layout and spacing

Mental scale (4px base):

| Value | Use |
|---|---|
| 4px | micro alignment |
| 8px | tight internal spacing |
| 12–16px | between parts of a component |
| 20–24px | grouped content |
| 32–48px | section separation |
| 64px+ | major page rhythm, mostly on large screens |

- Few container widths; not a different `max-w-*` per section.
- Reading lines of at most ~65–80 characters.
- Grid only for truly two-dimensional content; flex or normal flow otherwise.
- Align everything to a grid, baseline, edge, or optical center; nudge ~1px when optical beats geometric.
- Concentric nested radii: child radius ≤ parent radius.
- Respect safe areas (`env(safe-area-inset-*)`).
- Test short, average, and very long content.

## Typography

Typography establishes hierarchy before color or effects.

- One family, or two clearly distinct ones, chosen deliberately.
- Restrained scale; strong contrast between page title, section title, label, and metadata.
- Comfortable body line-height (≈1.5–1.7); serifs want a bit more.
- Slightly negative tracking only on large display text.
- Tabular numerals (`tabular-nums`) for metrics and comparisons.

Avoid: 5–6 sizes inside one card; tiny gray text for important information; all-caps labels everywhere; marketing headings inside product UI; accenting a single headline word.

## Color and surfaces

- Semantic tokens (shadcn/Tailwind theme variables) instead of arbitrary colors.
- Color communicates brand, hierarchy, status, selection, and feedback — never the only indicator of state (pair with text/icon).
- Dominant colors with sharp accents beat timid, evenly distributed palettes.
- Few, coherent grays. Many near-identical grays look accidental.
- On non-neutral backgrounds, tint borders, shadows, and text toward the background hue.
- Shadows: at least two layers (ambient + direct); semi-transparent borders improve edge definition.
- Hover, active, and focus with more contrast than the rest state.
- Dark mode preserves hierarchy rather than inverting colors; set `color-scheme` on `<html>`.
- Color-blind-safe chart palettes.

## Motion

Motion is good when it explains a state change, preserves spatial continuity, confirms direct manipulation, or improves perceived responsiveness. Do not animate because the page "feels static".

- One orchestrated moment beats scattered effects. Avoid fade-and-slide on every section and animated hover on every card.
- Entrances use **ease-out**, not ease-in.
- Animate only `transform` and `opacity`. Never `transition: all` — list the properties.
- Anchor `transform-origin` where the motion physically starts.
- Animations must be interruptible by user input.
- Gestures: the element tracks the finger 1:1 and inherits velocity on release.
- Order of preference: CSS → Web Animations API → JS library (only if needed).
- Always provide a `prefers-reduced-motion` variant.
- No autoplay except muted, non-essential loops; motion longer than 5s needs a pause control.

## Interface copy

- Plain language, active voice, second person, sentence case.
- Specific labels: "Save API key", not "Continue". Same name for the same action across the product.
- Errors say what happened **and** how to fix it.
- Empty states invite the next action.
- Menu items that open something and loading states end with an ellipsis (`…`, single character).
- Format dates, numbers, and currencies in the user's locale.
