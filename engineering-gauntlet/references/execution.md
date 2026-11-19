# Executing a plan

How to carry out an approved plan: inline in one session, or with a fresh subagent per task and independent reviews.

## Contents
- Choosing the mode
- Setup: isolated workspace and baseline
- Ledger
- Inline execution
- Subagent-driven execution
- Model selection
- Autonomy rules
- Rationalizations

## Choosing the mode

| Mode | How | Use when |
|---|---|---|
| **Inline** | The current session implements every task, then one fresh reviewer checks the whole branch | Few or tightly coupled tasks, low/medium risk, cost matters |
| **Subagent-driven** | A fresh implementer subagent per task, a fresh reviewer per task, then a whole-branch review | Many mostly independent tasks, high cost of a shipped mistake, long work that would exhaust one context |

Recommend one mode with a reason (task coupling, task count, cost of a mistake) and wait for approval unless the user already chose. An explicit "start building" after design approval covers inline mode; ask again only to propose subagent-driven mode or commits the human has not mentioned. Approval of a mode must include consent to one commit per task (and the branch or worktree); without it, or when the host or project restricts commits, checkpoint each task by staging its changed paths (`git add <paths>`, never `-A`).

## Setup: isolated workspace and baseline

1. Commits restricted or not approved: stay on the current branch, create no branch or worktree; checkpoints are staged paths. Otherwise do not start feature work on `main`/`master` without explicit consent: create a branch, or a git worktree for parallel or long work. Use the host's worktree mechanism if it has one; otherwise an absolute path outside the repo:
   ```bash
   git worktree add /abs/<repo>-worktrees/<feature-slug> -b <feature-slug>
   ```
   A worktree inside the repo is ignored via `<common-dir>/info/exclude`; never edit the tracked `.gitignore` for it. `<common-dir>` = `git rev-parse --path-format=absolute --git-common-dir`, resolved once and passed literally (also to subagents).
2. Install dependencies and run the full test suite to record a **clean baseline**. Pre-existing failures are reported before any change, so they are not blamed on the work. Baseline cannot be established (install fails): stop and ask before changing a dependency version; no human reachable → record a ruling and list it under **Decisions needed**.
3. Read the plan and the linked spec/contract. When they conflict, the spec wins; scan for conflicts before task 1 and resolve or ask.

## Ledger

Conversation memory does not survive compaction or a new session. Keep a per-plan ledger file outside the tracked tree, shared by all worktrees: `<common-dir>/gauntlet/<feature-slug>-ledger.md` (absolute path, resolved once as in Setup). Writes there denied: use the host scratch directory and say so. Never commit it.

```markdown
# Ledger: <feature>
Base commit: <sha>

| Task | Status | Commit | Review | Notes |
|---|---|---|---|---|
| TASK-01.1 | done | a1b2c3d | spec PASS, quality PASS | |
| TASK-01.2 | in progress | | | |

## Rulings
- R1 (TASK-01.2): chose cursor pagination over offset — spec silent; offset breaks on inserts. Risk: low.
```

After compaction or resuming, trust the ledger and `git log`, not memory.

## Inline execution

For each task, in plan order:
1. Mark it in progress in the ledger.
2. Red → green → refactor ([contract-and-tdd.md](contract-and-tdd.md)).
3. Run the task's verification command; commit with a message referencing the task ID (or stage, if commits were not approved).
4. Mark done in the ledger.

At the end, one fresh reviewer (subagent with clean context) reviews the whole branch against the spec with the two-axis review in [risk-and-review.md](risk-and-review.md) (no commits: `git add -N <new files>`, then review `git diff HEAD -- <changed paths>`). Fix, re-verify, then finish the branch ([delivery.md](delivery.md)).

## Subagent-driven execution

Per task, sequentially (tasks never run in parallel on the same branch; implementers never spawn subagents):

1. **Record BASE** (current commit).
2. **Dispatch the implementer** with a task brief: the absolute workspace path and branch (use absolute paths / `git -C <path>`), the task text from the plan, the relevant spec excerpt, interfaces it consumes/produces, files to touch, the verification command, whether to commit (if not: leave changes unstaged; the orchestrator stages after review), and the reply contract: "You are a task implementer. Apply only red → green → refactor and the task's verification command. No discovery, plan, branch, merge, reviewer, or subagents. Do not write report files. Reply with first line `STATUS: DONE | DONE_WITH_CONCERNS | NEEDS_CONTEXT | BLOCKED`, then files changed, commands run with results, concerns." Only the context this task needs — never the whole session history.
3. **Read the reply.** Its first line is the status:
   - `DONE` → review.
   - `DONE_WITH_CONCERNS` → read concerns; decide (record a ruling) before review.
   - `NEEDS_CONTEXT` → supply it and re-dispatch.
   - `BLOCKED` → resolve the blocker or escalate to the human.
4. **Dispatch the reviewer** (fresh context) with the task brief, spec excerpt, and the diff `BASE..HEAD` (no commits: `git add -N <new files>`, then `git diff -- <task paths>`; stage the task's paths only after both verdicts pass). Two verdicts required:
   - **Spec:** does it implement exactly what the task and spec require — nothing missing, nothing extra?
   - **Quality:** standards, tests that would fail on a wrong implementation, no weakened gates.
   The implementer's self-review does not replace this.
5. **Fix loop** on spec failures or blocking/important findings (severity as in [risk-and-review.md](risk-and-review.md)): implementer fixes, reviewer re-reviews only the fix scope. After 3 rounds: an important finding → park it with a recorded ruling and tell the human in the final report; a spec failure or blocking finding (security, data, money) → stop this task and its dependents and escalate.
6. **Log** completion in the ledger.

After all tasks: whole-branch review (most capable model), one fix wave, re-review of the fix scope, full test suite, then [delivery.md](delivery.md).

## Model selection

Use the cheapest model that reliably handles each role, and **set it explicitly** when the host allows — an omitted model inherits the session's, often the most expensive. Use the costliest tier only with approval. When proposing subagent-driven mode, state the expected subagent count (2 per task + 1) and that its approval covers the most-capable tier for the final review.

| Role | Model tier |
|---|---|
| Mechanical tasks (rename, wiring, boilerplate with tests specified) | fast/small |
| Integration and typical feature tasks | standard |
| Task reviewers | at least standard |
| Architecture-heavy tasks, final whole-branch review | most capable |

## Autonomy rules

Once execution is approved, do not pause between tasks to ask whether to continue. Make decisions, record each as a ledger **ruling** with rationale and risk, and keep going.

Stop and ask only for:
1. Irreversible or destructive operations (deleting data, destructive migrations, force-push).
2. Security-sensitive actions (credentials, permissions, auth changes beyond the plan).
3. External side effects (merge, push, publish, deploy, messages to others).
4. A plan so broken that every path forward is a guess.
5. A business decision the spec does not settle that changes money, data, or permissions.

## Rationalizations

| Excuse | Reality |
|---|---|
| "Close enough to the spec" | Spec failures are failures; fix or record a ruling. |
| "The fix was small, no re-review needed" | Small fixes break things; re-review the fix scope. |
| "Reviews slow things down" | A shipped defect costs more than a review. |
| "I'll update the ledger at the end" | Compaction loses it; update per task. |
| "The implementer said DONE" | A report is not evidence; the diff and tests are. |
| "Let me run two tasks in parallel to save time" | Same-branch parallel edits conflict; run sequentially. |
