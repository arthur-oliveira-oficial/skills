# Responsive layout: mobile, tablet, desktop

Normative rules for adapting interfaces across screen sizes and input types. Mobile-first is mandatory; tablet and desktop are deliberate enhancements, not stretched or shrunk versions of each other.

## Contents
- Principles
- Size classes and breakpoints
- Mobile (compact)
- Tablet (medium / expanded)
- Desktop (large / extra-large)
- Pattern transformation table
- Input modality (pointer, hover, keyboard)
- Container queries
- Fluid typography and spacing
- Viewport, safe areas, virtual keyboard
- Orientation, split view, foldables
- Responsive media
- Anti-patterns
- Testing protocol

## Principles

1. **Mobile-first.** Base styles target the smallest viewport; larger breakpoints only add (`sm:`, `md:`, `lg:`…). Never write desktop styles and patch mobile with `max-width` overrides.
2. **Same capabilities everywhere.** A smaller screen may reorganize or defer features (progressive disclosure), never remove what users need.
3. **Breakpoints follow content, not devices.** Add a breakpoint where the layout breaks, not where "an iPad" is. Device names are only test references.
4. **Width ≠ input type.** A tablet can have a mouse; a laptop can have a touchscreen; an iPad in Split View can be phone-width. Detect capabilities with media queries, never by user agent.
5. **Components adapt to their container**, pages adapt to the viewport (see container queries).
6. **Respect user settings:** zoom up to 200–400%, text size, reduced motion, orientation. Never disable zoom or lock orientation without strong reason.

## Size classes and breakpoints

If the project or `DESIGN.md` defines breakpoints, use them. Otherwise use the Tailwind defaults, grouped into size classes (aligned with Material 3 window size classes):

| Size class | Width | Tailwind | Typical context | Columns | Outer margin | Navigation |
|---|---|---|---|---|---|---|
| Compact | < 640px | base | phones portrait | 4 (content: 1) | 16px | bottom bar (3–5 items) or top bar + drawer |
| Medium | 640–1023px | `sm:` `md:` | large phones landscape, tablets portrait, foldables, split view | 8 (content: 1–2) | 24px | navigation rail or collapsible drawer |
| Expanded | 1024–1279px | `lg:` | tablets landscape, small laptops | 12 (content: 2) | 24–32px | rail or persistent sidebar |
| Large | 1280–1535px | `xl:` | laptops, desktops | 12 (content: 2–3) | 32px+ | persistent sidebar / top nav |
| Extra-large | ≥ 1536px | `2xl:` | large and ultra-wide monitors | 12, capped width | auto (centered) | persistent sidebar / top nav |

Gutters between columns: 16px compact, 24px medium+.

## Mobile (compact)

**Layout**
- Single content column; forms always single-column.
- 16px side margins; full-bleed only for media and intentional sections.
- Vertical rhythm over horizontal arrangements; avoid side-by-side content that needs < 280px per column.
- Content priority: what the user came for first; secondary metadata collapsed.

**Navigation**
- Bottom navigation bar for 3–5 top-level destinations; more → top bar with menu/drawer.
- Back is always available and predictable; deep screens use a top bar with back + title.
- Sticky headers ≤ ~56px and ideally collapsing on scroll; never stack multiple sticky bars.

**Thumb zone and actions**
- Primary actions reachable by the thumb: bottom area, sticky bottom action bar, or FAB for one dominant create action.
- Destructive actions away from frequently tapped spots.
- Touch targets ≥ 44×44px for important controls (24px is the WCAG minimum); ≥ 8px between adjacent targets.

**Overlays**
- Prefer bottom sheets over centered modals; long forms open as full-screen dialogs or pages.
- Dialogs fit `100dvh` with internal scrolling; the action row stays visible.
- Menus and selects: native or sheet-based pickers.

**Content**
- Body text ≥ 16px; inputs ≥ 16px (avoids iOS auto-zoom).
- Tables become cards, stacked rows, or an intentional horizontal scroll region with a sticky first column.
- Nothing depends on hover. Tooltip content must also be reachable by tap or be inline.
- Landscape phones (~375px tall): minimize fixed chrome; ensure dialogs and keyboards still leave room to work.

## Tablet (medium / expanded)

Tablets are not big phones nor small desktops. Use the extra space for **context**, not just larger elements.

