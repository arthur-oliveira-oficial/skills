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
| UI/web behavior works | `agent-browser` run against the running app: snapshot/screenshot of the expected state, `errors` empty (see below) |

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

**No tool installed?** Don't add one unasked for a small change; mutate by hand. Commit or stash the real change first, then apply one plausible defect at a time (drop the rounding, `<` → `<=`, `floor`/`ceil`/`trunc` instead of `round`, remove a guard, swap operands), run the tests, and restore with `git checkout -- <file>`. Never write copies outside the working directory. Record each mutant and whether it was killed.

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

## Browser evidence for web behavior

Unit and integration tests do not prove a web page works for a user. For changes with a web UI or browser-facing behavior (pages, forms, auth flows, redirects, client-side state), verify the running app with [agent-browser](https://github.com/vercel-labs/agent-browser):

1. Load the version-matched guide once per session: `agent-browser skills get core`.
2. Start the app with the project's dev/preview server; use a named session: `agent-browser --session <task> open <url>`.
3. Drive the changed flow with the snapshot → act → re-snapshot loop; wait on concrete conditions (`wait --text`, `wait --url`).
4. Capture evidence: final-state snapshot or screenshot, `record start/stop` video for multi-step flows, `errors` and `console` output, `network requests --filter api` for API calls.
5. For a bug fix, capture the same flow **before** (symptom visible) and **after** (symptom gone).
6. `agent-browser --session <task> close`.

The full UI checklist (widths, touch, keyboard, axe, CLS) lives in the `frontend-engineering` skill, `references/browser-verification.md`. If `agent-browser` is unavailable or the app cannot run, list the browser checks as **not verified** — never as passed.

Prefer encoding critical flows as committed E2E tests (Playwright, Cypress) when the project has that layer; `agent-browser` evidence complements them and covers checks not yet automated.

## Residual risk

A green pipeline is not proof that no defect exists. State:

- Unverified areas and why.
- Assumptions made.
- Operational concerns and needed monitoring (metrics, alerts, logs).
- Follow-up work.
