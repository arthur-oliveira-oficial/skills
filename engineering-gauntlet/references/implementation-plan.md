# Implementation plan

Implementation-ready documentation grounded in the actual repository. The document answers four questions:

1. **What behavior is required?**
2. **How should the repository change?**
3. **In what order should the work be done?**
4. **What reproducible evidence will prove it is complete and correct?**

Don't implement the feature unless the user also asks for implementation.

## Contents
- Principles
- Repository discovery
- Planning depth
- Document sections (1–18)
- Traceability
- Output location
- Final quality gate

## Principles

1. Inspect the repository before writing.
2. The repository is the source of truth for architecture, conventions, paths, commands, dependencies, and current behavior.
3. Observable behavior before code changes.
4. Extend existing patterns instead of inventing architecture.
5. Separate observed facts from assumptions.
6. Don't invent paths, APIs, schemas, commands, services, or test infrastructure.
7. Information is missing but you can proceed safely → record the assumption and continue.
8. Depth proportional to **size** and **risk**.
9. Small, independently verifiable slices.
10. Never plan to weaken gates.
11. Completion requires evidence, not "looks correct".
12. Targeted human review where consequences or uncertainty matter.

## Repository discovery

Read the smallest useful set: `AGENTS.md`/`CLAUDE.md`, README, contribution guides, architecture docs and ADRs; manifests and lockfiles; entry points and routes; relevant domain/service/controller code; models, schemas, migrations; API contracts; frontend components and state when relevant; tests, fixtures, and commands; CI, lint, types, coverage, build; feature flags, env vars, observability, deploy; architecture-boundary and mutation tooling, if present.

For an existing feature or bug, trace the current execution path before proposing changes.

## Planning depth

- **Small:** localized change, few dependencies.
- **Medium:** several components or meaningful business rules.
- **Large:** cross-cutting, new subsystem, migration, external integration, security, multiple phases.

Cross with risk ([risk-and-review.md](risk-and-review.md)). Small + auth = high risk. Don't print the classification unless it helps. For medium/high risk, explicitly consider every reference in this skill.

Omit irrelevant sections for small changes; avoid unnecessary Scrum ceremony.

## Document sections

### 1. Implementation summary
What changes, why, intended outcome, affected users/systems, approach in a few lines, key constraints.

### 2. PRD / requirements
Problem, goals, **non-goals**, functional and non-functional requirements, business rules, constraints, dependencies, assumptions. Requirements observable/testable whenever possible.

### 3. Behavioral contract
External inputs and outputs, pre- and postconditions, invariants, success, validation and rejection, permissions, failures, idempotency/concurrency, compatibility, Given/When/Then examples where they add precision. For bugs, the behavior that must no longer occur. See [contract-and-tdd.md](contract-and-tdd.md).

### 4. Stories
Only those that improve clarity. `As a <role>, I want <capability>, so that <benefit>.` Purely technical work uses a **Technical Story** instead of inventing a persona. Stable IDs: `US-01`, `TS-01`.

### 5. Acceptance criteria
Per story and contract, observable and verifiable: happy path, validation, permissions, failures, empty/loading states, edge cases, compatibility, invariants. Selective Gherkin.

### 6. Technical design
Current and proposed execution path; responsibilities; data flow; API/contract changes; database/schema/models; migration/backfill; caching/state; events/queues/jobs; external integrations; auth; security/privacy; performance; flags/configuration; logs/metrics/tracing; rollout and rollback. New abstraction → explain why existing ones are insufficient. See [backend.md](backend.md).

### 7. Architecture boundaries
Allowed dependency directions, modules that must not know each other, stable public interfaces, ownership, data access, external services, complexity limits, checks that enforce them. See [architecture.md](architecture.md).

### 8. File-level change map
Files/modules to create or modify **based on evidence**: intended modification, requirement/story/backlog item served, architectural responsibility. Uncertain paths marked `TBD`.

### 9. Risks
For each relevant risk: description, impact, likelihood (Low/Medium/High), mitigation, detection/monitoring. Prioritize security, authorization, money, data loss, migrations, compatibility, concurrency, operational failure, external dependencies, rollback difficulty.

### 10. Sprint backlog
Items `SB-01`, `SB-02`… with title, linked requirement/story, objective, dependencies, priority (`P0`/`P1`/`P2`), completion signal and verification signal. Foundations before dependents. No story points or hours unless requested.

### 11. Engineering tasks
Write tasks for an implementer who has not seen the codebase or the spec: record the decisions they cannot make alone (paths, names, signatures, spec values, the tests that prove each task).

A task (`TASK-01.1`) is the **smallest unit with its own test cycle and a deliverable a reviewer could reject independently**. Setup and docs fold into the task that needs them. Vertical slices when possible. No "implement backend" or "add tests".

