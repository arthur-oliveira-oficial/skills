---
name: engineering-gauntlet
description: Evidence-driven software engineering process for AI coding agents. Use for non-trivial work (designing, planning, implementing, debugging (bug, failing test, regression, error, slow backend code), reviewing, refactoring, or shipping code); when a request needs clarifying before building; when writing a PRD, spec, implementation plan, backlog, test plan, or Definition of Done; when executing a plan with subagents; when responding to code review or finishing a branch (merge, PR); for backend work (APIs, databases, migrations, queues, auth, security); for writing prompts, skills, or AGENTS.md/CLAUDE.md; and whenever correctness must be demonstrated. Not for questions about code, trivial low-risk edits (typos, copy, renames), or purely visual UI work; a one-line change to auth, money, or data still qualifies. Também — planejar, especificar, implementar, corrigir, depurar, bug, erro, lentidão no backend, revisão de código, PR, merge, refatorar, banco de dados, migração, autenticação, segurança.
license: MIT
metadata:
  version: "2.4.1"
---

# Engineering Gauntlet

The human owns intent and acceptance. AI may generate and refactor code, but **completion requires reproducible evidence**.

Respond in the language of the user's messages (Brazilian Portuguese only when it cannot be determined), including report headings; keep commands, code, and identifiers as they are. Persisted artifacts (commits, PR text, docs, code comments) follow the repository's language. Match reply length to the user's; the final report holds only what the reader must act on (Evidence ≤ 8 rows, related checks grouped; tests as counts + path; details in the evidence directory).

## Iron laws

1. **Investigate before claiming.** Never speculate about code you have not opened; read it before answering or proposing changes.
2. **Behavior before code.** Without an observable contract, there is no way to know when it is done.
3. **No production code without a test that failed first** (when the kind of change allows it). No test infrastructure: [contract-and-tdd.md](references/contract-and-tdd.md) (No test infrastructure); never add a test dependency unasked.
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
| Bug, failing test, regression | [debugging.md](references/debugging.md), then [contract-and-tdd.md](references/contract-and-tdd.md) (regression test first; money and calculation rules) and, for high risk, the mutation section of [verification-and-evidence.md](references/verification-and-evidence.md) |
| UI/visual bug (from `frontend-engineering`) | [debugging.md](references/debugging.md) only; browser before/after captures are the regression evidence |
| Performance problem | [debugging.md](references/debugging.md) (Performance): before/after measurement with the same command; no red test required |
| Dependency upgrade, config/CI change, one-off script | no red test: build + full suite + the behavior exercised once ([verification-and-evidence.md](references/verification-and-evidence.md)) |
| Module design, interfaces, boundaries, complexity | [architecture.md](references/architecture.md) |
| API, database, migration, queues, auth, integrations | [backend.md](references/backend.md) |
| Risk classification, human review, code review, adversarial review | [risk-and-review.md](references/risk-and-review.md) |
| Request for an implementation plan, spec, PRD, backlog, or to break down work | [implementation-plan.md](references/implementation-plan.md) |
| Execute an approved plan (inline or subagent per task), worktrees, ledger | [execution.md](references/execution.md) |
| Respond to code review feedback; finish a branch (merge, PR, keep, discard) | [delivery.md](references/delivery.md) |
| Writing prompts, skills, AGENTS.md/CLAUDE.md, orchestrating subagents | [prompts-and-agents.md](references/prompts-and-agents.md) |

Several rows match (e.g. "export customers to CSV" → discovery + backend + risk) → read all; apply in workflow order: discovery, then risk and contract, then domain references. On follow-up turns, re-read only the reference the turn needs.

Question only: answer after reading the code. Review only: findings per [risk-and-review.md](references/risk-and-review.md); edit and commit nothing. Trivial edit: do it, run the relevant check, one-line report.

If `frontend-engineering` is installed, it leads interface work (its workflow and browser evidence); apply this skill on top only for medium/high risk or logic, data, auth, or money. Purely visual changes need browser evidence, not a red test. Browser checks use `agent-browser` ([verification-and-evidence.md](references/verification-and-evidence.md)).

## Default workflow

Scale depth to **risk** (not just size). Size, for deciding whether a plan is needed:

- **Small:** one behavior, a few files, done in one sitting (a bug fix, a field, a validation). No written plan; contract can live in the report.
- **Medium:** several behaviors or modules, or a new endpoint/screen. Short plan in the conversation or the host's plan mechanism (no file unless asked).
- **Large:** a feature spanning layers, a migration, or work for several sessions/agents. Full plan executed per [execution.md](references/execution.md).

Copy and track:

```
- [ ] 0. Discovery (after a first look at the repo): clarify intent, approve a design (skip if small and clear; high risk still needs approval)
- [ ] 1. Investigate the repository and the current execution path
- [ ] 2. Classify risk (low / medium / high) and set gates
- [ ] 3. Write the contract: observable outcomes, non-goals, failures, invariants
- [ ] 4. Split into verifiable behavior slices (a plan for medium/large work)
- [ ] 5. For each slice: red test → minimal green code → refactor
- [ ] 6. Verify in layers (lint, types, tests, build; mutation if critical)
- [ ] 7. Independent/adversarial review (medium/high risk)
- [ ] 8. Report evidence and residual risk
- [ ] 9. Finish: checkpoint, then merge / PR / keep / discard as the human chooses
```

