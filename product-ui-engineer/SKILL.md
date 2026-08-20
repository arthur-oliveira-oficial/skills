---
name: frontend-design-premium
description: Design and implement distinctive, production-grade frontends with Next.js, React, Tailwind CSS, shadcn/ui, and Lucide. Use for pages, dashboards, SaaS apps, landing pages, admin panels, product interfaces, component systems, redesigns, and UI polishing where strong visual quality, mobile-first UX, accessibility, responsive behavior, and a non-generic human-designed feel are required.
---

# Frontend Design Premium

Build interfaces that feel intentionally designed, not generated from a generic AI template.

The goal is not maximum decoration. The goal is a clear visual point of view, strong hierarchy, excellent interaction design, responsive behavior, accessible semantics, and production-quality React/Next.js code.

## Core stack

Prefer and preserve the project's existing stack. When starting fresh, default to:

- Next.js App Router
- React + TypeScript
- Tailwind CSS
- shadcn/ui
- Lucide React icons

Do not add another component library, icon library, CSS framework, animation library, or state library unless the task genuinely requires it.

## 1. Start by understanding the product

Before writing JSX, infer or identify:

- product type: SaaS, marketplace, dashboard, landing page, consumer app, internal tool, portfolio, etc.
- primary user and their main job-to-be-done
- primary action on the current screen
- information hierarchy
- content density appropriate to the product
- trust level required: casual, premium, enterprise, financial, health, developer tool, etc.
- existing brand signals in the repository

If a repository already exists, inspect before changing anything:

- `package.json`
- `app/` or `src/app/`
- `components.json`
- existing `components/ui/*`
- global CSS and theme tokens
- font configuration
- layout primitives
- existing icon usage
- existing responsive conventions

Reuse existing conventions when they are coherent. Improve them when they are weak.

## 2. Choose a visual direction before coding

Do not begin with random cards and gradients.

Pick one coherent design direction suitable for the product, for example:

- restrained editorial
- premium monochrome
- warm tactile SaaS
- precise technical tooling
- dense data workspace
- calm finance/productivity
- playful consumer product
- high-contrast launch page

Define a short internal design brief:

1. **Mood** — 3 to 5 adjectives.
2. **Visual anchor** — the strongest memorable element on the screen.
3. **Density** — airy, balanced, or dense.
4. **Surface strategy** — flat, layered, bordered, tinted, or elevated.
5. **Typography strategy** — display-led, utility-led, editorial, technical, etc.
6. **Interaction character** — quiet, crisp, playful, tactile, or utilitarian.

Every later design decision should support this direction.

## 3. Anti-generic / anti-AI rules

Avoid patterns that make the interface look mass-generated.

### Do not default to

- giant centered hero heading + gradient word + two CTA buttons
- purple/blue gradients without brand justification
- excessive glassmorphism
- every section wrapped in a rounded card
- repeated identical 3-column feature cards
- fake metrics with no product meaning
- decorative blobs, glowing orbs, or random mesh gradients
- excessive pills and badges
- excessive `rounded-2xl` / `rounded-3xl` everywhere
- huge shadows as a substitute for hierarchy
- icon inside a colored rounded square for every row
- random sparkle, wand, rocket, brain, bot, or stars icons for ordinary actions
- empty marketing copy such as “revolutionize”, “supercharge”, “unlock”, or “next-generation” unless the brand genuinely uses it
- perfectly symmetric layouts when the content benefits from editorial asymmetry
- unnecessary dashboards made from a grid of cards

### Prefer

- content-driven hierarchy
- one or two memorable visual decisions instead of many decorations
- restrained color accents
- intentional whitespace
- meaningful borders and separators
- layout rhythm created by spacing and typography
- asymmetry when it improves emphasis
- real empty states, validation states, loading states, and error states
- realistic content shapes instead of placeholder-looking copy
- subtle surface changes instead of gratuitous shadows

Read `references/anti-ai-ui.md` for the extended anti-pattern guide.

## 4. Mobile-first is mandatory

Design the smallest useful viewport first.

Write base Tailwind classes for mobile. Add `sm:`, `md:`, `lg:`, etc. only to progressively enhance larger screens.

For every screen, verify:

