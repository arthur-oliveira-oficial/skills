---
name: implementation-docs
description: Create implementation-ready, evidence-driven software documentation for a feature, change, bug fix, refactor, integration, migration, or technical initiative. Use when asked to plan implementation, create implementation documentation, prepare a Sprint Backlog, break down development work, write technical design, PRD, user stories, acceptance criteria, behavioral contracts, tasks, verification strategy, test plan, risks, Definition of Done, implementation evidence, or code-review checklist. Inspect the repository first and adapt rigor to change size and risk.
---

# Implementation Documentation

Create implementation-ready documentation grounded in the actual repository whenever a repository is available.

The document must answer four questions:

1. **What behavior is required?**
2. **How should the repository change?**
3. **In what order should the work be implemented?**
4. **What reproducible evidence will prove the change is complete and correct?**

Do not implement the feature unless the user also requests implementation.

## Core principles

1. Inspect the repository before writing the plan.
2. Treat the repository as the source of truth for architecture, conventions, paths, commands, dependencies, and existing behavior.
3. Define observable behavior before proposing code changes.
4. Prefer extending existing patterns over inventing new architecture.
5. Separate observed facts from assumptions.
6. Do not fabricate file paths, APIs, schemas, commands, services, constraints, or test infrastructure.
7. When information is missing but planning can proceed safely, record an explicit assumption and continue.
8. Match planning and verification depth to both **change size** and **risk**.
9. Break work into small, independently verifiable implementation slices.
10. Never weaken existing quality gates merely to make a planned change pass.
11. Completion requires evidence, not a claim that the implementation "looks correct".
12. Keep human review targeted to the areas where consequences or uncertainty are meaningful.

## Repository discovery

Before drafting, inspect the smallest useful set of repository files. Look for:

- `AGENTS.md`, README files, contribution guides, architecture docs, ADRs
- package/build manifests and lockfiles
- application entry points and routing
- relevant domain/service/controller/use-case code
- persistence models, schemas, migrations, repositories
- public/internal API definitions and contracts
- frontend components and state-management patterns when relevant
- tests, fixtures, factories, mocks, and test commands
- CI configuration, linting, formatting, type-checking, coverage, and build commands
- feature flags, environment variables, observability, and deployment configuration
- dependency-boundary or architecture-enforcement tooling
- mutation-testing tooling if already present

For an existing feature or bug, trace the current execution path before proposing changes.

## Determine planning depth

Classify the work internally by size:

- **Small**: localized change with limited dependencies.
- **Medium**: several components or meaningful business behavior.
- **Large**: cross-cutting change, new subsystem, migration, external integration, security-sensitive work, or multiple delivery phases.

Also classify implementation risk using `rules/risk-classification.md`.

Use both dimensions to decide rigor. A small authentication or payment change can still be high risk. A large documentation-only refactor can be low risk.

Do not print either classification unless it improves the document.

## Required workflow

Use `references/output-template.md` as the default document shape. Apply the rule files below where relevant.

### Rule modules

Read and apply these rules as needed:

- `rules/behavioral-contract.md`
- `rules/implementation-slices.md`
- `rules/tdd-and-regression.md`
- `rules/verification-gauntlet.md`
- `rules/architecture-boundaries.md`
- `rules/risk-classification.md`
- `rules/adversarial-review.md`
- `rules/implementation-evidence.md`

For medium/high-risk work, all eight rule modules should be considered explicitly.

## 1. Implementation summary

Explain:

- what is changing
- why it is needed
- intended outcome
- affected users/systems
- concise proposed approach
- key implementation constraints

## 2. PRD / requirements

Capture:

- problem statement
- goals
- non-goals
- functional requirements
- non-functional requirements when relevant
- business rules
- constraints
- dependencies
- assumptions

Requirements should be observable or testable whenever possible.

## 3. Behavioral contract

Before technical design, define the intended observable behavior.

Include, when relevant:

- externally visible inputs and outputs
- preconditions
- postconditions
- invariants that must remain true
- success behavior
- validation and rejection behavior
- permission/security behavior
- failure behavior
- idempotency/concurrency expectations
- compatibility expectations
- critical examples in Given/When/Then form when that adds precision

