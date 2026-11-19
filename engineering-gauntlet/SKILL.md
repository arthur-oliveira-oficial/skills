---
name: engineering-gauntlet
description: Evidence-driven software engineering process for AI coding agents. Use when designing, planning, implementing, debugging, reviewing, refactoring, or shipping code in any language; when a request needs clarifying before building; when writing a PRD, spec, implementation plan, backlog, test plan, or Definition of Done; when executing a plan with subagents; when responding to code review or finishing a branch (merge, PR); for backend work (APIs, databases, migrations, queues, auth, security); for writing prompts, skills, or AGENTS.md/CLAUDE.md; and whenever correctness must be demonstrated rather than assumed. Também: planejar, especificar, implementar, depurar, bug, teste, revisão de código, refatorar, API, banco de dados, migração, plano de implementação, prompt.
license: MIT
metadata:
  version: "2.3.3"
---

# Engineering Gauntlet

The human owns intent and acceptance. AI may generate and refactor code, but **completion requires reproducible evidence**.

Respond in the user's language (default: Brazilian Portuguese), including the headings of the report format below; keep commands, code, and identifiers as they are.

## Iron laws

1. **Investigate before claiming.** Never speculate about code you have not opened. Read the relevant files before answering or proposing changes.
2. **Behavior before code.** Without an observable contract, there is no way to know when it is done.
3. **No production code without a test that failed first** (when test infrastructure exists and the kind of change allows it).
4. **No fix without a root cause.** Fixing a symptom is a failure.
5. **Evidence before assertions.** No "should work" or "probably passes". Run the command, read the output, then claim.
6. **Never weaken a gate** (threshold, assertion, lint, type, skipped test) to make a change pass.
7. **Minimal scope.** Only what was asked or is clearly necessary. No "while I'm here" refactors, abstractions for hypothetical requirements, error handling for impossible scenarios, or docstrings on code you didn't touch.
8. **Irreversible actions need confirmation.** Deleting files/branches, `drop`, `push --force`, `reset --hard`, destructive migrations, publishing to external services. Don't use destructive shortcuts to get past obstacles (`--no-verify`, discarding unfamiliar files).

## Routing

| Situation | Read |
|---|---|
| New feature or unclear request: clarify intent and approve a design before building | [discovery.md](references/discovery.md) |
| Feature, behavior change, refactor | [contract-and-tdd.md](references/contract-and-tdd.md), [verification-and-evidence.md](references/verification-and-evidence.md) |
| Bug, failing test, regression, performance problem | [debugging.md](references/debugging.md), then [contract-and-tdd.md](references/contract-and-tdd.md) (regression test first; money and calculation rules) and, for high risk, the mutation section of [verification-and-evidence.md](references/verification-and-evidence.md) |
| Module design, interfaces, boundaries, complexity | [architecture.md](references/architecture.md) |
| API, database, migration, queues, auth, integrations | [backend.md](references/backend.md) |
| Risk classification, human review, code review, adversarial review | [risk-and-review.md](references/risk-and-review.md) |
| Request to plan, document, or break down work | [implementation-plan.md](references/implementation-plan.md) |
| Execute an approved plan (inline or subagent per task), worktrees, ledger | [execution.md](references/execution.md) |
| Respond to code review feedback; finish a branch (merge, PR, keep, discard) | [delivery.md](references/delivery.md) |
| Writing prompts, skills, AGENTS.md/CLAUDE.md, orchestrating subagents | [prompts-and-agents.md](references/prompts-and-agents.md) |

When several rows match (e.g. "export customers to CSV" → discovery + backend + risk, since it moves personal data), read all of them and apply them in workflow order: discovery first, then risk and contract, then the domain references during implementation.

For interface changes, also use the `frontend-engineering` skill. For anything that runs in a browser, verification and bug reproduction use `agent-browser` (see [verification-and-evidence.md](references/verification-and-evidence.md) and [debugging.md](references/debugging.md)).

## Default workflow

Scale depth to **risk** (not just size). Size, for deciding whether a plan is needed:

- **Small:** one behavior, a few files, done in one sitting (a bug fix, a field, a validation). No written plan; contract can live in the report.
- **Medium:** several behaviors or modules, or a new endpoint/screen. Short written plan.
- **Large:** a feature spanning layers, a migration, or work for several sessions/agents. Full plan executed per [execution.md](references/execution.md).

Copy and track:

