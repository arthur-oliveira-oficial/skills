# Behavioral contract and TDD

## Contents
- Contract before code
- Executable examples (Given/When/Then)
- Invariants
- Red → Green → Refactor
- Small slices
- Regression first (bugs)
- Common rationalizations
- No test infrastructure
- When not to force TDD

## Contract before code

Write a short change contract before editing production code:

- **Scope** and explicit **non-goals**.
- **Observable outcomes** (external inputs/outputs, persisted effects, emitted events).
- **Failure behavior** (validation, rejection, dependency error, timeout).
- **Compatibility constraints** (public APIs, persisted formats, older clients).

Review ambiguities, then implement **only** the behavior the contract covers.

Avoid: starting from a vague request and discovering requirements while changing code.
Prefer: short contract → review ambiguities → implement.

## Executable examples

Important flows as Given/When/Then examples that become acceptance tests. Cover success, failure, repetition, boundaries, and authorization, in domain language.

```gherkin
Scenario: cancel an order that has already shipped
  Given an order with status "shipped"
  When the customer requests cancellation
  Then the request is rejected with "ORDER_ALREADY_SHIPPED"
  And the status remains "shipped"
```

Avoid: "Support cancellation correctly."
Prefer: concrete examples for the happy path, important failures, repetition, and permissions.

## Invariants

Properties that must always hold — across inputs, retries, concurrency, and refactoring. Examples: idempotency, conservation (total balance constant across a transfer), authorization (users only see their own data), ordering, uniqueness.

Each invariant has a **verification method** (property test, database constraint, concurrency test, runtime assertion). Explicitly consider retries and concurrency.

## Red → Green → Refactor

1. **Red:** write a minimal test for one behavior. **Run it** and confirm it fails **for the expected reason** (not an import or syntax error).
2. **Green:** write the smallest code that makes it pass. Run again.
3. **Refactor:** clean up without adding behavior, keeping everything green.

Good tests: one behavior each; descriptive name; use real code; mocks only at unavoidable boundaries (network, clock, randomness, external services); verify through the same interface callers use. Tests that spawn processes or servers set a timeout and a non-default port from the first red run.

A test that passes on the first run hasn't proven it detects the missing behavior. Investigate. This includes tests added **after** the code is green (to pin a policy or close a review gap), or guard tests expected to pass on the unfixed code: show each one failing against a plausible wrong implementation (a targeted mutant) before counting it as evidence.

**Discriminating tests for calculations.** For arithmetic, rounding, dates, and boundaries, list the plausible wrong implementations (floor vs. round vs. ceil, half-up vs. half-even, rounding per line item vs. once on the total, `<` vs. `<=`, inclusive vs. exclusive ranges, time zones) and pick inputs where each one gives a different result from the chosen rule. A test that passes for two different rules does not pin the behavior.

**Money.** Work in integer minor units (cents) and integer rates (basis points) where possible. Floating-point `amount * percent / 100` can land just below a `.5` half-case (`1500 * 33.3 / 100` → `499.49999999999994`), so rounding goes the wrong way; prefer integer arithmetic (`Math.round(amount * bps / 10000)` with integer `bps`, or a decimal library) and test a half-case. Any fix that changes amounts charged forces a rounding policy (nearest/half-up, half-even, truncate, in whose favor): that is a business decision unless the project already defines it. State it explicitly and test it. If a human is reachable, ask before implementing (one question, with your proposed default); otherwise follow the no-human rule in [discovery.md](discovery.md) (most conservative policy, under **Decisions needed**). `Math.round` rounds halves toward +infinity: for negative amounts (refunds) compute on the absolute value and reapply the sign, and test a negative half-case. Check that the amount **displayed** (formatters, receipts, emails) equals the amount **charged** for the same inputs; a mismatch is a bug even when each path is "correct". Keep the public signature: convert the rate to integer basis points inside the function. Only a change to the signature itself goes under **Decisions needed**. With `ceil`/`floor`, float noise just above or below an integer moves a whole cent (`375 * 8.8 / 100` → `33.000000000000004`, `ceil` → 34): test a fractional rate with no exact binary form. Before fixing, establish the rate's domain (integer only? how many decimals?) from the repo, else ask together with the rounding question; reject out-of-domain rates rather than rounding them silently.

## Small slices

Split work into independently testable behavior increments instead of one huge patch. Prefer **vertical slices** (one end-to-end scenario) over horizontal phases ("all the database, then all the API").

- Each slice has one primary outcome.
- Focused tests run for every slice.
- The patch stays reviewable.

## Regression first (bugs)

1. Encode the reported input and expected outcome as a test.
2. Run it on the original code: it **must fail**, and the failure must match the defect.
3. Fix.
4. The test passes and stays in the suite.

The red run before the fix is the proof; keep its output. To re-prove later: `git diff -- <fix files> > <scratch>/fix.patch && git apply -R <scratch>/fix.patch`, run the test (must fail), `git apply <scratch>/fix.patch`. Never `git checkout`/`stash` an uncommitted fix.

## Common rationalizations

| Excuse | Reality |
|---|---|
| "Too simple to test" | Simple code breaks; the test takes seconds. |
| "I'll test after" | A test written afterward passes immediately and never proves it catches the bug. It confirms what the code does, not what it should do. |
| "I already tested manually" | Manual testing is ad hoc, unrepeatable, and skips cases. |
| "Deleting working code is wasteful" | The time is already spent; keeping untrusted code costs more. |
| "I need to explore first" | Fine — but throw away the exploration and restart with a test. |
| "It's hard to test" | A sign of a bad interface. Improve the design. |
| "The existing code has no tests" | Add tests to the code you are changing (no infrastructure: next section). |

## No test infrastructure

Use the runtime's zero-dependency runner if one exists (`node --test`, `python -m unittest`, `go test`, `cargo test`) and add the test next to the code. Otherwise a reproduction script in the host scratch directory, shown failing then passing, with test tooling proposed under **Decisions needed**. Never add a test dependency unasked. In discovery, state this choice in the design.

## When not to force TDD

Throwaway prototypes, generated code, configuration files, visual/styling changes, and trivial text changes can skip the ceremony — **with the human's approval** in non-obvious cases. The behavior must still be verifiable somehow (build, execution, screenshot; for visual changes, browser evidence).