Each task contains:
- **Files:** to create/modify, each with one clear responsibility.
- **Interfaces:** what it consumes from earlier tasks and produces for later ones (types, functions, endpoints, events).
- **Steps** as checkboxes in TDD order:
  ```markdown
  - [ ] Write test `rejects_cancel_when_shipped` asserting 409 + `ORDER_ALREADY_SHIPPED`
  - [ ] Run `pnpm test orders/cancel` → expect FAIL (missing guard)
  - [ ] Implement guard in `src/orders/cancel.ts` (`cancelOrder(id, actor): Result<Order, CancelError>`)
  - [ ] Run `pnpm test orders/cancel` → expect PASS
  - [ ] Commit `feat(orders): reject cancel after shipping (TASK-02.1)`
  ```
  Test steps name the test and its assertion; code steps give signature, location, and spec-pinned values — not full bodies, unless an exact algorithm or copy is required; verification steps give the command and expected result.

Put two blocks in the plan header, before the tasks:
- **Global constraints:** project-wide requirements copied verbatim from the spec; they apply to every task.
- **Review focus:** the most likely real-world failure inputs the spec implies but does not spell out (empty lists, concurrent edits, timezone edges, huge payloads), each tied to a test in the task that owns it.

### 12. TDD / regression strategy
Bugs: a regression test that reproduces the failure before the fix. Critical changes: a Red → Green → Refactor sequence. Don't force ceremony on trivial changes, but all behavior must be verifiable.

### 13. Test and verification plan
Derived from requirements, contracts, and risks — not from code structure. Consider unit, integration, contract/API, database/migration, E2E, permissions, error/retry/timeout, concurrency/idempotency, regression, property, load (if justified), mutation on critical logic, manual validation when automation isn't viable. Include exact commands when known. See [verification-and-evidence.md](verification-and-evidence.md).

### 14. Adversarial review plan
For medium/high risk: who/which agent reviews, with what inputs (contract + diff), and which attack checklist. See [risk-and-review.md](risk-and-review.md).

### 15. Definition of Done
Change-specific: contract and criteria met; relevant automated verification passing; lint/types/build; migrations verified; security reviewed; observability; docs/config updated; rollout/rollback validated; no gate weakened; no known blocking regressions; residual risks documented.

### 16. Code review checklist
Only the relevant items from the checklist in [risk-and-review.md](risk-and-review.md).

### 17. Implementation evidence required
What must be produced to claim completion: commands and results, tests added, regression reproduction before the fix, lint/types/build, migration and permission verification, screenshots or request/response examples, skipped checks and reasons, limitations, residual risks. **Don't claim the evidence exists during planning.**

### 18. Open questions and assumptions
Unresolved decisions and assumptions to validate. Don't hide uncertainty in confident prose.

## Traceability

Lightweight, proportional to size: `REQ-*` requirements, `BC-*`/`INV-*` contracts and invariants, `US-*`/`TS-*` stories, `SB-*` backlog, `TASK-*` tasks, `TEST-*` tests/scenarios, `RISK-*` risks, `EVID-*` evidence. Backlog items, important tests, and evidence reference the requirement they satisfy.

## Output location

Save to `docs/plan-implementation/<feature-slug>.md` (lowercase kebab-case), creating the directory if needed, unless the user specifies another path. Don't switch directories just because the repository already has another docs folder. If the user asks for content only, respond without creating a file.

## Final quality gate

- [ ] Grounded in repository evidence; no invented fact presented as certain.
- [ ] Behavior defined before implementation details.
- [ ] Every relevant requirement maps to work.
- [ ] Acceptance criteria are verifiable.
- [ ] Invariants and critical failures captured.
- [ ] Architecture boundaries explicit for cross-cutting changes.
- [ ] Tasks small and verifiable, with files, interfaces, and TDD steps; sequencing and dependencies visible.
- [ ] Global constraints and review focus listed; review focus tied to tests.
- [ ] Verification depth proportional to risk.
- [ ] Bugs have regression-first coverage.
- [ ] High risk has independent/adversarial review.
- [ ] No step weakens gates.
- [ ] Evidence specified in advance.
- [ ] Risks have mitigations and residual uncertainty.
- [ ] Non-goals prevent scope creep; optional work separated from required.

## Self-review before handoff

Check the plan against the spec:
1. **Coverage:** every requirement maps to a task; add tasks for gaps.
2. **Step clarity:** no vague steps, no over-detailed code bodies.
3. **Consistency:** types and names match across tasks' interfaces.
4. **Review focus:** each item is covered by a test.
5. **Proportion:** a plan several times longer than its spec has become a transcript of the code — trim it.

If the spec covers several independent subsystems, split it into separate plans, each producing testable software on its own.

## Handoff

At the end, respond with a short summary: path of the created document, highest-impact decisions, risk level, and open questions. If implementation is also requested, recommend an execution mode (inline or subagent-driven, see [execution.md](execution.md)) with a reason, and wait for approval before implementing.