```
- [ ] 0. Discovery: clarify intent, approve a design (skip if small and clear)
- [ ] 1. Investigate the repository and the current execution path
- [ ] 2. Classify risk (low / medium / high) and set gates
- [ ] 3. Write the contract: observable outcomes, non-goals, failures, invariants
- [ ] 4. Split into verifiable behavior slices (a plan for medium/large work)
- [ ] 5. For each slice: red test → minimal green code → refactor
- [ ] 6. Verify in layers (lint, types, tests, build; mutation if critical)
- [ ] 7. Independent/adversarial review (medium/high risk)
- [ ] 8. Report evidence and residual risk
- [ ] 9. Finish the branch: verify, then merge / PR / keep / discard as the human chooses
```

**0. Discovery.** If intent, scope, or approach is open, follow [discovery.md](references/discovery.md): one question at a time, approaches with a recommendation, and no building until the design is approved. Small and clear requests skip this.

**1. Investigate.** `AGENTS.md`/`CLAUDE.md`/README, manifests, entry points, relevant domain code, tests, CI, lint/type/build commands. For a bug or existing feature, trace the current execution path. Run independent reads in parallel.

**2. Risk.** Consider security, money, data loss, migrations, concurrency, public APIs, reversibility, and blast radius. A small auth change is high risk; a large docs refactor is low. Details in [risk-and-review.md](references/risk-and-review.md).

| Risk | Minimum gates |
|---|---|
| Low | focused tests, lint, types, build (a check the project has no tooling for is reported as N/A in **Not verified**; don't add tooling unasked) |
| Medium | + written contract, regression/boundary tests, independent review |
| High | + tested invariants, negative security tests, mutation testing on critical modules, rollback plan, recorded human approval |

Gates scale to the change, not just the level: a one-line high-risk fix still needs the invariant tests, mutation check (manual if no tool, see [verification-and-evidence.md](references/verification-and-evidence.md)), and human approval, but its rollback plan can be "revert the commit". When no human is available, do the work, do not merge or deploy, and list the approval as pending under **Decisions needed**.

**3. Contract.** Short. Relevant ambiguity → ask before implementing; minor ambiguity → record the assumption and proceed.

**4–5. Slices + TDD.** One slice = one primary outcome. Run the new test **before** the code and confirm it fails for the expected reason. Implement the minimum. Refactor with everything green.

**6. Verify.** Run the project's full suite, not just the new file. Pre-existing failures are reported too.

**7. Review.** Reviewer in a clean context, given contract + diff and an attack checklist — not "review this". Verify each finding against the code, then: blocking/important → fix and re-run step 6; suggestions → report, don't apply unasked (minimal scope).

**8. Report** using the format below.

**9. Finish.** Commit verified work locally on a feature branch (never directly on the default branch) with a message describing the behavior, unless the project or the human says otherwise; a local commit is reversible and makes "keep" and "PR" meaningful. Then follow [delivery.md](references/delivery.md). Merge, push, and PR are external side effects: only after the human chooses.

For high risk the order is: green (5) → full suite (6) → local commit → mutation check on the committed change → review (7) → fixes, re-verify, amend or add commits → report (8) → delivery options (9).

For medium/large work, write a plan ([implementation-plan.md](references/implementation-plan.md)) and execute it with [execution.md](references/execution.md) — inline, or a fresh subagent per task with independent spec and quality reviews.

## Final report format

```markdown
## Summary
What changed and why (1–3 sentences).

## Evidence
| Command | Result |
|---|---|
| `pnpm test` | ✅ 142 passed, 0 failed |
| `pnpm lint` | ✅ exit 0 |
| `pnpm build` | ❌ failed — see below |

Regression test: failed before the fix (`<short output>`), passes after.
Browser (web changes): `agent-browser` flow ✅, screenshots in `.verification/`, `errors` empty.

## Decisions needed
Business or product choices you made as assumptions and the human must confirm (rounding policy, defaults, copy, URLs), and pending approvals. Omit if none.

## Not verified
Skipped checks and why.

## Residual risk
Assumptions, uncovered areas, recommended monitoring.
```

## Red flags — stop and go back

- "I'll just try this and see if it works."
- Several changes bundled before running tests.
- A test that passed on the first run and you don't know why.
- Third fix attempt failing → question the architecture with the human.
- Urge to adjust the test/threshold so it passes.
- Hard-coding values to satisfy specific test cases. Tests verify the solution; they don't define it. If a test looks wrong, say so instead of working around it.
- Trusting a subagent's success report without checking the diff.
- Building before the design was approved, or treating "sounds good" as approval.
- Agreeing with review feedback before verifying it against the code.
