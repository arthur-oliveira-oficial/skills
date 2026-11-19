# UX laws and heuristics

Treat each principle as a **design hypothesis**, never a blind rule. Every intervention needs an observed problem and a demonstrable benefit.

## Contents
- Audit/improvement workflow
- The seven cognitive laws
- Other useful laws
- Nielsen's 10 heuristics
- Forbidden dark patterns
- Conflict resolution
- Response format

## Workflow

1. **Inspect** stack, routes, components, tokens, validation, tests, and accessibility conventions.
2. **Scope the real journey:** user, goal, critical steps. Consider loading, error, empty, success, mobile, and desktop. Open scope → a few high-impact improvements, not a redesign.
3. **Evaluate the seven laws.** For each: observed symptom, component/flow, and intervention — or **N/A** with a reason. Do not invent friction.
4. **Prioritize:** task blockers > accessibility/errors > decision clarity > progression/orientation > visual differentiation.
5. **Implement** in the existing code (unless audit only). Fix the actual interaction, not just colors. Cohesive, reversible change.
6. **Validate** with lint, types, tests, build, and at least one mobile and one desktop width.
7. **Report** (format at the end).

## The seven cognitive laws

| Principle | Diagnostic question | Typical intervention |
|---|---|---|
| **Fitts** | Is the target small, crowded, or far from the action? | Enlarge the real interactive area; add spacing; bring the action closer to its context. |
| **Hick** | Too many choices without hierarchy? | Group by intent; emphasize the primary action; search/filter for large lists; reveal advanced options on demand. |
| **Zeigarnik** | Is there an interrupted task whose state matters? | Show real pending items; allow resuming; indicate the next step; distinguish "saved" from "submitted". |
| **Jakob** | Do controls or flows break established expectations? | Familiar patterns, semantic HTML, alignment with the current design system. |
| **Goal gradient** | Does the person know how much is left? | **Truthful** progress: current step, total, clear completion. |
| **Von Restorff** | Is the crucial action/information lost visually? | Priority contrast via text, shape, weight, and spacing; use emphasis sparingly. |
| **Miller** | Does the UI require memorizing data or reading dense blocks? | Semantic grouping (headings, `fieldset`/`legend`); redisplay data near the decision. |

Rules:
- Do not apply all seven on the same screen.
- Miller is not a hard 7-item limit; it is about meaningful grouping.
- No law requires a wizard: compare grouping on one page versus splitting into steps based on the real flow.
- Simplifying choices must not sacrifice essential secondary functions.
- Zeigarnik does not justify storing personal data in `localStorage`; use the project's approved persistence.

## Other useful laws

- **Doherty threshold:** responses under 400 ms keep flow; beyond that, give immediate feedback (optimistic, skeleton, progress).
- **Tesler (conservation of complexity):** complexity does not disappear; move it from the user to the system (good defaults, autocomplete, inference).
- **Proximity / common region (Gestalt):** related items close together or in the same container; unrelated ones separated.
- **Peak-end rule:** care for the most intense moment and the end of the flow (confirmation, success, error).
- **Aesthetic-usability effect:** attractive interfaces feel easier — which can hide problems in testing; do not mistake visual praise for usability.
- **Postel's law:** be liberal in what you accept (date formats, phone numbers, whitespace) and conservative in what you send.

## Nielsen's 10 heuristics

Use as a complementary lens in audits:

1. Visibility of system status.
2. Match between the system and the real world (the user's language).
3. User control and freedom (undo, exit, cancel).
4. Consistency and standards.
5. Error prevention.
6. Recognition rather than recall.
7. Flexibility and efficiency of use (shortcuts for experts).
8. Aesthetic and minimalist design.
9. Help users recognize, diagnose, and recover from errors.
10. Contextual help and documentation.

## Forbidden dark patterns

False urgency; fabricated scarcity; invented progress; extra steps to retain users; cancellation hidden or harder than signup; confirmshaming ("No, I'd rather pay more"); pre-checked opt-ins; costs revealed only at the end; trick questions with double negatives.

## Conflict resolution

1. Compliance, security, consent, and task success.
2. Predictability (Jakob) and motor ease (Fitts).
3. Choice clarity (Hick), grouping (Miller), and hierarchy (Von Restorff).
4. Resumption (Zeigarnik) and progress (goal gradient), when there is a real finite journey.

## Response format

**Implementation:** what changed, where, why (law + real problem), validations run, open items. Cite all seven laws, including N/A ones.

**Audit:** prioritized findings — screen/file, evidence, law or heuristic, recommendation, risk/effort. No code edits.

Never claim a conversion lift without measurement; present impact as a hypothesis and suggest how to measure it.
