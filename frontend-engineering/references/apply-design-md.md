# Applying DESIGN.md to code

Treat the project's DESIGN.md as the canonical visual specification for every frontend change, below the user's explicit request (SKILL.md precedence). Apply its tokens and guidance without inventing conflicting styles.

## Required workflow

1. **Before** editing, locate it: `docs/design/DESIGN.md`, else `DESIGN.md` at the root or under `docs/`. One found elsewhere is canonical; do not create a duplicate.
2. Read the whole file: front matter and Markdown, including custom sections.
3. Inspect the stack, theme/token configuration, shared components, and relevant styling conventions.
4. Build a task-local mapping: colors, typography, spacing, layout, elevation, shapes, components, states, responsive behavior, and applicable do's/don'ts.
5. Implement through the existing design-system layer: tokens, theme variables, utilities, and reusable components instead of duplicated literals.
6. Verify the changed interface against DESIGN.md. Run the available tests, lint, types, build, or visual checks.
7. Report rules applied, checks run, and any mismatch or ambiguity.
8. If DESIGN.md has a **Decisions log** section, append each design decision this task made (`- YYYY-MM-DD — decision — why`); move any answered **Open questions** item into its section. Only these two sections, and only when they exist; the user's request to change the design system is still required for anything else.

If DESIGN.md changes during the task, read it again before finishing.

## Missing or invalid specification

- **Missing** (only when the user explicitly asked to apply DESIGN.md): stop before visual decisions and report that the canonical specification does not exist. Do not infer the brand from unrelated code or create the file without a request. Offer to create it from the current theme.
- **Invalid** (YAML, references, duplicate sections): identify the exact problem before implementing. Apply only valid, unambiguous rules when doing so cannot create inconsistency.
- **Internal conflict:** front-matter tokens are normative; prose gives context. Any remaining contradiction → surface it, do not choose silently.
- **Request conflicts with DESIGN.md:** the explicit request wins (SKILL.md precedence). Implement it as a scoped exception without editing DESIGN.md and report the conflict; ask first only when a human is available and it is unclear they knew the rule.

## Implementation rules

- Preserve the framework and styling approach; translate DESIGN.md into CSS variables, Tailwind theme, theme objects, or native equivalents.
- Reuse existing semantic tokens when they represent the correct value. Update the central token layer when a shared mapping is missing and scope justifies it.
- Cover all relevant states: default, hover, focus, active, disabled, loading, error, selected.
- Never override a token inside one page's or component's own CSS (a local `--color-primary`, an arbitrary `bg-[#…]` "because the brief says teal"). DESIGN.md and the token layer disagree → follow the token layer that ships, say so in one line, add it under DESIGN.md › Open questions when that section exists, and offer to fix whichever is wrong.
- A value the scale doesn't have (a 52px button where the token is 44) is a design-system change, not a local one: propose it as a token, then use it everywhere it applies.
- Apply typography completely: family, size, weight, line-height, letter-spacing, and features.
- Maintain responsiveness and accessibility: contrast, visible focus, text scaling, target size, semantics, reduced motion.
- Keep scope contained: do not restyle unrelated screens just because they diverge; report pre-existing divergence separately.
- Do not replace semantic tokens with hard-coded approximations.
- Do not edit DESIGN.md to make the implementation "pass" unless the user asks to change the design system.

## New or changed components

Applies with or without DESIGN.md. Adapted from diego3g/design-skills (MIT).

- **Reuse first:** an existing component plus a variant beats a one-off; a one-off is where drift starts.
- **States matrix** for every new or changed interactive component: rows are variants, columns are normal · hover · pressed · focus · disabled · loading · selected. Every cell is implemented or "n/a" with a reason. Make it reviewable as one story per variant with every state, or one fixture page; with neither, list the matrix in the report. Informational pieces (status pill, stat tile) have **data states** instead: success, warning, error, paused, empty.
- **Component index:** when the project keeps one (in DESIGN.md › Components or the docs), update its row in the same change: piece · where its states are shown · code location · status (`built`, `loading state missing`).

## Changing a shared piece

A shared piece is a token, a component, or a global style used in more than one place.

1. Before editing, list every place that uses it (`grep`/`rg` for the component import, class, or token name) and which screens those are.
2. Small change the user described exactly (one value, one size) → change it once where it is defined and name the affected screens in the report. No local overrides to "protect" other screens.
3. Anything larger, or a change the user did not ask for (a fix found during a critique or redesign) → human reachable: show the change and the affected list, and wait before propagating; otherwise put it under **Decisions needed** and keep the change local to the requested scope.
4. After propagating, verify the affected screens (at least a screenshot each at one width), not only the one you were working on.

## Verification checklist

- [ ] DESIGN.md read before editing.
- [ ] Every visual value introduced maps to a token or explicit rule (check: grep the diff for hex/`rgb(`/`px` literals and arbitrary Tailwind values like `[#…]`).
- [ ] Components and theme infrastructure reused.
- [ ] Interaction states and responsiveness match the specification; new or changed interactive components have a states matrix.
- [ ] Shared pieces changed: affected places listed and checked.
- [ ] Accessibility considered.
- [ ] Repository checks run; skipped/failed ones reported.
- [ ] Ambiguities and pre-existing divergence visible in the final report.
