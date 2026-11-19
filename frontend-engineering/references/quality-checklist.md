# Quality checklist

Run before declaring any visual work done. If several answers are "no", iterate before finishing.

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
- [ ] Checked at ~375px, ~768px, ~1024px, and ~1280–1440px.
- [ ] Dialogs, sheets, and sticky elements fit the viewport.
- [ ] Touch targets ≥ 24px (44px preferred for important ones).

## Accessibility

- [ ] Every flow keyboard-operable; visible focus and logical order.
- [ ] Labels and accessible names on all controls.
- [ ] WCAG AA contrast.
- [ ] State does not depend on color alone.
- [ ] `prefers-reduced-motion` respected in custom animations.

## Code

- [ ] `"use client"` only where needed.
- [ ] No dead code, unused imports, placeholders, or `console.log`.
- [ ] No unjustified new dependencies.
- [ ] Lint, typecheck, tests, and build run — results reported with the exact command. Anything not run is declared.
