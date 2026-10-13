---
name: design-system-spec
description: Author, validate, export, and apply DESIGN.md files — a self-contained, plain-text representation of a design system. Use to create or refine a design system document, convert tokens to/from tokens.json, Figma variables, or Tailwind theme configs, or produce a DESIGN.md. Also use to enforce an existing docs/design/DESIGN.md when creating, editing, reviewing, or refactoring frontend code (layout, styling, themes, tokens, components, responsive behavior, visual states).
license: MIT
---

# Design System Spec (DESIGN.md Authoring and Application)

DESIGN.md is a self-contained, plain-text representation of a design system. It defines the visual identity of a brand and product so stylistic choices can be followed across design sessions and between different AI agents and tools. It is a living source of truth that both humans and AI can understand and refine.

A DESIGN.md file has two parts:
1. **Optional YAML front matter** containing machine-readable design tokens.
2. **A markdown body** with human-readable design rationale and guidance.

Prose may use descriptive color names (e.g., "Midnight Forest Green") that correspond to systematic token names (e.g., `primary`). The **tokens are the normative values**; the prose provides context for how to apply them.

## Required File Location

Always create a new design system file at `docs/design/DESIGN.md`, relative to the project root. Create the `docs/design/` directories when they do not exist. When refining, validating, reading, or exporting an existing design system, use `docs/design/DESIGN.md` as the canonical source unless the user explicitly identifies a different existing file. Do not create a new `DESIGN.md` at the project root or in another directory.

## When to Apply

Use this skill when:
- The user asks to create, read, refine, or validate a `DESIGN.md` file.
- The user wants a design system captured in a portable, agent-readable format.
- The user wants to convert design tokens between `DESIGN.md`, `tokens.json`, Figma variables, and Tailwind theme configs.
- The user is establishing a shared visual identity for a brand or product.

## Applying DESIGN.md to Frontend Code

When the task changes frontend code in a project that has `docs/design/DESIGN.md`, treat that file as the canonical visual specification. Read `references/apply-to-frontend.md` for the required workflow, the rules for missing or conflicting specifications, implementation rules, and the verification checklist. Do not invent conflicting styles, and stop before visual decisions if the file is missing.

## Structure of a DESIGN.md

### Front Matter

Design tokens are embedded as YAML front matter at the beginning of the file. The block must begin with a line containing exactly `---` and end with a line containing exactly `---`.

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

### Token Schema

```yaml
version: <string>          # optional, current version: "alpha"
name: <string>
description: <string>      # optional
omitted: <string[]|OmittedSection[]> # optional
colors:
  <token-name>: <Color>
typography:
  <token-name>: <Typography>
rounded:
  <scale-level>: <Dimension>
spacing:
  <scale-level>: <Dimension | number>
components:
  <component-name>:
    <token-name>: <string|token reference>
```

The `<scale-level>` placeholder represents a named level in a sizing or spacing scale. Common level names include `xs`, `sm`, `md`, `lg`, `xl`, and `full`. Any descriptive string key is valid.

### Types

**Color**: Any valid CSS color string. Supported formats:
- Hex: `#RGB`, `#RGBA`, `#RRGGBB`, `#RRGGBBAA`
- Named colors: `red`, `cornflowerblue`, `transparent`
- Functional: `rgb()`, `rgba()`, `hsl()`, `hsla()`, `hwb()`
- Wide-gamut: `oklch()`, `oklab()`, `lch()`, `lab()`
- Mixing: `color-mix(in srgb, ...)`

All color values are internally converted to sRGB for WCAG contrast checking. The original format is preserved for display and export. Hex notation (`#RRGGBB`) remains the recommended default for simplicity and broad tooling support.

**Typography** properties:
- `fontFamily` (string)
- `fontSize` (Dimension)
- `fontWeight` (number) — numeric, e.g. `400`, `700`; may be a bare number or quoted string, both equivalent
- `lineHeight` (Dimension | number) — a Dimension (e.g., `24px`, `1.5rem`) or a unitless number (e.g., `1.6`) representing a multiplier of the element's `fontSize` (the recommended CSS practice)
- `letterSpacing` (Dimension)
- `fontFeature` (string) — configures `font-feature-settings`
- `fontVariation` (string) — configures `font-variation-settings`

**Dimension**: A string with a unit suffix. Valid units are: px, em, rem.

**Omitted**: An array of sections intentionally omitted from the design system, suppressing linter warnings for missing sections (e.g., colors, typography, spacing, rounded, components). Each entry can be:
- A string representing the section name (e.g., `spacing`)
- An object of the form `{ section: string, reason?: string }`:
  ```yaml
  omitted:
    - spacing
    - section: rounded
      reason: "No rounded corners defined in brand book"
  ```

**Token References**: A token reference must be wrapped in curly braces and contain an object path to another value in the YAML tree (e.g., `{colors.primary-60}`). For most token groups, the reference must point to a primitive value (e.g., `colors.primary-60`), not a group (e.g., `colors`). Within the `components` section, references to composite values (e.g., `{typography.label-md}`) are permitted.

## Markdown Body Sections

Every DESIGN.md follows the same structure. Sections can be omitted if not relevant, but those present should appear in the sequence listed below. All sections use `<h2>` (`##`) headings. An optional `<h1>` heading may appear for document titling but is not parsed as a section.

### Section Order

1. **Overview** (also: "Brand & Style")
2. **Colors**
3. **Typography**
4. **Layout** (also: "Layout & Spacing")
5. **Elevation & Depth** (also: "Elevation")
6. **Shapes**
7. **Components**
8. **Do's and Don'ts**

### Overview
A holistic description of the product's look and feel. Defines brand personality, target audience, and the emotional response the UI should evoke (e.g., playful or professional, dense or spacious). Serves as foundational context for high-level stylistic decisions when a specific rule or token isn't defined.

