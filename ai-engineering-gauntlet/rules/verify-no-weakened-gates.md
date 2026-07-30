---
title: Never Weaken Gates to Pass
impact: CRITICAL
tags: ai-coding, quality, verification
---

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
