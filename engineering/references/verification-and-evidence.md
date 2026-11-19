# Verification and evidence

## Contents
- Verification before completion
- Overlapping test layers
- Mutation testing
- Never weaken gates
- Evidence report
- Residual risk

## Verification before completion

Before any success claim — "done", "fixed", "passing", a commit, a PR, moving to the next task, or delegating:

1. Identify the command that proves the claim.
2. Run it in full, **now** (a previous run doesn't prove the current state).
3. Read the entire output and the exit code.
4. Only then claim, citing the evidence.

| Claim | Required evidence |
|---|---|
| Tests pass | output with 0 failures |
| Lint ok | 0 linter errors |
| Build ok | exit code 0 |
| Bug fixed | test for the original symptom passes |
| Regression test is valid | fails with the fix reverted, passes with it |
| Subagent work | the VCS diff shows the changes |
| Requirements met | line-by-line checklist against the plan/contract |

Partial checks don't count: a passing linter doesn't prove the code compiles. Words like "should", "probably", "I think" in a completion report signal a violation.

## Overlapping test layers

Combine layers that catch different failure modes; map each risk to a layer:

| Layer | Catches |
|---|---|
| Unit | domain logic, boundaries, calculations |
| Property-based | invariants over generated inputs |
| Integration | contracts with databases, queues, services |
| Contract/API | schema and status-code compatibility |
| E2E | critical user flows |
| Security (negative) | unauthorized access, injection, malicious input |
| Concurrency | race conditions, idempotency under retry |

Criteria: behavior covered at the right boundary; important invariants have property tests; integrations have boundary tests; sensitive flows have negative tests. Don't duplicate layers that cover the same failure mode.

## Mutation testing

High line coverage doesn't prove tests are effective. On critical or changed logic, inject plausible defects and check whether tests fail.

Common tools: Stryker (JS/TS, C#), PIT (Java), mutmut / cosmic-ray (Python), cargo-mutants (Rust), go-mutesting (Go).

- Define the scope (changed or critical modules).
- Review surviving mutants.
- Document equivalent mutants.
- Survivors in critical logic block completion.

## Never weaken gates

Don't lower coverage thresholds, skip checks, delete assertions, broaden ignores, or add `@ts-ignore`/`eslint-disable`/`# type: ignore`/`.skip` just to pass.

Fix the implementation or **escalate** the gate as an open project decision. Threshold changes are separate, explicit, justified decisions. Skipped checks appear in the report.

## Evidence report

A compact table tied to repository commands and the current revision:

- Exact commands.
- Result and exit code.
- Metrics with scope and tool (e.g., "mutation score 87% on `src/billing/` via Stryker").
- Failures and skipped items visible, with reasons.

## Residual risk

A green pipeline is not proof that no defect exists. State:

- Unverified areas and why.
- Assumptions made.
- Operational concerns and needed monitoring (metrics, alerts, logs).
- Follow-up work.