### Colors
Defines the color palettes. At least the `primary` palette must be defined; additional palettes may be added. When there are multiple palettes, assign a semantic role — a common convention is `primary`, `secondary`, `tertiary`, `neutral`. Color tokens should be derived from the key palettes in the prose. The `colors` design token is a `map<string, Color>`.

```yaml
colors:
  primary: "#1A1C1E"
  secondary: "#6C7278"
  tertiary: "#B8422E"
  neutral: "#F7F5F2"
```

### Typography
Defines typography levels (most systems have 9–15). May prescribe a role per level. Common naming uses semantic categories such as `headline`, `display`, `body`, `label`, `caption`, each possibly divided into sizes like `small`, `medium`, `large`. The `typography` token is a `map<string, Typography>`.

```yaml
typography:
  h1:
    fontFamily: Public Sans
    fontSize: 48px
    fontWeight: 600
    lineHeight: 1.1
    letterSpacing: -0.02em
  body-md:
    fontFamily: Public Sans
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.6
  label-caps:
    fontFamily: Space Grotesk
    fontSize: 12px
    fontWeight: 500
    lineHeight: 1
    letterSpacing: 0.1em
```

### Layout (Layout & Spacing)
Describes the layout and spacing strategy. Many systems follow a grid-based layout; others use margins, safe areas, and dynamic padding. The `spacing` token is a `map<string, Dimension | number>` mapping spacing scale identifiers to dimension values or unitless numbers (e.g., column counts or ratios).

```yaml
spacing:
  base: 16px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 32px
  xl: 64px
  gutter: 24px
  margin: 32px
```

### Elevation & Depth
Describes how visual hierarchy is conveyed. If elevation is used, define required styling (spread, blur, color). For flat designs, explain alternative methods (e.g., borders, color contrast).

### Shapes
Describes how visual elements are shaped (e.g., corner radius). The `rounded` token is a `map<string, Dimension>`.

```yaml
rounded:
  sm: 4px
  md: 8px
  lg: 12px
  full: 9999px
```

### Components
Provides style guidance for component atoms. Common component types: Buttons, Chips, Lists, Tooltips, Checkboxes, Radio buttons, Input fields. Systems may add domain-specific components. The `components` token is a `map<string, map<string, string>>` mapping a component identifier to a group of sub-token names and values. Values may be literal or references to previously defined tokens.

**Variants**: A component may have variants for UI states such as active, hover, pressed, etc., defined under related keys (e.g., `button-primary`, `button-primary-hover`, `button-primary-active`). The agent considers all variants when making styling decisions.

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

**Component property tokens** (each is itself a design token):
- `backgroundColor`: Color
- `textColor`: Color
- `typography`: Typography
- `rounded`: Dimension
- `padding`: Dimension
- `size`: Dimension
- `height`: Dimension
- `width`: Dimension

### Do's and Don'ts
Provides practical guidelines and common pitfalls as guardrails when creating designs.

```markdown
## Do's and Don'ts

- Do use the primary color only for the single most important action per screen
- Don't mix rounded and sharp corners in the same view
- Do maintain WCAG AA contrast ratios (4.5:1 for normal text)
- Don't use more than two font weights on a single screen
```

## Recommended Token Names (Non-Normative)

Common names used across design systems. Not required, but guidance for consistency.

**Colors:** `primary`, `secondary`, `tertiary`, `neutral`, `surface`, `on-surface`, `error`

**Typography:** `headline-display`, `headline-lg`, `headline-md`, `body-lg`, `body-md`, `body-sm`, `label-lg`, `label-md`, `label-sm`

**Rounded:** `none`, `sm`, `md`, `lg`, `xl`, `full`

## Consumer Behavior for Unknown Content

When a DESIGN.md consumer encounters content not defined by this spec:

| Scenario | Behavior | Example |
|---|---|---|
| Unknown section heading | Preserve; do not error | `## Iconography` |
| Unknown color token name | Accept if value is valid | `surface-container-high: '#ede7dd'` |
| Unknown typography token name | Accept as valid typography | `telemetry-data` |
| Unknown spacing value | Accept; store as string if not a valid dimension | `grid-columns: '5'` |
| Unknown component property | Accept with warning | `borderColor` |
| Duplicate section heading | Error; reject the file | Two `## Colors` headings |

## Authoring Workflow

When creating a DESIGN.md for a brand:

1. **Set the canonical path** — create `docs/design/` when needed and write the design system to `docs/design/DESIGN.md`.
2. **Gather the source material** — brand book, style guide, or existing design assets. Extract the key palettes, typefaces, spacing rhythm, and component patterns.
3. **Define the front matter tokens first** — these are the normative values. Choose a consistent token naming convention (see Recommended Token Names).
4. **Write the prose sections in the prescribed order** — describe the rationale for each token in human terms, using descriptive color names that map to tokens.
5. **Reference tokens, don't duplicate them** — in the `components` section, use `{path.to.token}` references for shared values.
6. **Omit rather than force** — if a section isn't relevant, omit it and, if desired, document it in `omitted` to suppress linter warnings.
7. **Validate** — ensure the front matter is valid YAML, section headings are unique, at least `primary` is defined, and token references point to existing primitive values.

## Exporting

Tokens in `docs/design/DESIGN.md` convert cleanly to and from `tokens.json`, Figma variables, and Tailwind theme configs. When importing or converting a source into a new DESIGN.md, write the result to `docs/design/DESIGN.md`. When exporting to Tailwind, map color tokens to `colors`, typography to `fontSize`/`fontWeight`/`fontFamily`, `rounded` to `borderRadius`, and `spacing` to `spacing`.