- no horizontal scrolling at ~320px width
- touch targets are comfortably tappable
- forms are single-column unless there is a compelling reason otherwise
- primary action remains easy to reach
- navigation collapses intentionally, not mechanically
- tables have a deliberate mobile strategy
- dialogs and sheets fit viewport height
- sticky UI does not consume excessive vertical space
- typography does not rely on desktop-sized headings scaled down as an afterthought
- dense desktop tools transform into appropriate mobile interaction patterns

Possible mobile transformations:

- table → cards, stacked rows, or horizontally scrollable data region
- sidebar → sheet/drawer
- secondary actions → overflow menu
- multi-column filters → filter sheet
- split-pane → sequential screens or tabs
- inline actions → bottom action bar when appropriate

Do not hide important functionality merely to make mobile fit.

## 5. UX before visual polish

A beautiful interface with poor interaction design is a failed result.

Always determine:

- what is clickable
- what is editable
- what is selected
- what is loading
- what failed
- what is disabled and why
- what the user should do next

Use clear feedback for user actions.

For forms:

- use visible labels
- include concise help text only where needed
- show field-level validation near the field
- preserve user input after validation errors
- use appropriate input types and autocomplete attributes
- differentiate destructive actions clearly
- prevent accidental destructive actions when consequences are meaningful

For data-heavy interfaces:

- prioritize scanability
- align numerical values consistently
- expose sorting/filtering only when useful
- separate primary from secondary metadata
- prefer progressive disclosure over showing everything at once

## 6. Layout and spacing

Use a deliberate spacing system. Do not choose margins independently for every element.

Recommended mental model:

- 4px: micro alignment
- 8px: tight internal spacing
- 12–16px: component spacing
- 20–24px: grouped content
- 32–48px: section separation
- 64px+: major page rhythm, mostly on larger screens

Use fewer container widths. A product should not have a different `max-w-*` on every section.

Avoid overly wide reading lines. Text-heavy content should remain comfortably readable.

Use grid only when the content is truly two-dimensional. Use flex or normal flow for simpler relationships.

## 7. Typography

Typography establishes hierarchy before color or effects.

Use:

- a restrained type scale
- strong contrast between page title, section title, labels, and metadata
- readable line-height for body copy
- slightly tighter tracking only for large display text when appropriate
- tabular numerals for metrics when alignment matters

Avoid:

- five or six font sizes inside one card
- tiny gray text for important information
- all-uppercase body labels everywhere
- oversized marketing headings in product UI

If the project already has a font, keep it unless the task explicitly includes rebranding.

## 8. Color and surfaces

Prefer semantic theme tokens over arbitrary colors.

Use the existing shadcn/Tailwind theme variables when available.

Color should communicate:

- brand
- hierarchy
- status
- selection
- feedback

Do not use color as the only indicator of state.

Keep neutral surfaces coherent. Too many slightly different grays make interfaces feel accidental.

Dark mode must preserve hierarchy rather than simply invert colors.

## 9. shadcn/ui usage

Treat shadcn/ui as editable source code, not a visual constraint.

Before adding components:

1. inspect existing `components.json`
2. inspect existing UI primitives
3. identify whether the project uses Base UI, Radix, or another supported setup
4. use the project's package manager for shadcn CLI commands
5. add only components actually needed

Prefer composition from existing primitives before inventing duplicate abstractions.

Customize shadcn components when necessary to match the selected visual direction, while preserving accessible behavior.

Do not manually recreate a complex accessible primitive if shadcn already provides the correct component.

## 10. Lucide icon rules

Use `lucide-react` unless the project already has another established icon strategy.

Import icons individually.

Icons should clarify actions or concepts, not decorate empty space.

Rules:

- use a consistent default size within a context
- pair unfamiliar icon-only controls with accessible labels/tooltips
- use `aria-hidden="true"` for purely decorative icons
- avoid mixing filled icon styles with Lucide outline icons without a strong reason
- do not use icons in every heading
- use conventional icons for conventional actions

Examples:

- Search → `Search`
- Settings → `Settings`
- Add → `Plus`
- Delete → `Trash2`
- Edit → `Pencil`
- External link → `ExternalLink`
- More actions → `Ellipsis`
- Close → `X`
- Menu → `Menu`

Avoid novelty icon choices that reduce clarity.

## 11. Next.js / React implementation rules

### Server vs client

With App Router, keep components server-rendered by default.

Add `"use client"` only where client-side interactivity or browser APIs require it.

Do not make an entire page client-side because one small control needs state.

Push client boundaries down to the smallest practical interactive component.