**Layout**
- Two panes when content has a list → detail relationship (master-detail): list ~320–400px, detail fills the rest. In portrait/medium, detail can replace the list (with back) or open as an overlay.
- Grids of cards: 2 columns medium, 3 expanded.
- Forms: single column centered with max width ~640px; two columns only for short related fields (city/state, first/last name).
- Line length still capped at ~65–80ch; do not let text span the full tablet width.

**Navigation**
- Navigation rail (~72–80px, icon + label) on medium; persistent or collapsible sidebar (~240–280px) on expanded.
- Bottom bar may persist on medium if the app is phone-first, but never alongside a rail.

**Input**
- Assume touch **and** possibly keyboard, trackpad, or stylus: support hover states when available (`@media (hover: hover)`), keyboard shortcuts, and visible focus.
- Touch targets remain ≥ 44px when the pointer is coarse.

**Overlays**
- Centered dialogs with max width (~480–640px) instead of full-screen; sheets can be side sheets.
- Popovers and menus anchored to their trigger instead of bottom sheets on expanded.

**Orientation**
- Portrait ≈ medium, landscape ≈ expanded: the layout must switch live on rotation without losing state, scroll position, or form input.

## Desktop (large / extra-large)

**Layout**
- 12-column grid; persistent sidebar (240–280px, collapsible to a rail); multi-pane layouts (list / detail / inspector) when the task benefits.
- Cap content width: app content ~1200–1440px, reading text ~65–80ch, forms ~640–720px. On ultra-wide screens, center or add panes — never stretch lines or cards indefinitely.
- Higher density is acceptable for data-heavy tools (tables with more columns, compact rows), but keep a comfortable default and optionally offer a density toggle.

**Interaction**
- Hover can reveal secondary affordances (row actions, previews), but every hover-revealed action must also be reachable by keyboard focus and on touch devices.
- Keyboard shortcuts for frequent actions, shown in menus/tooltips with platform symbols.
- Autofocus the primary input when a page's purpose is to type (search, compose).
- Tooltips are fine for icon-only controls; never as the only source of essential information.
- Context menus (right click) are optional accelerators, never the only path.

**Overlays**
- Centered modals for short, focused tasks; side panels/drawers for contextual editing that keeps the page visible.
- Dropdowns, popovers, and comboboxes anchored to triggers.

## Pattern transformation table

| Pattern | Mobile (compact) | Tablet (medium/expanded) | Desktop (large+) |
|---|---|---|---|
| Top-level navigation | bottom bar or drawer | navigation rail / collapsible sidebar | persistent sidebar or top nav |
| List + detail | sequential screens | two panes (expanded) or overlay detail (medium) | two or three panes |
| Data table | cards / stacked rows / scroll region with sticky first column | table with priority columns, others hidden behind "columns" control | full table, sortable, optional density toggle |
| Filters | filter sheet with apply button | side sheet or collapsible panel | persistent filter sidebar or inline toolbar |
| Secondary actions | overflow menu | overflow menu + some inline | inline toolbar, hover row actions (also focusable) |
| Primary action | sticky bottom bar or FAB | top-right of content area or FAB | page header action area |
| Forms | 1 column, full width | 1 column, max ~640px; short related fields paired | 1–2 columns, max ~720px, with summary/aside if useful |
| Dialogs | bottom sheet or full-screen | centered, max ~560px | centered modal or side panel |
| Tabs | scrollable tabs or segmented control | tabs | tabs or vertical tabs in sidebar |
| Dashboard | prioritized single column of key metrics | 2-column grid | 3–4 column grid, capped width |
| Search | full-screen search view | expanding search field | persistent search field / command palette (⌘K) |

## Input modality

Combine width with capability queries:

| Query | Use for |
|---|---|
| `@media (pointer: coarse)` | enlarge targets, spacing, prefer sheets |
| `@media (pointer: fine)` | allow denser controls, smaller hit areas (still ≥ 24px) |
| `@media (hover: hover)` | hover-revealed affordances, tooltips on hover |
| `@media (hover: none)` | show affordances persistently; no hover-only content |
| `@media (any-pointer: coarse)` | hybrid devices (touch laptop): keep targets touch-friendly |

Tailwind: v4 applies `hover:` only on devices that support hover; in v3 enable `future.hoverOnlyWhenSupported`. Use v4's `pointer-coarse:` / `pointer-fine:` variants, or arbitrary variants (`[@media(pointer:coarse)]:`) in v3.

