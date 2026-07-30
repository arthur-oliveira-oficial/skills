---
title: Measure Test Fault Detection
impact: CRITICAL
tags: ai-coding, quality, verification
---

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