**0. Discovery.** If intent, scope, or approach is open, take a first look at the repo, then follow [discovery.md](references/discovery.md): ask only what changes the build, approaches with a recommendation, and no building until the design is approved. Small and clear requests skip the questions, never high-risk approval.

**1. Investigate.** `AGENTS.md`/`CLAUDE.md`/README, manifests, entry points, relevant domain code, tests, CI, lint/type/build commands. For a bug or existing feature, trace the current execution path. Run independent reads in parallel. Before the first edit record `git status --porcelain` and, when the suite is fast, its current failures (the baseline).

**2. Risk.** Consider security, money, data loss, migrations, concurrency, public APIs, reversibility, and blast radius. A small auth change is high risk; a large docs refactor is low. Details in [risk-and-review.md](references/risk-and-review.md).

| Risk | Minimum gates |
|---|---|
| Low | focused tests, lint, types, build (no tooling for a check → N/A under **Not verified**; tests: iron law 3) |
| Medium | + written contract, regression/boundary tests, independent review |
| High | + tested invariants, negative security tests, mutation testing on critical modules, rollback plan, recorded human approval |

Gates scale to the change, not just the level: a one-line high-risk fix still needs the invariant tests, mutation check (manual if no tool), and human approval, but its rollback plan can be "revert the commit". When no human is available, follow the no-human rule in [discovery.md](references/discovery.md); approval stays pending under **Decisions needed**.

**3. Contract.** Short. Relevant ambiguity (a business rule or destination the repo cannot answer) → human reachable: ask before implementing, with your proposed default; minor → record the assumption under **Decisions needed** and proceed; nobody can answer → the no-human rule.

**4–5. Slices + TDD.** One slice = one primary outcome. Run the new test **before** the code and confirm it fails for the expected reason. Implement the minimum. Refactor with everything green.

**6. Verify.** Per slice: focused tests. Before the report and delivery: the project's full suite once (impractical → affected packages, the rest under **Not verified**). Pre-existing failures are reported too.

**7. Review** per [risk-and-review.md](references/risk-and-review.md) (checklist, read-only prompt, no-subagent fallback). Verify each finding against the code, then: blocking/important → fix and re-run step 6; minor → report, don't apply unasked (minimal scope).

**8. Report** using the format below.

**9. Finish.** Commit only when the human asked for or approved commits (mode approval counts) and the host/project allow it; otherwise create no branch, leave the verified change in the working tree, and list "commit" first under **Decisions needed**. Committing: local feature branch (never the default branch), staging only the paths you changed (never `git add -A`/`.`, evidence, ledgers). Never stage or commit a path that was dirty before you started; report it. No VCS: list the changed paths. Then follow [delivery.md](references/delivery.md). Merge, push, and PR are external side effects: only after the human chooses.

High risk: design approved (human reachable) → green (5) → full suite (6) → local checkpoint (commit, or `git add` of the changed paths) → mutation check → review (7) → fixes, re-verify, add commits (amend only if the human asks) → report (8) → delivery options (9). No human: the no-human rule.

For medium/large work, write a plan ([implementation-plan.md](references/implementation-plan.md)) and execute it with [execution.md](references/execution.md) (inline or a subagent per task).

## Final report format

```markdown
## Summary
What changed and why (1–3 sentences).
Risk: <low|medium|high> (factors). Root cause: <bug fixes>. Human approval: <quote (and date if the environment provides it) | pending | n/a>.

## Evidence
| Command | Result |
|---|---|
| `pnpm test` | PASS: 142 passed, 0 failed |
| `pnpm lint` | PASS: exit 0 |
| `pnpm build` | FAIL: see below |
| mutation check | NOT VERIFIED: no VCS |

Regression test: failed before the fix (`<short output>`), passes after.
Browser (web changes): `agent-browser` flow PASS, screenshots in `<abs project root>/.verification/`, no new `errors` versus baseline.

## Decisions needed
Business or product choices you made as assumptions and the human must confirm (rounding policy, defaults, copy, URLs), and pending approvals. Omit if none.

## Not verified
Skipped checks and why.

## Residual risk
Assumptions, uncovered areas, recommended monitoring.
```

This format is for the final report of a change (results are the words PASS / FAIL / NOT VERIFIED; no emoji); follow-up replies answer what was asked. Small low-risk change: three lines (what changed, command and result, not verified).

## Red flags — stop and go back

- Several changes bundled before running tests.
- A test that passed on the first run and you don't know why.
- Third fix attempt failing → question the architecture with the human.
- Hard-coding values to satisfy specific test cases; if a test looks wrong, say so.
- Trusting a subagent's success report without checking the diff.
- Treating "sounds good" about a playback as approval of the design.
- Agreeing with review feedback before verifying it against the code.
