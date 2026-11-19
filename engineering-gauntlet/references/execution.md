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

Recommend one mode with a reason (task coupling, task count, cost of a mistake) and wait for approval unless the user already chose.

## Setup: isolated workspace and baseline

1. Do not start feature work on `main`/`master` without explicit consent. Create a branch, or a git worktree for parallel or long work:
   ```bash
   git worktree add .worktrees/<feature-slug> -b <feature-slug>
   ```
   Ensure `.worktrees/` is git-ignored.
2. Install dependencies and run the full test suite to record a **clean baseline**. Pre-existing failures are reported before any change, so they are not blamed on the work.
3. Read the plan and the linked spec/contract. When they conflict, the spec wins; scan for conflicts before task 1 and resolve or ask.

## Ledger

Conversation memory does not survive compaction or a new session. Keep a per-plan ledger file next to the plan (e.g., `docs/plan-implementation/<feature-slug>-ledger.md`):

```markdown
# Ledger: <feature>
Base commit: <sha>

| Task | Status | Commit | Review | Notes |
|---|---|---|---|---|
| TASK-01.1 | done | a1b2c3d | spec ✅ quality ✅ | |
| TASK-01.2 | in progress | | | |

## Rulings
- R1 (TASK-01.2): chose cursor pagination over offset — spec silent; offset breaks on inserts. Risk: low.
```

After compaction or resuming, trust the ledger and `git log`, not memory.

## Inline execution

For each task, in plan order:
1. Mark it in progress in the ledger.
2. Red → green → refactor ([contract-and-tdd.md](contract-and-tdd.md)).
3. Run the task's verification command; commit with a message referencing the task ID.
4. Mark done in the ledger.

At the end, one fresh reviewer (subagent with clean context) reviews the whole branch against the spec with the two-axis review in [risk-and-review.md](risk-and-review.md). Fix, re-verify, then finish the branch ([delivery.md](delivery.md)).

## Subagent-driven execution

Per task, sequentially (tasks never run in parallel on the same branch; implementers never spawn subagents):

1. **Record BASE** (current commit).
2. **Dispatch the implementer** with a task brief: the task text from the plan, the relevant spec excerpt, interfaces it consumes/produces, files to touch, the verification command, and where to write its report. Only the context this task needs — never the whole session history.
3. **Read the report.** Status is one of:
   - `DONE` → review.
   - `DONE_WITH_CONCERNS` → read concerns; decide (record a ruling) before review.
   - `NEEDS_CONTEXT` → supply it and re-dispatch.
   - `BLOCKED` → resolve the blocker or escalate to the human.
4. **Dispatch the reviewer** (fresh context) with the task brief, spec excerpt, and the diff `BASE..HEAD`. Two verdicts required:
   - **Spec:** does it implement exactly what the task and spec require — nothing missing, nothing extra?
   - **Quality:** standards, tests that would fail on a wrong implementation, no weakened gates.
   The implementer's self-review does not replace this.
5. **Fix loop** on spec failures or Critical/Important findings: implementer fixes, reviewer re-reviews only the fix scope. After 3 rounds, park the finding with a recorded ruling and tell the human in the final report.
6. **Log** completion in the ledger.

After all tasks: whole-branch review (most capable model), one fix wave, full test suite, then [delivery.md](delivery.md).

## Model selection

Use the cheapest model that reliably handles each role, and **set it explicitly** — an omitted model inherits the session's, often the most expensive:

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

## Rationalizations

| Excuse | Reality |
|---|---|
| "Close enough to the spec" | Spec failures are failures; fix or record a ruling. |
| "The fix was small, no re-review needed" | Small fixes break things; re-review the fix scope. |
| "Reviews slow things down" | A shipped defect costs more than a review. |
| "I'll update the ledger at the end" | Compaction loses it; update per task. |
| "The implementer said DONE" | A report is not evidence; the diff and tests are. |
| "Let me run two tasks in parallel to save time" | Same-branch parallel edits conflict; run sequentially. |
