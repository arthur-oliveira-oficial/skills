# DESIGN.md specification

`DESIGN.md` is a self-contained, plain-text representation of a design system. It defines the brand/product visual identity so stylistic choices are followed across sessions, agents, and tools. It is the living source of truth, readable by humans and AI.

## Contents
- Required location
- Structure (front matter + body)
- Token schema and types
- Body sections
- Recommended names
- Unknown content
- Project sections: Decisions log, Open questions
- Authoring workflow (and the brief interview)
- Validation
- Drift audit
- Export

## Required location

New files go to `docs/design/DESIGN.md` (create `docs/design/` if needed). An existing DESIGN.md elsewhere (root, `docs/`) stays where it is and is the canonical source unless the user asks to move it; never create a second one. When reading, refining, validating, or exporting, use the existing file, or the one the user points to.

## Structure

1. **YAML front matter** (optional for a prose-only file; required to validate or export, with at least `colors.primary`): machine-readable tokens — **these are the normative values**.
2. **Markdown body:** rationale and guidance for humans. Prose may use descriptive names ("Midnight Forest Green") that correspond to tokens (`primary`).

The block starts and ends with a line containing exactly `---`.

```yaml
---
version: alpha
name: Daylight Prestige
colors:
  primary: "#1A1C1E"
  secondary: "#6C7278"
  tertiary: "#B8422E"
typography:
  h1:
    fontFamily: Public Sans
    fontSize: 48px
    fontWeight: 600
    lineHeight: 1.1
    letterSpacing: -0.02em
---
```

## Token schema

```yaml
version: <string>          # optional, current: "alpha"
name: <string>
description: <string>      # optional
omitted: <string[]|OmittedSection[]>  # optional
colors:
  <token>: <Color>
typography:
  <token>: <Typography>
rounded:
  <level>: <Dimension>
spacing:
  <level>: <Dimension | number>
components:
  <component>:
    <token>: <string | reference>
```

Common levels: `xs`, `sm`, `md`, `lg`, `xl`, `full`; any descriptive key is valid.

### Types

**Color:** any valid CSS color — hex (`#RGB`, `#RGBA`, `#RRGGBB`, `#RRGGBBAA`), named, `rgb()`, `rgba()`, `hsl()`, `hsla()`, `hwb()`, `oklch()`, `oklab()`, `lch()`, `lab()`, `color-mix()`. Converted to sRGB for WCAG contrast checks; the original format is preserved. Hex `#RRGGBB` is the recommended default.

**Typography:** `fontFamily` (string), `fontSize` (Dimension), `fontWeight` (number, e.g. `400`; quotes optional), `lineHeight` (Dimension or unitless number — multiplier recommended), `letterSpacing` (Dimension), `fontFeature` (`font-feature-settings`), `fontVariation` (`font-variation-settings`).

**Dimension:** string with a `px`, `em`, or `rem` unit.

**Omitted:** sections intentionally omitted (suppresses linter warnings). A string (`spacing`) or `{ section, reason? }`:

```yaml
omitted:
  - spacing
  - section: rounded
    reason: "Brand book defines no rounded corners"
```

**Token reference:** in braces, a path in the YAML: `{colors.primary-60}`. In most groups it must point to a primitive value, not a group. In `components`, composite references (`{typography.label-md}`) are allowed.

## Body sections

All use `##`. They may be omitted, but those present follow this order. An optional `#` title is not a section.