For bug fixes, explicitly document the failing/regression behavior that must no longer occur.

Follow `rules/behavioral-contract.md`.

## 4. User / technical stories

Create only stories that improve implementation clarity.

Preferred user story form:

`As a <role>, I want <capability>, so that <benefit>.`

Technical-only work may use a **Technical Story** rather than inventing a user persona.

Give each story a stable identifier such as `US-01` or `TS-01`.

## 5. Acceptance criteria

Attach acceptance criteria to each story and behavioral contract.

Criteria must be observable and verifiable. Cover as applicable:

- happy path
- validation
- permissions/security
- failure behavior
- empty/loading states
- edge cases
- compatibility expectations
- relevant invariants

Use Gherkin selectively for behavior where examples materially reduce ambiguity.

## 6. Technical / system design

Ground the design in repository evidence.

Document as applicable:

- current execution path
- proposed execution path
- module/component responsibilities
- data flow
- API/contract changes
- database/schema/model changes
- migration/backfill needs
- caching/state changes
- events/queues/background jobs
- external integrations
- authentication/authorization
- security/privacy considerations
- performance/scalability concerns
- feature flags/configuration
- logging/metrics/tracing
- rollout and rollback strategy

When proposing a new abstraction, explain why existing abstractions are insufficient.

## 7. Architecture boundaries

Document important architectural constraints for the change.

Include, when relevant:

- allowed dependency directions
- modules/layers that must not depend on one another
- public interfaces that should remain stable
- ownership boundaries
- data-access boundaries
- external-service boundaries
- complexity/size limits where useful
- repository checks that enforce architecture

Follow `rules/architecture-boundaries.md`.

## 8. File-level change map

List likely files/modules to create or modify, based only on repository evidence.

For each item, explain:

- intended modification
- requirement/story/backlog item it supports
- architectural responsibility

Mark uncertain paths as `TBD` rather than inventing them.

## 9. Risk classification and analysis

Classify the change by consequence and uncertainty before defining verification depth.

For each meaningful risk, document:

- risk
- impact
- likelihood (`Low`, `Medium`, `High`)
- mitigation
- detection/monitoring where applicable

Prioritize:

- security/privacy
- authorization
- money/billing
- data loss/corruption
- migrations
- compatibility
- concurrency/idempotency
- operational failure
- external dependencies
- rollback difficulty

Follow `rules/risk-classification.md`.

## 10. Sprint Backlog

Convert the design into an ordered implementation backlog.

Use identifiers such as `SB-01`, `SB-02`.

Each backlog item should include:

- title
- linked requirement/story
- implementation objective
- dependencies
- priority (`P0`, `P1`, `P2`)
- completion signal
- verification signal when useful

Sequence foundational work before dependent work.

Do not invent story points or hour estimates unless explicitly requested.

## 11. Engineering task breakdown

Break backlog items into atomic, executable tasks using identifiers such as `TASK-01.1`.

Prefer behaviorally complete vertical slices over broad horizontal phases when practical.

Each task should state:

- action
- target component/file when known
- expected result
- dependency when relevant
- verification step

Include tests, migrations, telemetry, documentation, flags, cleanup, and deployment tasks only when relevant.

Avoid vague tasks such as "implement backend" or "add tests".

Follow `rules/implementation-slices.md`.

## 12. TDD / regression strategy

For bugs, plan a regression test that reproduces the failure before the fix whenever practical.

For critical or behavior-heavy changes, describe a Red → Green → Refactor delivery sequence where it creates useful feedback.

Do not force TDD ceremony for trivial or unsuitable changes, but always require behavior to be verifiable.

Follow `rules/tdd-and-regression.md`.

## 13. Test and verification plan

Design verification from requirements, behavioral contracts, and risks — not only from implementation structure.

Consider:

- unit tests
- integration tests
- contract/API tests
- database/migration tests
- end-to-end tests
- permission/security cases
- error/retry/timeout cases
- concurrency/idempotency tests
- regression coverage
- property/invariant tests when useful
- performance/load tests when justified
- mutation testing for critical logic when supported or worth adding
- manual validation when automation is impractical

