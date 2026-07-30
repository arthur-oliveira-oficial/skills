---
name: ai-engineering-gauntlet
description: Evidence-driven AI coding practices inspired by Robert C. Martin's specification-first, TDD, architecture, metrics, mutation testing, and adversarial verification workflow. Use when planning, implementing, reviewing, or refactoring software with AI agents, especially when correctness must be demonstrated rather than assumed.
license: MIT
metadata:
  author: community
  version: "1.0.0"
---

# AI Engineering Gauntlet

A compact guide for using AI to produce software inside explicit behavioral, architectural, and quality constraints. The human owns intent and acceptance. The AI may generate and refactor code, but completion requires reproducible evidence.

## When to Apply

Reference these guidelines when:
- Implementing a feature or bug fix with an AI coding agent
- Refactoring AI-generated code
- Reviewing a pull request produced substantially by AI
- Designing agent workflows for medium- or high-risk changes
- Establishing quality gates for an existing repository

## Rule Categories by Priority

| Priority | Category | Impact | Prefix |
|---|---|---|---|
| 1 | Behavioral Contract | CRITICAL | `contract-` |
| 2 | Test-Driven Delivery | CRITICAL | `tdd-` |
| 3 | Verification Gauntlet | CRITICAL | `verify-` |
| 4 | Architecture Control | HIGH | `architecture-` |
| 5 | Risk and Human Control | HIGH | `risk-` |
| 6 | Agent Collaboration | MEDIUM-HIGH | `agent-` |
| 7 | Evidence and Reporting | MEDIUM | `evidence-` |

## Quick Reference

### 1. Behavioral Contract (CRITICAL)
- `contract-before-code` - Define observable behavior before implementation
- `contract-gherkin-examples` - Express important flows as executable examples
- `contract-invariants` - Record properties that must remain true

### 2. Test-Driven Delivery (CRITICAL)
- `tdd-red-green-refactor` - Require a failing test before implementation
- `tdd-small-slices` - Deliver one behavior slice at a time
- `tdd-regression-first` - Reproduce bugs with a test before fixing them

### 3. Verification Gauntlet (CRITICAL)
- `verify-overlapping-tests` - Use independent test layers for different failure modes
- `verify-mutation-testing` - Test whether the tests detect plausible faults
- `verify-no-weakened-gates` - Never lower thresholds to make a change pass

### 4. Architecture Control (HIGH)
- `architecture-boundaries` - Encode dependency and module boundaries as checks
- `architecture-complexity-budget` - Set explicit size and complexity budgets

### 5. Risk and Human Control (HIGH)
- `risk-classify-first` - Match verification depth to change risk
- `risk-human-review` - Require targeted human review for high-impact code

### 6. Agent Collaboration (MEDIUM-HIGH)
- `agent-separate-roles` - Separate specification, coding, critique, and verification
- `agent-adversarial-review` - Assign an independent agent to search for omissions

### 7. Evidence and Reporting (MEDIUM)
- `evidence-command-results` - Report commands, exit codes, and skipped checks
- `evidence-residual-risk` - State what remains uncertain after verification

## How to Use

Read individual rule files for detailed guidance and examples:

```
rules/contract-before-code.md
rules/tdd-red-green-refactor.md
rules/verify-mutation-testing.md
```

Each rule contains:
- Why the rule matters
- An incorrect workflow
- A correct workflow
- Practical acceptance criteria

## Full Compiled Document

For the complete guide with every rule expanded, read `AGENTS.md`.

# Expanded Rules

---

<!-- Source: rules/agent-adversarial-review.md -->

## Perform Adversarial Review

Ask an independent reviewer to search specifically for missing requirements, weak tests, security gaps, race conditions, and architectural drift.

**Incorrect workflow:**

Requesting a generic "review this code" from the same context that produced it.

**Correct workflow:**

Provide the contract and diff to a fresh reviewer with an explicit attack checklist.

**Acceptance criteria:**

- Reviewer searches for omissions
- Findings map to contract or risks
- Unresolved findings are reported