1. **Overview** (or "Brand & Style") — personality, audience, emotional response (playful vs. professional, dense vs. airy). Basis for decisions when no specific rule exists. Make it decidable: what the product is and where it's used (devices), the main job of the most-used screen, audience and voice (formality, language, local formats), 2–3 mood words **and what it must never look like**, references each with **take / avoid** ("take the calm spacing; avoid the grey-on-grey text"), and constraints (platforms, accessibility needs, light/dark, icon set, motion).
2. **Colors** — at least `primary`. With several palettes, semantic roles: `primary`, `secondary`, `tertiary`, `neutral`.
3. **Typography** — 9 to 15 levels is common; categories `display`, `headline`, `body`, `label`, `caption` with sizes `sm`/`md`/`lg`.
4. **Layout** (or "Layout & Spacing") — grid, margins, safe areas; `spacing` accepts Dimension or number (columns, ratios).
5. **Elevation & Depth** (or "Elevation") — shadows (spread, blur, color) or, in flat design, how hierarchy is conveyed (borders, contrast).
6. **Shapes** — radii; `rounded` token.
7. **Components** — buttons, chips, lists, tooltips, checkboxes, radios, inputs, and domain components. State variants as sibling keys: `button-primary`, `button-primary-hover`, `button-primary-active`.
8. **Do's and Don'ts** — practical guardrails.

Component properties: `backgroundColor`, `textColor`, `typography`, `rounded`, `padding`, `size`, `height`, `width`.

```yaml
components:
  button-primary:
    backgroundColor: "{colors.primary-60}"
    textColor: "{colors.primary-20}"
    rounded: "{rounded.md}"
    padding: 12px
  button-primary-hover:
    backgroundColor: "{colors.primary-70}"
```

```markdown
## Do's and Don'ts

- Do use the primary color only for the single most important action per screen
- Don't mix rounded and sharp corners in the same view
- Do maintain WCAG AA contrast (4.5:1 for normal text)
- Don't use more than two font weights on a single screen
```

## Recommended names (non-normative)

- **Colors:** `primary`, `secondary`, `tertiary`, `neutral`, `surface`, `on-surface`, `error`
- **Typography:** `headline-display`, `headline-lg`, `headline-md`, `body-lg`, `body-md`, `body-sm`, `label-lg`, `label-md`, `label-sm`
- **Rounded:** `none`, `sm`, `md`, `lg`, `xl`, `full`
- **Role colors** (when the system needs more than the basics; components ask for roles, never raw palette steps like `gray-500`): `text`, `text-muted`, `text-placeholder` (lighter than muted, so it never reads as entered text), `text-disabled`, `on-dark`, `surface`, `fill-1`/`fill-2` (two grey grounds are enough), `border`, `border-hover`, `divider` (lighter than `border`), `tint-hover`/`tint-selected`/`tint-pressed` (translucent overlays for borderless pieces, so they work on any ground), `primary`/`primary-hover`/`primary-pressed`, `focus`, `overlay`, and per status `success`/`warning`/`error` with `-bg` (tinted area), `-text` (readable on `-bg`), `-strong`, `-action`
- **Elevation:** two strengths (`shadow`, `shadow-strong`), only on floating pieces (menus, popovers, dialogs, toasts)
- **Motion** (in the body, no token group): durations such as quick ~150 ms, fast ~250 ms, medium ~350 ms, and one default easing

## Unknown content

| Scenario | Behavior | Example |
|---|---|---|
| Unknown section | Preserve; no error | `## Iconography` |
| Unknown color token | Accept if value is valid | `surface-container-high: '#ede7dd'` |
| Unknown typography token | Accept | `telemetry-data` |
| Unknown spacing value | Accept; store as string if not a Dimension | `grid-columns: '5'` |
| Unknown component property | Accept with warning | `borderColor` |
| Duplicate section | Error; reject the file | two `## Colors` |

## Project sections: Decisions log, Open questions

Two optional sections that keep decisions alive across sessions. As unknown sections they are preserved by every tool; put them after Do's and Don'ts.

```markdown
## Decisions log

- 2026-11-15 — No dark mode for now — members book in daylight; it halves the states to build.

## Open questions

- Is the accent plum or teal? The brand book says plum, tokens.css ships teal. (conflict)
- Body font: system sans (assumed)
```

- Anything inferred and not confirmed by the user is marked **(assumed)**, in the section where it applies and listed under Open questions; never written as fact.
- After a frontend task, decisions are appended to the log (`apply-design-md.md`, step 8). An answered question moves into its section.
- A conflict between this file and the shipped tokens goes under Open questions until the user decides.

