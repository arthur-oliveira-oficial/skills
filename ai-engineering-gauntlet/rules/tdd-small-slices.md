---
title: Implement in Small Behavioral Slices
impact: CRITICAL
tags: ai-coding, quality, verification
---

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
