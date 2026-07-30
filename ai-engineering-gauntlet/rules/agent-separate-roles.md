---
title: Separate Agent Responsibilities
impact: MEDIUM-HIGH
tags: ai-coding, quality, verification
---

## Separate Agent Responsibilities

Use distinct roles or isolated sessions for specification, implementation, testing, architecture, and verification when risk justifies it.

**Incorrect workflow:**

Having one agent create requirements, code, tests, and final approval without independent challenge.

**Correct workflow:**

Give each role a narrow objective and require artifacts that another role can inspect.

**Acceptance criteria:**

- Roles have distinct outputs
- Verifier is not the sole implementer
- Shared constraints are consistent
