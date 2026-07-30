---
title: Perform Adversarial Review
impact: MEDIUM-HIGH
tags: ai-coding, quality, verification
---

## Perform Adversarial Review

Ask an independent reviewer to search specifically for missing requirements, weak tests, security gaps, race conditions, and architectural drift.

**Incorrect workflow:**

Requesting a generic “review this code” from the same context that produced it.

**Correct workflow:**

Provide the contract and diff to a fresh reviewer with an explicit attack checklist.

**Acceptance criteria:**

- Reviewer searches for omissions
- Findings map to contract or risks
- Unresolved findings are reported