---

<!-- Source: rules/agent-separate-roles.md -->

## Separate Agent Responsibilities

Use distinct roles or isolated sessions for specification, implementation, testing, architecture, and verification when risk justifies it.

**Incorrect workflow:**

Having one agent create requirements, code, tests, and final approval without independent challenge.

**Correct workflow:**

Give each role a narrow objective and require artifacts that another role can inspect.

**Acceptance criteria:**

- Roles have distinct outputs
- Verifier is not the sole implementer
- Shared constraints are consistent

---

<!-- Source: rules/architecture-boundaries.md -->

## Encode Architecture Boundaries

Turn allowed dependencies, layer direction, module ownership, and public API constraints into executable checks.

**Incorrect workflow:**

Relying on an architecture diagram that CI never validates.

**Correct workflow:**

Use import rules, dependency tests, API checks, or custom fitness functions to reject violations.

**Acceptance criteria:**

- Allowed dependency direction is explicit
- Violations fail automatically
- New exceptions require rationale

---

<!-- Source: rules/architecture-complexity-budget.md -->

## Maintain Complexity Budgets

Define limits for function size, module size, cyclomatic complexity, coupling, or other relevant structural metrics.

**Incorrect workflow:**

Allowing AI to satisfy tests with increasingly tangled code.

**Correct workflow:**

Measure changed code and refactor when budgets regress or limits are exceeded.

**Acceptance criteria:**

- Budgets are repository-specific
- Regressions are visible
- Exceptions are documented and temporary

---

<!-- Source: rules/contract-before-code.md -->

## Define Behavior Before Code

Write an explicit change contract before editing production code. Include scope, non-goals, observable outcomes, failure behavior, and compatibility constraints.

**Incorrect workflow:**

Starting implementation from a vague request and discovering requirements while changing code.

**Correct workflow:**

Create a short contract first, review ambiguities, then implement only behavior covered by that contract.

**Acceptance criteria:**

- Observable outcomes are stated
- Non-goals are explicit
- Failure behavior is defined
- Compatibility constraints are recorded

---

<!-- Source: rules/contract-gherkin-examples.md -->

## Use Executable Behavioral Examples

Represent important user and system flows with Given/When/Then examples that can become acceptance tests.

**Incorrect workflow:**

Describing a feature only with abstract prose such as "support cancellation correctly."

**Correct workflow:**

Write concrete examples for success, failure, repetition, boundaries, and authorization.

**Acceptance criteria:**

- At least one happy path exists
- Important failure paths exist
- Examples use domain language
- Scenarios are automatable

---

<!-- Source: rules/contract-invariants.md -->

## Record System Invariants

Identify properties that must always remain true across inputs, retries, concurrency, and refactoring.

**Incorrect workflow:**

Testing only a few examples while leaving core business properties implicit.

**Correct workflow:**

State invariants such as idempotency, conservation, authorization, ordering, or uniqueness and test them directly.

**Acceptance criteria:**

- Core invariants are listed
- Each invariant has a verification method
- Concurrency and retry behavior are considered

---

<!-- Source: rules/evidence-command-results.md -->

## Report Reproducible Evidence

Completion reports must list executed commands, outcomes, exit codes, relevant metrics, and checks not run.

**Incorrect workflow:**

Saying "all tests pass" without showing what was executed.

**Correct workflow:**

Produce a compact evidence table tied to repository commands and the current revision.

**Acceptance criteria:**

- Commands are exact
- Failures and skips are visible
- Metrics include scope and tool

---

<!-- Source: rules/evidence-residual-risk.md -->

## State Residual Risk

Explicitly state what verification could not prove, what was not tested, and what assumptions remain.

**Incorrect workflow:**

Presenting a green pipeline as certainty that no defect exists.

**Correct workflow:**

Document remaining uncertainty, operational concerns, and follow-up work.

**Acceptance criteria:**

- Unverified areas are named
- Assumptions are visible
- Operational monitoring needs are stated

---

<!-- Source: rules/risk-classify-first.md -->

