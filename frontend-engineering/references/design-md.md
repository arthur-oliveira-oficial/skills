# DESIGN.md specification

`DESIGN.md` is a self-contained, plain-text representation of a design system. It defines the brand/product visual identity so stylistic choices are followed across sessions, agents, and tools. It is the living source of truth, readable by humans and AI.

## Contents
- Required location
- Structure (front matter + body)
- Token schema and types
- Body sections
- Recommended names
- Unknown content
- Authoring workflow
- Validation
- Export

## Required location

Always `docs/design/DESIGN.md`, relative to the project root. Create `docs/design/` if it does not exist. Do not create `DESIGN.md` at the root or in another directory. When reading, refining, validating, or exporting, use this file as the canonical source unless the user points to another existing file.

## Structure

1. **YAML front matter (optional):** machine-readable tokens — **these are the normative values**.
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

1. **Overview** (or "Brand & Style") — personality, audience, emotional response (playful vs. professional, dense vs. airy). Basis for decisions when no specific rule exists.
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

## Unknown content

| Scenario | Behavior | Example |
|---|---|---|
| Unknown section | Preserve; no error | `## Iconography` |
| Unknown color token | Accept if value is valid | `surface-container-high: '#ede7dd'` |
| Unknown typography token | Accept | `telemetry-data` |
| Unknown spacing value | Accept; store as string if not a Dimension | `grid-columns: '5'` |
| Unknown component property | Accept with warning | `borderColor` |
| Duplicate section | Error; reject the file | two `## Colors` |

## Authoring workflow

1. Write to `docs/design/DESIGN.md`.
2. Gather material: brand book, style guide, assets, the existing theme in code. Extract palettes, fonts, spacing rhythm, component patterns.
3. Define the front-matter tokens **first**, with a consistent naming convention.
4. Write the sections in the prescribed order, explaining the rationale for each token.
5. In `components`, **reference** tokens instead of duplicating values.
6. Omit rather than force; optionally document in `omitted`.
7. Validate.

## Validation

- Valid YAML; correct `---` delimiters.
- `colors.primary` defined.
- No duplicate sections; sections in the prescribed order.
- Every `{...}` reference resolves to an existing value (primitive, except composites in `components`).
- Dimensions with a valid unit.
- Declared text/background pairs meet WCAG AA (compute contrast in sRGB).

Report each problem with its exact line/path.

## Export

Tokens convert to/from `tokens.json` (W3C Design Tokens format), Figma variables, and Tailwind theme. When importing, write to `docs/design/DESIGN.md`.

Tailwind mapping: `colors` → `colors`; `typography` → `fontFamily`/`fontSize`/`fontWeight` (with `lineHeight` and `letterSpacing` in the `fontSize` tuple); `rounded` → `borderRadius`; `spacing` → `spacing`. In Tailwind v4, generate variables in `@theme` (`--color-primary`, `--radius-md`, `--spacing-md`…). In shadcn projects, also map to the theme CSS variables (`--primary`, `--background`, `--radius`…).
