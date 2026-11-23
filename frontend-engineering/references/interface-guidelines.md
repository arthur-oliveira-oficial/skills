# Interface guidelines

Concrete, verifiable rules for interaction, forms, content, and accessibility. Adapted from the Web Interface Guidelines (Vercel), WCAG 2.2, and the WAI-ARIA APG.

## Contents
- Interaction and focus
- Forms
- Feedback and states
- Navigation and URL
- Content and accessibility
- Mobile and touch
- AI interfaces

## Interaction and focus

- Every flow is keyboard-operable, following WAI-ARIA APG patterns.
- Visible focus with `:focus-visible`; `:focus-within` for groups. Never remove the outline without an equally visible replacement.
- Sticky elements and overlays do not cover the focused element (`scroll-margin`/`scroll-padding`).
- Dialogs trap and return focus correctly (use accessible primitives).
- Hit area matches the visual; every part that looks interactive is interactive.
- For author-defined drag actions such as reordering a queue, offer a click or tap alternative such as **Move up**. Test it with one pointer and then exercise keyboard operation separately. Document any essential drag interaction. [W3C dragging movements](https://www.w3.org/WAI/WCAG22/Understanding/dragging-movements.html)
- For custom swipe and pinch shortcuts, keep the same actions reachable through controls and the keyboard.
- Disable text selection during drag.
- Tooltips: delay the first in a group, show subsequent ones immediately. Prefer inline help; a tooltip is a last resort and never holds essential information.
- `overscroll-behavior: contain` on modals and drawers.
- Autofocus the primary input on desktop only; avoid it on mobile.
- Keyboard shortcuts internationalized (non-QWERTY layouts) with platform symbols.
- Hover is quieter than selected: when they look alike, hovering reads as a second selection. Bordered pieces darken only the border on hover; borderless pieces get a softer tint than selected (defaults; DESIGN.md or the project's convention wins).
- Pressed responds instantly (no transition); hover-in fast (~150 ms), hover-out a little slower (~250 ms).
- The focus ring follows the piece's corner radius.
- The active item stands out from its container: a selected tab or segment on a grey track needs a clearly different fill or a border.
- Actions inside rows and tables are real buttons (small secondary ones), not bare text.

## Forms

- Every control has an associated `<label>`; clicking the label focuses the control. Checkbox/radio and label share one hit target.
- Visible labels; a placeholder is not a label. Placeholders are examples and end with `…`.
- Correct `type`, `inputmode`, `autocomplete`, and `name`. Disable spellcheck for email, codes, and usernames.
- Accept any typing and validate with feedback; do not block keystrokes. Trim surrounding whitespace.
- Do not disable submit before submission. On submit: disable, show progress while keeping the label, and send an idempotency key when the API supports one (never invent a header the backend does not read).
- No backend or endpoint yet: loading and error states, no fake success screen; the 2xx branch follows a redirect if present, else one neutral status line, listed as NOT VERIFIED (see quality-checklist.md).
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
- Full state catalogue (concurrency, expired, slow, partial, roles): [screen-states.md](screen-states.md).
- Nothing changes size between states: a loading button keeps the label in the layout (`visibility: hidden` or transparent) with the spinner centred on top; a label that swaps ("Copy" → "Copied", "Follow" → "Following") is sized to its longest label; selecting never changes font weight (use a background, or a border that is always present and transparent at rest); content swaps (tabs, steps, a success message replacing a form) reserve their height.
- A whole-app problem goes in a top banner; a problem with one item goes inline on that item.
- Toasts are the system's one toast component, in its usual position, never a one-off.
- Failure is worded as failure ("Couldn't save"), never as a pause ("Stopped"); a deliberate pause looks neutral and offers Resume.

## Navigation and URL

For links to separate pages, use navigation links and identify the current page. For panels within a view, use the tabs pattern. In a horizontal tab list, Tab enters on the selected tab, Left/Right moves focus and Tab leaves the list. Activate on focus when panels appear immediately. When activation fetches content with noticeable latency, let Enter or Space activate the focused tab. Test arrowing past two tabs on a slow connection. [WAI-ARIA tabs pattern](https://www.w3.org/WAI/ARIA/apg/patterns/tabs/)

- Navigation uses `<a>`/`<Link>` to keep browser behaviors (open in new tab, copy link).
- Relevant state in the URL (filters, tabs, pagination, expanded panels) for refresh, sharing, and Back/Forward.
- Restore scroll position on Back.
- `<title>` reflects the current context.
- Anchored headings use `scroll-margin-top`.

## Content and accessibility

- Every document declares `<html lang="…">` and `<meta charset="utf-8">` (missing charset shows as mojibake when the server omits it).
- Progressive enhancement: core content and links work without JavaScript; JS-driven controls (toggles, tabs) have a sensible no-JS default (e.g. the monthly prices shown).
- Native HTML before ARIA: `<button>` for actions, `<a>` for navigation, `<form>` for submission — never a clickable `<div>`. Correct heading hierarchy (one `<h1>`, landmarks like `<main>`); a "Skip to content" link.
- Icon-only buttons with a descriptive `aria-label`; decorative icons with `aria-hidden`. Check the accessibility tree.
- Contrast: WCAG 2.2 AA (4.5:1 normal text, 3:1 large text and UI components). APCA is useful as a complementary check.
- Text scales to 200% without breaking the layout.
- Media: captions, transcripts, descriptions of essential visuals, keyboard-operable controls.
- Non-breaking spaces to keep units, shortcuts, and names together (`10&nbsp;MB`).
- `translate="no"` on brand names, code, and identifiers.
- Detect language via `Accept-Language`/`navigator.languages`, not IP.
- Tabular numbers for comparison; typographic quotes; avoid widows and orphans in headings (`text-wrap: balance` on headings, `pretty` on short paragraphs).
- Headings fit in at most 3 lines at phone width (smaller size at narrow widths); list and table row titles stay on one line with an ellipsis and the full text available (`title` or the detail view), details on a second line.

## Mobile and touch

- Measure the clickable area, including its associated label when applicable. WCAG 2.2 AA 2.5.8 uses 24 × 24 CSS px. For a smaller target, center a 24 CSS px diameter circle on its bounding box. The spacing exception applies if the circle clears adjacent targets and the corresponding circles around other small targets. Other exceptions cover an equivalent control on the same page, inline text, unmodified browser controls and essential presentation. Record which exception applies before grading the finding. [W3C target size](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html)
- `touch-action: manipulation` on controls (no double-tap delay).
- `-webkit-tap-highlight-color` consistent with the design.
- Inputs with font size ≥ 16px.
- Watch for sticky hover on touch, the `100vh` bug (use `dvh`/`svh`), and safe areas.

## AI interfaces

Patterns shipped by current AI products (ChatGPT, Claude, Gemini, Perplexity, ClickUp Brain, Manus) for chat, assistants, and agents:

- **Empty state:** a short greeting, the prompt box, and 3–4 suggestion chips that fill the box when clicked (they do not send).
- **Prompt box:** pill or rounded field that grows with the text; attach, voice, and model picker beside it; Enter sends, Shift+Enter adds a line; the send button is disabled while empty and turns into **Stop** while a response streams.
- **Streaming:** text appears as it arrives in an `aria-live="polite"` region (announce completion, not every token); auto-scroll only while the user is at the bottom, with a "jump to latest" button otherwise.
- **Sources:** citations next to the claim they support, opening the source; never invented links.
- **Agent progress:** a step list (done ✓, current, next ○, "3 of 5") beside what the agent is working on; failures say which step failed and offer retry.
- **Actions with effects** (sending, deleting, paying, changing data): show the plan in plain language and ask for confirmation first; offer undo afterwards.
- **In-product assistant:** a side panel docked to the current screen, keeping its context, rather than a separate page.
- **Errors and limits:** "Couldn't answer — try again" with the prompt kept in the box; rate limits say when the user can try again.

