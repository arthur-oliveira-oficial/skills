---
title: Reproduce Bugs Before Fixing
impact: CRITICAL
tags: ai-coding, quality, verification
---

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
