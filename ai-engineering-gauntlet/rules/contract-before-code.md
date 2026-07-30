---
title: Define Behavior Before Code
impact: CRITICAL
tags: ai-coding, quality, verification
---

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
