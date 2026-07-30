---
title: Report Reproducible Evidence
impact: MEDIUM
tags: ai-coding, quality, verification
---

## Report Reproducible Evidence

Completion reports must list executed commands, outcomes, exit codes, relevant metrics, and checks not run.

**Incorrect workflow:**

Saying “all tests pass” without showing what was executed.

**Correct workflow:**

Produce a compact evidence table tied to repository commands and the current revision.

**Acceptance criteria:**

- Commands are exact
- Failures and skips are visible
- Metrics include scope and tool
