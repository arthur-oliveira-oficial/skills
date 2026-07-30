---
title: Enforce Red-Green-Refactor
impact: CRITICAL
tags: ai-coding, quality, verification
---

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
