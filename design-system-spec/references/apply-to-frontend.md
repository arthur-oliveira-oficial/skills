# Applying DESIGN.md to Frontend Code

Treat `docs/design/DESIGN.md`, relative to the project root, as the canonical visual specification for every frontend change. Apply its machine-readable tokens and human-readable guidance without inventing conflicting styles.

## Required Workflow

1. Locate the project root and check `docs/design/DESIGN.md` before editing frontend code.
2. Read the entire file. Parse the YAML front matter and the Markdown guidance, including custom sections.
3. Inspect the frontend stack, existing theme or token configuration, shared components, and styling conventions relevant to the requested change.
4. Build a task-local mapping from the applicable DESIGN.md rules to the implementation: colors, typography, spacing, layout, elevation, shapes, components, interaction states, responsive behavior, and do's and don'ts.
5. Implement the requested frontend change through the project's existing design-system layer whenever possible. Prefer shared tokens, theme variables, utilities, and reusable components over duplicated literal values.
6. Verify the changed interface against `docs/design/DESIGN.md` after implementation. Run focused tests, lint, type checks, builds, or visual checks supported by the repository.
7. Report which design rules were applied, any checks run, and any unresolved mismatch or ambiguity.

If `docs/design/DESIGN.md` changes during the task, read it again before completing the work.

## Missing or Invalid Specification

- If `docs/design/DESIGN.md` is missing, stop before making visual decisions and report that the canonical design specification is unavailable. Do not infer a brand system from unrelated code or create the file unless the user requests it.
- If the YAML, token references, or duplicated sections are invalid, identify the exact problem before implementation. Apply unambiguous valid rules only when doing so cannot produce an inconsistent result.
- If two rules conflict, treat front-matter tokens as normative. Use prose for application context. Surface any remaining contradiction instead of silently choosing.
- If a requested change intentionally conflicts with DESIGN.md, explain the conflict and require an explicit user decision before introducing the exception.

## Implementation Rules

- Preserve the project's framework and styling approach; translate DESIGN.md into CSS variables, Tailwind theme values, component-theme objects, or equivalent native constructs.
- Reuse existing semantic tokens when they correctly represent the DESIGN.md value. Update the central token layer when a shared mapping is missing and the requested scope justifies it.
- Cover all relevant component states, including default, hover, focus, active, disabled, loading, error, and selected states when specified or present.
- Apply typography as a complete style: family, size, weight, line height, letter spacing, and font features where defined.
- Maintain responsive and accessibility behavior. Check contrast, visible focus, text scaling, target sizing, semantics, and reduced-motion behavior when relevant.
- Keep changes scoped. Do not restyle unrelated screens merely because older code diverges; report pre-existing divergence separately.
- Do not replace semantic design tokens with hard-coded approximations.
- Do not modify `docs/design/DESIGN.md` to make an implementation pass unless the user explicitly asks to change the design system.

## Verification Checklist

Confirm before completion:

- `docs/design/DESIGN.md` was read before editing.
- Every visual value introduced by the change maps to a token or explicit design rule.
- Shared components and theme infrastructure were reused where appropriate.
- Required interaction and responsive states match the specification.
- Relevant accessibility checks were considered.
- Focused repository checks completed successfully, or skipped and failed checks are reported.
- Remaining design ambiguities and pre-existing mismatches are visible in the final report.
