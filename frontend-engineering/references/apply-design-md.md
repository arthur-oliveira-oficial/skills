# Applying DESIGN.md to code

Treat `docs/design/DESIGN.md` as the canonical visual specification for every frontend change. Apply its tokens and guidance without inventing conflicting styles.

## Required workflow

1. Locate the project root and check `docs/design/DESIGN.md` **before** editing.
2. Read the whole file: front matter and Markdown, including custom sections.
3. Inspect the stack, theme/token configuration, shared components, and relevant styling conventions.
4. Build a task-local mapping: colors, typography, spacing, layout, elevation, shapes, components, states, responsive behavior, and applicable do's/don'ts.
5. Implement through the existing design-system layer: tokens, theme variables, utilities, and reusable components instead of duplicated literals.
6. Verify the changed interface against DESIGN.md. Run the available tests, lint, types, build, or visual checks.
7. Report rules applied, checks run, and any mismatch or ambiguity.

If DESIGN.md changes during the task, read it again before finishing.

## Missing or invalid specification

- **Missing:** stop before visual decisions and report that the canonical specification does not exist. Do not infer the brand from unrelated code or create the file without a request. Offer to create it from the current theme.
- **Invalid** (YAML, references, duplicate sections): identify the exact problem before implementing. Apply only valid, unambiguous rules when doing so cannot create inconsistency.
- **Internal conflict:** front-matter tokens are normative; prose gives context. Any remaining contradiction → surface it, do not choose silently.
- **Request conflicts with DESIGN.md:** explain the conflict and require an explicit user decision before introducing an exception.

## Implementation rules

- Preserve the framework and styling approach; translate DESIGN.md into CSS variables, Tailwind theme, theme objects, or native equivalents.
- Reuse existing semantic tokens when they represent the correct value. Update the central token layer when a shared mapping is missing and scope justifies it.
- Cover all relevant states: default, hover, focus, active, disabled, loading, error, selected.
- Apply typography completely: family, size, weight, line-height, letter-spacing, and features.
- Maintain responsiveness and accessibility: contrast, visible focus, text scaling, target size, semantics, reduced motion.
- Keep scope contained: do not restyle unrelated screens just because they diverge; report pre-existing divergence separately.
- Do not replace semantic tokens with hard-coded approximations.
- Do not edit DESIGN.md to make the implementation "pass" unless the user asks to change the design system.

## Verification checklist

- [ ] DESIGN.md read before editing.
- [ ] Every visual value introduced maps to a token or explicit rule.
- [ ] Components and theme infrastructure reused.
- [ ] Interaction states and responsiveness match the specification.
- [ ] Accessibility considered.
- [ ] Repository checks run; skipped/failed ones reported.
- [ ] Ambiguities and pre-existing divergence visible in the final report.