## Classify Change Risk First

Classify risk before implementation so the required review and verification depth is known in advance.

**Incorrect workflow:**

Applying the same lightweight process to text changes and payment logic.

**Correct workflow:**

Consider security, money, data loss, migrations, concurrency, public APIs, reversibility, and blast radius.

**Acceptance criteria:**

- Risk level is stated
- Risk drivers are listed
- Required gates follow from risk

---

<!-- Source: rules/risk-human-review.md -->

## Keep Humans on High-Impact Decisions

Require targeted human review for security, authorization, payments, destructive migrations, privacy, concurrency, and irreversible behavior.

**Incorrect workflow:**

Treating automated tests as complete proof for high-impact changes.

**Correct workflow:**

Have a human inspect the contract, threat assumptions, rollback plan, and critical implementation paths.

**Acceptance criteria:**

- Critical paths are identified
- Rollback is considered
- Human approval is recorded for high risk

---

<!-- Source: rules/tdd-red-green-refactor.md -->

## Enforce Red-Green-Refactor

Require evidence that a relevant test failed before implementation, then passed after the smallest code change, followed by refactoring.

**Incorrect workflow:**

Writing implementation and tests together, so the test may never prove it can detect the missing behavior.

**Correct workflow:**

Run the new test before coding, capture the expected failure, implement minimally, rerun, then refactor under green tests.

**Acceptance criteria:**

- A pre-change failure is observed
- The failure is relevant
- The smallest implementation passes
- Refactoring preserves green tests

---

<!-- Source: rules/tdd-regression-first.md -->

## Reproduce Bugs Before Fixing

For bug fixes, first add a test that fails for the reported defect and passes only when the defect is corrected.

**Incorrect workflow:**

Changing code based on a suspected cause without proving the original failure.

**Correct workflow:**

Encode the reported input and expected outcome as a regression test before modifying production behavior.

**Acceptance criteria:**

- The test fails on the original code
- The failure matches the defect
- The test remains after the fix

---

<!-- Source: rules/tdd-small-slices.md -->

## Implement in Small Behavioral Slices

Divide work into independently testable behavior increments instead of generating a large patch at once.

**Incorrect workflow:**

Implementing an entire feature across many modules before running tests.

**Correct workflow:**

Complete one scenario or invariant at a time and run focused checks after each slice.

**Acceptance criteria:**

- Each slice has one primary outcome
- Focused tests run per slice
- The patch remains reviewable

---

<!-- Source: rules/verify-mutation-testing.md -->

## Measure Test Fault Detection

Use mutation testing on important logic to determine whether tests fail when plausible defects are injected.

**Incorrect workflow:**

Assuming high line coverage means tests are effective.

**Correct workflow:**

Run mutation testing on changed or critical modules and investigate surviving mutants.

**Acceptance criteria:**

- Mutation scope is defined
- Surviving mutants are reviewed
- Equivalent mutants are documented
- Critical survivors block completion

---

<!-- Source: rules/verify-no-weakened-gates.md -->

## Never Weaken Gates to Pass

Do not lower thresholds, skip checks, delete assertions, or broaden ignores merely to make AI-generated code pass.

**Incorrect workflow:**

Reducing coverage or lint thresholds after a change fails them.

**Correct workflow:**

Fix the implementation or explicitly escalate the gate as an unresolved project decision.

**Acceptance criteria:**

- Threshold changes are separate decisions
- Skipped checks are reported
- Test assertions are not weakened without rationale

---

<!-- Source: rules/verify-overlapping-tests.md -->

## Use Overlapping Verification Layers

Combine tests that inspect different failure modes: acceptance, unit, integration, property, security, and end-to-end where appropriate.

**Incorrect workflow:**

Relying on one large test suite or coverage percentage as proof of correctness.

**Correct workflow:**

Map each risk to a verification layer and keep layers independent enough to catch different mistakes.

**Acceptance criteria:**

- Behavior is covered at the right boundary
- Important invariants have property tests
- Integrations have boundary tests
- Security-sensitive flows have negative tests
