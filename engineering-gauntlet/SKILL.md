---
name: engineering-gauntlet
description: Evidence-driven software engineering process for working with AI agents — behavioral contract before code, TDD in small slices, systematic root-cause debugging, deep-module architecture, layered verification, mutation testing, adversarial review, and reports backed by reproducible evidence. Includes backend practices (APIs, data, migrations, idempotency, concurrency, OWASP security, observability) and prompt engineering (writing prompts, skills, AGENTS.md/CLAUDE.md, orchestrating subagents). Use when planning, implementing, debugging, reviewing, or refactoring code; when writing implementation docs (PRD, contract, stories, acceptance criteria, backlog, test plan, Definition of Done); and whenever correctness must be demonstrated rather than assumed. Também: planejar, implementar, depurar, bug, teste, revisão de código, refatorar, API, banco de dados, migração, plano de implementação, prompt.
license: MIT
metadata:
  version: "2.1.0"
---

# Engineering Gauntlet

The human owns intent and acceptance. AI may generate and refactor code, but **completion requires reproducible evidence**.

Respond in the user's language (default: Brazilian Portuguese).

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
| Feature, behavior change, refactor | [contract-and-tdd.md](references/contract-and-tdd.md), [verification-and-evidence.md](references/verification-and-evidence.md) |
| Bug, failing test, regression, performance problem | [debugging.md](references/debugging.md) |
| Module design, interfaces, boundaries, complexity | [architecture.md](references/architecture.md) |
| API, database, migration, queues, auth, integrations | [backend.md](references/backend.md) |
| Risk classification, human review, code review, adversarial review | [risk-and-review.md](references/risk-and-review.md) |
| Request to plan, document, or break down work | [implementation-plan.md](references/implementation-plan.md) |
| Writing prompts, skills, AGENTS.md/CLAUDE.md, orchestrating subagents | [prompts-and-agents.md](references/prompts-and-agents.md) |

For interface changes, also use the `frontend-engineering` skill.

## Default workflow

Scale depth to **risk** (not just size). Copy and track:

```
- [ ] 1. Investigate the repository and the current execution path
- [ ] 2. Classify risk (low / medium / high) and set gates
- [ ] 3. Write the contract: observable outcomes, non-goals, failures, invariants
- [ ] 4. Split into verifiable behavior slices
- [ ] 5. For each slice: red test → minimal green code → refactor
- [ ] 6. Verify in layers (lint, types, tests, build; mutation if critical)
- [ ] 7. Independent/adversarial review (medium/high risk)
- [ ] 8. Report evidence and residual risk
```

**1. Investigate.** `AGENTS.md`/`CLAUDE.md`/README, manifests, entry points, relevant domain code, tests, CI, lint/type/build commands. For a bug or existing feature, trace the current execution path. Run independent reads in parallel.

**2. Risk.** Consider security, money, data loss, migrations, concurrency, public APIs, reversibility, and blast radius. A small auth change is high risk; a large docs refactor is low. Details in [risk-and-review.md](references/risk-and-review.md).

| Risk | Minimum gates |
|---|---|
| Low | focused tests, lint, types, build |
| Medium | + written contract, regression/boundary tests, independent review |
| High | + tested invariants, negative security tests, mutation testing on critical modules, rollback plan, recorded human approval |

**3. Contract.** Short. Relevant ambiguity → ask before implementing; minor ambiguity → record the assumption and proceed.

**4–5. Slices + TDD.** One slice = one primary outcome. Run the new test **before** the code and confirm it fails for the expected reason. Implement the minimum. Refactor with everything green.

**6. Verify.** Run the project's full suite, not just the new file. Pre-existing failures are reported too.

**7. Review.** Reviewer in a clean context, given contract + diff and an attack checklist — not "review this".

**8. Report** using the format below.

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
