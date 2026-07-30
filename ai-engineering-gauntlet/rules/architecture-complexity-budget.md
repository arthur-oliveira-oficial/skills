---
title: Maintain Complexity Budgets
impact: HIGH
tags: ai-coding, quality, verification
---

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
