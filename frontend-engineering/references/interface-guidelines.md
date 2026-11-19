# Interface guidelines

Concrete, verifiable rules for interaction, forms, content, and accessibility. Adapted from the Web Interface Guidelines (Vercel), WCAG 2.2, and the WAI-ARIA APG.

## Contents
- Interaction and focus
- Forms
- Feedback and states
- Navigation and URL
- Content and accessibility
- Mobile and touch

## Interaction and focus

- Every flow is keyboard-operable, following WAI-ARIA APG patterns.
- Visible focus with `:focus-visible`; `:focus-within` for groups. Never remove the outline without an equally visible replacement.
- Sticky elements and overlays do not cover the focused element (`scroll-margin`/`scroll-padding`).
- Dialogs trap and return focus correctly (use accessible primitives).
- Hit area matches the visual; every part that looks interactive is interactive.
- Every gesture (drag, swipe, pinch) has a click/tap and keyboard alternative.
- Disable text selection during drag.
- Tooltips: delay the first in a group, show subsequent ones immediately. Prefer inline help; a tooltip is a last resort and never holds essential information.
- `overscroll-behavior: contain` on modals and drawers.
- Autofocus the primary input on desktop only; avoid it on mobile.
- Keyboard shortcuts internationalized (non-QWERTY layouts) with platform symbols.

## Forms

- Every control has an associated `<label>`; clicking the label focuses the control. Checkbox/radio and label share one hit target.
- Visible labels; a placeholder is not a label. Placeholders are examples and end with `…`.
- Correct `type`, `inputmode`, `autocomplete`, and `name`. Disable spellcheck for email, codes, and usernames.
- Accept any typing and validate with feedback; do not block keystrokes. Trim surrounding whitespace.
- Do not disable submit before submission. On submit: disable, show progress while keeping the label, and send an idempotency key.
- Errors next to the field, associated via `aria-describedby`; on submit, focus the first error. Preserve what the user typed.
- Enter submits when there is a single input; in a textarea, Cmd/Ctrl+Enter submits and Enter inserts a newline.
- Warn before leaving with unsaved changes.
- Support password managers and pasting OTP codes; never block paste.
- Differentiate destructive actions and require confirmation or offer undo within a safe window.
- Set explicit `background-color` and `color` on `<select>` (Windows dark mode).
- Long forms: group with `fieldset`/`legend`; single column by default.

## Feedback and states

For every screen, make clear: what is clickable, editable, selected, loading, failed, disabled (and why), and what the next step is.

- Loading buttons show an indicator while keeping the original label.
- Toasts and inline validation in `aria-live="polite"` regions.
- Every screen has a next step or recovery path.
- Design empty, sparse, dense, and error states.
- Skeletons identical to the final layout.
- Status pairs color with text/icon.

## Navigation and URL

- Navigation uses `<a>`/`<Link>` to keep browser behaviors (open in new tab, copy link).
- Relevant state in the URL (filters, tabs, pagination, expanded panels) for refresh, sharing, and Back/Forward.
- Restore scroll position on Back.
- `<title>` reflects the current context.
- Anchored headings use `scroll-margin-top`.

## Content and accessibility

- Every document declares `<html lang="…">` and `<meta charset="utf-8">` (missing charset shows as mojibake when the server omits it).
- Native HTML before ARIA: `<button>` for actions, `<a>` for navigation, `<form>` for submission — never a clickable `<div>`. Correct heading hierarchy (one `<h1>`, landmarks like `<main>`); a "Skip to content" link.
- Icon-only buttons with a descriptive `aria-label`; decorative icons with `aria-hidden`. Check the accessibility tree.
- Contrast: WCAG 2.2 AA (4.5:1 normal text, 3:1 large text and UI components). APCA is useful as a complementary check.
- Text scales to 200% without breaking the layout.
- Media: captions, transcripts, descriptions of essential visuals, keyboard-operable controls.
- Non-breaking spaces to keep units, shortcuts, and names together (`10&nbsp;MB`).
- `translate="no"` on brand names, code, and identifiers.
- Detect language via `Accept-Language`/`navigator.languages`, not IP.
- Tabular numbers for comparison; typographic quotes; avoid widows and orphans in headings.

## Mobile and touch

- Targets: minimum 24×24 CSS px (WCAG 2.5.8); prefer 44×44 px on touch.
- `touch-action: manipulation` on controls (no double-tap delay).
- `-webkit-tap-highlight-color` consistent with the design.
- Inputs with font size ≥ 16px.
- Watch for sticky hover on touch, the `100vh` bug (use `dvh`/`svh`), and safe areas.
