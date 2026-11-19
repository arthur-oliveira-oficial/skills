# Quality checklist

Run before declaring any implementation work done. If several answers are "no", iterate before finishing. Mark items that cannot apply (e.g. hydration or 1000+ items on a static page) as N/A instead of skipping them silently. For audits, use the sections as a scan list, not as a gate.

## Design

- [ ] Does it look designed for this product rather than generated for any product?
- [ ] Is the primary action obvious without being loud?
- [ ] Is the hierarchy still readable in grayscale?
- [ ] Are there unnecessary gradients, pills, cards, shadows, or icons? Can any decorative element be removed without losing meaning?
- [ ] Are components reused because they fit, not because they exist?
- [ ] Does the result feel calm, intentional, and production-ready?
- [ ] If DESIGN.md exists: does every visual value map to a token/rule?

## UX and states

- [ ] Loading, empty, error, success, disabled, and partial states represented?
- [ ] Errors say what happened and how to fix it; user input preserved?
- [ ] Destructive actions confirmed or undoable?
- [ ] Every screen has a next step or recovery path?

## Worst-case data

- [ ] Very long text, names without spaces, more verbose languages (German).
- [ ] Lists with 0, 1, and 1000+ items.
- [ ] Huge or negative numbers, currencies and dates in another locale.
- [ ] Missing images or odd aspect ratios.
- [ ] Slow network and network failure.

## Responsiveness

- [ ] No horizontal scrolling at 320px.
- [ ] Checked at ~375px, phone landscape, ~768px (tablet portrait), ~1024px (tablet landscape), and ~1280–1440px.
- [ ] Each size class uses the right navigation and layout pattern (apps: bottom bar / rail / sidebar, sequential / two-pane; content sites: a top nav that wraps or collapses).
- [ ] Rotation and live resize preserve state, scroll, and form input.
- [ ] No hover-only actions; works with `pointer: coarse` and with mouse/keyboard on tablet.
- [ ] Content width capped on large screens; no stretched lines or cards.
- [ ] 200% zoom and reflow at 320 CSS px without loss of content.
- [ ] Dialogs, sheets, and sticky elements fit the viewport.
- [ ] Touch targets ≥ 24px (44px preferred for important ones).

## Accessibility

- [ ] Every flow keyboard-operable; visible focus and logical order.
- [ ] Visible labels on all inputs (placeholder is not a label — axe does not catch this); accessible names on all controls.
- [ ] `lang` and `<meta charset>` declared; actions are `<button>`, not clickable `<div>`s.
- [ ] WCAG AA contrast.
- [ ] State does not depend on color alone.
- [ ] `prefers-reduced-motion` respected in custom animations.

## Browser evidence

- [ ] Standard verification pass from `browser-verification.md` run with `agent-browser` (or each skipped check declared **not verified** with the reason).
- [ ] Screenshots saved per size class with absolute paths, and confirmed to exist; video for multi-step flows (or "not recorded" with the reason).
- [ ] Browser session closed and any server you started stopped.
- [ ] `errors` empty; no hydration or failed-request warnings in `console`.
- [ ] `a11y` shows no new serious/critical violations.
- [ ] `vitals` CLS ≤ 0.1 and not worse than baseline on changed routes.

## Code

- [ ] `"use client"` only where needed (Next.js).
- [ ] No dead code, unused imports, placeholders, or `console.log`.
- [ ] No unjustified new dependencies.
- [ ] Lint, typecheck, tests, and build run — results reported with the exact command. Anything not run is declared.
