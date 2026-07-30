---
title: Record System Invariants
impact: CRITICAL
tags: ai-coding, quality, verification
---

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