### Component design

Create components when there is meaningful reuse, independent behavior, or a clear conceptual boundary.

Do not fragment JSX into dozens of tiny files solely to appear architected.

Prefer:

- semantic component names
- explicit props
- small, composable primitives
- colocated types when local
- predictable state ownership

Avoid premature generic component systems.

### Data and loading

Use the project's established data-fetching approach.

Design loading, empty, error, and success states as part of the UI — not as afterthoughts.

Prefer skeletons that resemble the final content structure. Do not use spinners for every load state.

## 12. Accessibility baseline

Accessibility is a design constraint, not a final audit step.

Ensure:

- semantic HTML first
- correct heading hierarchy
- keyboard navigation
- visible focus states
- labels for form controls
- accessible names for icon-only buttons
- sufficient contrast
- dialogs/sheets manage focus through accessible primitives
- status changes are understandable without relying only on color
- motion respects `prefers-reduced-motion` when custom animation is introduced

Do not remove focus outlines without replacing them with an equally visible focus indicator.

## 13. Motion

Use motion sparingly.

Good motion:

- explains state change
- preserves spatial continuity
- confirms direct manipulation
- improves perceived responsiveness

Avoid animation merely because the page feels “too static”.

Prefer CSS transitions for simple hover/focus/open-state changes. Add an animation dependency only if the product interaction truly needs it.

## 14. Performance and production quality

Do not sacrifice performance for visual flourish.

Prefer:

- optimized images
- responsive image sizing
- appropriate Server Components
- lazy loading for genuinely heavy client-only modules
- limited client JavaScript
- stable layout without avoidable content shift
- no unnecessary effect-driven state synchronization

Remove dead code, unused imports, placeholder content, and console noise before considering the implementation complete.

## 15. Implementation workflow

Follow this sequence for substantial UI work.

### Step A — Inspect

Understand repository conventions, existing components, theme, layout, and constraints.

### Step B — Frame the UX

Identify primary task, user flow, page hierarchy, important states, and mobile behavior.

### Step C — Set visual direction

Choose mood, density, surface model, typography approach, and one visual anchor.

### Step D — Build structure first

Implement semantic layout and responsive behavior before decorative polish.

### Step E — Use existing primitives

Compose shadcn primitives and established project components.

### Step F — Polish deliberately

Tune typography, spacing, borders, surfaces, states, and icon sizing.

### Step G — Test responsive behavior

At minimum reason through or inspect approximately:

- 320–375px mobile
- 390–430px modern mobile
- ~768px tablet
- ~1024px small laptop
- 1280–1440px desktop

### Step H — Review quality

Use `references/review-checklist.md` before finishing.

## 16. Redesign mode

When asked to improve an existing UI, do not automatically rewrite everything.

First identify the weakest 3–5 issues, such as:

- unclear hierarchy
- weak spacing rhythm
- excessive cardification
- inconsistent radius
- low contrast
- poor responsive transformation
- unnecessary client-side complexity
- weak empty/loading states
- cluttered actions

Then fix the highest-impact issues first while preserving working behavior.

## 17. Landing page mode

For marketing pages, first establish:

- audience
- value proposition
- proof
- objection handling
- conversion action

Avoid the generic sequence of hero → logo cloud → 3 feature cards → testimonials → pricing unless that content structure genuinely fits.

Use varied section composition and meaningful product visuals.

Do not fabricate customer logos, testimonials, statistics, or awards.

## 18. Dashboard / SaaS mode

Prioritize task completion and information scent over visual spectacle.

Good SaaS UI typically needs:

- clear active navigation
- useful page title/action area
- meaningful defaults
- empty/loading/error states
- efficient filtering/search when needed
- contextual actions near the object they affect
- responsive data representation

Avoid wrapping every metric and row in a separate floating card.

## 19. Final quality bar

Before declaring completion, ask:

- Does this look designed for this product rather than generated for any product?
- Is the primary action obvious without being loud?
- Does the screen still work at mobile width?
- Is content hierarchy readable in grayscale?
- Are components reused because they fit, not because they exist?
- Are there unnecessary gradients, pills, cards, shadows, or icons?
- Are all important states represented?
- Is interactive behavior accessible with keyboard?
- Could any decorative element be removed without losing meaning? If yes, consider removing it.
- Does the result feel calm, intentional, and production-ready?

If the answer to several questions is no, iterate before finishing.