## Authoring workflow

1. Write to `docs/design/DESIGN.md` (or update the existing file; see Required location).
2. Gather material: brand book, style guide, assets, the existing theme in code, README and docs. Extract palettes, fonts, spacing rhythm, component patterns. Existing tokens are the starting point: extend them; renaming or moving them needs the user's OK.
   **Brief interview** (human reachable, creating from scratch): ask only what the files don't answer, and confirm what they do answer in one line ("Your README says pt-BR only and members over 60, so 18px body and 48px taps"). Order: product and devices → audience and voice → mood and "never like" → brand assets → 2–5 references with take/avoid (open each one you can and say what you see first; none given → offer three that fit the mood) → constraints. Each question offers 3–5 options plus "something else", within the SKILL.md question budget per message. Stop when the first screen could be designed without guessing. "Skip" / "just do it" → write a minimal file from what you read, every gap **(assumed)** and listed under Open questions, and say which assumptions matter most. No invented brand: colours, fonts, and mood come from the user or the repo, or are marked (assumed).
3. Define the front-matter tokens **first**, with a consistent naming convention.
4. Write the sections in the prescribed order, explaining the rationale for each token.
5. In `components`, **reference** tokens instead of duplicating values.
6. Omit rather than force; optionally document in `omitted`.
7. Validate.

## Validation

- Valid YAML; correct `---` delimiters.
- Front matter present with `colors.primary` defined.
- No duplicate sections; sections in the prescribed order.
- Every `{...}` reference resolves to an existing value (primitive, except composites in `components`).
- Dimensions with a valid unit.
- Declared text/background pairs meet WCAG AA: compute each ratio with a script (WCAG relative luminance in sRGB), never estimate by eye.

Report each problem with its exact line/path.

## Drift audit

For "audit the design system", "make these screens consistent", or before a large token change. Report only: change no file until the user picks the fixes (backups don't make editing acceptable).

1. **Loose values:** hex/`rgb(`/`px` literals and arbitrary Tailwind values (`[#…]`, `p-[22px]`) in screens instead of tokens.
2. **Near-duplicates:** values a hair from an existing token (`#f3f3f6` vs `#f2f2f5`, 22px padding on a 16/24 scale): almost always the token, typed by hand.
3. **Missing roles:** values the screens need that have no token (pressed, focus, status `-bg`).
4. **Missing states:** interactive components without a full states matrix (focus and disabled are the usual gaps).
5. **Drift:** the same piece with different padding, radius, weight, or icon set on different screens; mixed icon sets.
6. **One-offs:** pieces used once that could be a variant of an existing one.
7. **Contrast:** text on tinted and grey grounds, computed, not estimated.
8. **Differences from defaults** (two primaries on a screen, shadows on non-floating surfaces, filled hover on bordered pieces): when DESIGN.md chose them on purpose, list them as differences, not defects.

Rank findings High (breaks use or accessibility) / Medium (visible inconsistency) / Low (hygiene: unused tokens, a working one-off), each with location, why it matters, and the proposed fix, then questions for the user and "Nothing has been changed."

## Export

Tokens convert to/from `tokens.json` (W3C Design Tokens format) and Tailwind theme. For Figma variables, export `tokens.json` and say it must be imported with a tokens plugin; this skill has no direct Figma mechanism. When importing, write to the existing DESIGN.md, or `docs/design/DESIGN.md` if none exists.

Tailwind mapping: `colors` → `colors`; `typography` → `fontFamily`/`fontSize`/`fontWeight` (with `lineHeight` and `letterSpacing` in the `fontSize` tuple); `rounded` → `borderRadius`; `spacing` → `spacing`. In Tailwind v4, generate variables in `@theme` (`--color-primary`, `--radius-md`, `--spacing-md`…). In shadcn projects, also map to the theme CSS variables (`--primary`, `--background`, `--radius`…).