Use overlapping test layers only when they cover meaningfully different failure modes.

When repository validation commands are known, include exact commands.

Never plan to disable tests, reduce coverage thresholds, suppress type errors, or relax lint rules simply to obtain a passing result.

Follow `rules/verification-gauntlet.md`.

## 14. Adversarial review plan

For medium/high-risk changes, define an independent review pass that deliberately searches for:

- missing requirements
- incorrect assumptions
- security or authorization gaps
- data-integrity failures
- race conditions
- backward-compatibility issues
- weak tests
- unhandled error paths
- scope that should not be part of the change

The reviewer/agent should critique the implementation against the behavioral contract rather than merely restating the implementation.

Follow `rules/adversarial-review.md`.

## 15. Definition of Done

Create a change-specific DoD, normally covering:

- behavioral contract satisfied
- acceptance criteria satisfied
- implementation complete
- relevant automated verification passing
- lint/type/build checks passing
- migrations verified where relevant
- security/permissions reviewed where relevant
- observability added where relevant
- documentation/config updated
- rollout/rollback validated where relevant
- no existing quality gate weakened
- no known blocking regressions
- residual risks documented

## 16. Code review checklist

Create a reviewer-oriented checklist containing only relevant concerns:

- correctness and business rules
- behavioral contract/invariants
- architecture boundaries and repository conventions
- readability/maintainability
- type/input safety
- authorization/security/privacy
- data integrity/migrations
- concurrency/idempotency
- error handling/resiliency
- performance
- test quality/regression strength
- observability and sensitive-data leakage
- backwards compatibility
- rollout/rollback
- cleanup of temporary code/flags
- accidental weakening of quality gates

## 17. Implementation evidence required

Define the evidence that must be produced after implementation to claim completion.

Evidence can include:

- exact commands executed
- command exit status/result
- tests added/changed
- regression reproduction before fix when applicable
- lint/type/build results
- migration verification
- security/permission verification
- relevant screenshots or request/response examples where useful
- skipped checks and reasons
- known limitations
- residual risks

Do not claim evidence exists during planning. State it as a required completion artifact.

Follow `rules/implementation-evidence.md`.

## 18. Open questions and assumptions

End with unresolved decisions and assumptions that should be validated before or during implementation.

Do not hide uncertainty inside confident prose.

## Traceability

Maintain lightweight traceability:

- requirements: `REQ-*`
- behavioral contracts/invariants: `BC-*` / `INV-*`
- user/technical stories: `US-*` / `TS-*`
- backlog: `SB-*`
- tasks: `TASK-*`
- tests/scenarios: `TEST-*`
- risks: `RISK-*`
- evidence requirements: `EVID-*`

Backlog items, important tests, and evidence should reference the behavior or requirement they satisfy.

Do not over-engineer traceability for small changes.

## Output location

Unless the user explicitly specifies another path, save implementation documentation in the project at:

`docs/plan-implementation/<feature-slug>.md`

Create `docs/plan-implementation/` when it does not exist.

Do not switch to another planning/docs directory merely because the repository already has one; this skill's default location is `docs/plan-implementation/`.

If the user explicitly requests only the content and does not want a repository file created, return the document in the response instead.

Use a concise lowercase kebab-case feature slug.

## Final quality gate

Before finishing the document, verify that:

- the plan is grounded in repository evidence
- behavioral expectations are defined before implementation details
- every major requirement maps to implementation work
- acceptance criteria are verifiable
- invariants and critical failure behavior are captured where relevant
- architecture boundaries are explicit for meaningful cross-module changes
- tasks are small enough to implement and verify independently
- sequencing and dependencies are visible
- verification depth matches risk
- bugs include regression-first coverage where practical
- high-risk behavior has independent/adversarial review coverage
- no planned step weakens existing quality gates
- implementation evidence is specified in advance
- risks include mitigations and residual uncertainty
- no invented repository facts are presented as certain
- non-goals prevent obvious scope creep
- optional enhancements are distinguishable from required work
- unnecessary Scrum ceremony has been avoided

Return a short summary naming the created document and highlighting the highest-impact implementation decisions, risk level, and unresolved questions.