Keyboard: every layout at every size must remain fully keyboard-operable (external keyboards on tablets and phones exist).

## Container queries

Use when a component appears in containers of different widths (card in sidebar vs. main area, widget in dashboard grid):

- CSS: `container-type: inline-size` on the parent, `@container (min-width: 400px) { … }` in the child.
- Tailwind v4: `@container` on the parent and `@sm:`, `@md:`, `@lg:` on children (built in). v3: `@tailwindcss/container-queries` plugin.
- Rule of thumb: page-level layout → viewport breakpoints; reusable components → container queries.

## Fluid typography and spacing

- Use `rem` for type so user font-size settings and zoom work.
- Scale display/headline sizes fluidly with `clamp()`: e.g. `font-size: clamp(1.75rem, 1.2rem + 2.5vw, 3rem)`. Always include a `rem` term so zoom still scales.
- Body text stays ~16–18px across sizes; do not shrink it on mobile.
- Section spacing can scale (e.g. 32px mobile → 64px+ desktop); component internal spacing stays mostly constant.
- Mobile headings are designed for mobile, not desktop sizes scaled down.

## Viewport, safe areas, virtual keyboard

- Viewport meta: `width=device-width, initial-scale=1, viewport-fit=cover`. Never `user-scalable=no` or `maximum-scale=1`.
- Use `dvh` for elements that must match the visible viewport, `svh` for stable minimum heights; avoid `100vh` on mobile.
- Pad fixed/sticky elements with `env(safe-area-inset-*)` (notches, home indicator, rounded corners).
- Virtual keyboard: the focused input and the submit action must stay visible. Consider `interactive-widget=resizes-content` in the viewport meta and the `VisualViewport` API for fixed bottom bars; scroll the focused field into view.

## Orientation, split view, foldables

- Never lock orientation for web content without a strong reason (e.g. a game).
- Treat resize as normal: rotation, iPad Split View/Slide Over, desktop window resizing, and foldables changing posture must re-layout live, preserving state, scroll, focus, and form input.
- Do not assume a minimum width from the device type: a tablet app in split view may be 320px wide.

## Responsive media

- `srcset` + `sizes` (or `next/image` `sizes`) so each size class downloads an appropriate image.
- `<picture>` for art direction when the crop must change between mobile and desktop.
- Explicit `width`/`height` or `aspect-ratio` to avoid layout shift.
- Video: responsive containers with `aspect-ratio`; no autoplay with sound.

## Anti-patterns

- User-agent sniffing or separate "mobile site" logic.
- Hiding features on mobile instead of reorganizing them.
- Desktop layout shrunk to fit (tiny text, tiny targets) or mobile layout stretched on desktop (giant single column, 2000px-wide lines).
- Hover-only actions, tooltips with essential info, drag-only interactions.
- Fixed pixel heights that clip content when text wraps or is zoomed.
- `100vh` full-screen sections on mobile; multiple stacked sticky bars.
- Breakpoints named after devices (`ipad:`), or dozens of one-off breakpoints.
- Horizontal page scroll at any width ≥ 320px (intentional scroll regions are fine).
- Modals with long forms on phones.

## Testing protocol

Check at minimum (automate with `agent-browser` — commands in `browser-verification.md`; real devices are still preferred for touch and keyboard feel):

| Width × height | Represents |
|---|---|
| 320 × 568 | smallest supported phone |
| 375–390 × 667–844 | common phones |
| 430 × 932 | large phones |
| 667–844 × 375–390 | phone landscape |
| 768 × 1024 | tablet portrait / split view |
| 1024 × 768 – 1180 × 820 | tablet landscape |
| 1280 × 800 | small laptop |
| 1440 × 900 | desktop |
| 1920+ (or zoom 50%) | large / ultra-wide |

Also verify:
- Rotation and live resize keep state.
- 200% zoom and large text settings without loss of content or function (WCAG 1.4.4 / 1.4.10 reflow at 320 CSS px).
- Touch behavior: no hover-only actions, target sizes, and a real device or DevTools device mode with touch enabled for gesture/`pointer: coarse` changes (agent-browser `set device` emulates size, DPR, and user agent only).
- Virtual keyboard open on forms (mobile).
- Keyboard-only navigation at mobile and desktop widths.
