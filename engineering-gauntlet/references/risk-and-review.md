# Risk and review

## Contents
- Classify risk first
- Human review for high impact
- Separate agent roles
- Adversarial review
- Two-axis code review

## Classify risk first

Before implementing, set the level and the gates. Factors:

| Factor | Question |
|---|---|
| Security/privacy | Does it touch auth, authorization, secrets, personal data? |
| Money | Billing, payments, balances, prices? |
| Data | Can it lose or corrupt data? Is there a migration? |
| Concurrency | Retries, parallel jobs, race conditions? |
| Public contract | Does it change an API, event, schema, or persisted format? |
| Reversibility | Can a deploy undo it? Does it need a backfill? |
| Blast radius | How many users/systems are affected if it fails? |

Criteria: level stated; factors listed; gates derived from the level (table in `SKILL.md`).

❌ The same lightweight process for changing a label and for payment logic.

**Proportionality.** The level picks which gates apply; the size of the change decides how heavy each one is. A one-line fix in billing is high risk: it still gets invariant tests, a mutation check on the changed expression, an independent review, and human approval, but the rollback plan is one line and the review is focused on that expression. Never drop a gate silently; if one cannot run (no tool, no human), report it under **Not verified** or **Decisions needed**.

## Human review for high impact

Require targeted human review for: security, authorization, payments, destructive migrations, privacy, concurrency, and irreversible behavior. The human inspects the contract, threat assumptions, rollback plan, and critical paths — not the whole diff generically.

- Critical paths identified in the report.
- Rollback considered.
- Human approval recorded for high risk.

Automated tests are not complete proof for high-impact changes.

## Separate agent roles

When risk justifies it, use separate roles or isolated sessions: specification, implementation, testing, architecture, and verification. Each role has a narrow objective and produces artifacts another role can inspect.

- Distinct outputs per role.
- The verifier is not the sole implementer.
- Shared constraints are consistent across roles.

## Adversarial review

An independent reviewer (clean context) receives **contract + diff** and an attack checklist — not "review this code":

- missing or partially met requirements
- incorrect assumptions
- security/authorization gaps
- data-integrity failures
- race conditions and idempotency
- compatibility breaks
- weak tests (would they pass with the wrong implementation?)
- unhandled error paths
- scope that shouldn't be in the change

Findings map to the contract or risks; unresolved ones are reported. Don't hand your conclusion to the reviewer — it tends to confirm it.

## Two-axis code review

Review the diff against a fixed point (`git diff <base>...HEAD`) along two independent axes, without merging or re-ranking across them:

**Standards** — does the code follow documented conventions (`CONTRIBUTING.md`, `AGENTS.md`, style guides)? Documented violations are definite. Code smells are judgment calls, labeled as such ("possible Feature Envy"). Reference smells: Long Function, Long Parameter List, Duplicated Code, Feature Envy, Data Clumps, Primitive Obsession, Shotgun Surgery, Divergent Change, Speculative Generality, Message Chains, Middle Man, Mysterious Name.

**Spec** — does it implement what the issue/spec asked for? Missing or partial requirements, scope creep, implementation that looks wrong.

Keeping them separate stops one axis from masking the other: code can follow every standard and implement the wrong thing.

Additional checklist (only what's relevant): business rules; invariants; types and input validation; authorization; data integrity/migrations; concurrency; error handling; performance; test quality; observability and sensitive-data leaks in logs; compatibility; rollout/rollback; cleanup of flags and temporary code; accidental weakening of gates.

Format: findings with file:line, violated rule/requirement, concrete failure scenario, severity (blocking / important / suggestion).
