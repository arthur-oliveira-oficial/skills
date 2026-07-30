---
title: Encode Architecture Boundaries
impact: HIGH
tags: ai-coding, quality, verification
---

## Encode Architecture Boundaries

Turn allowed dependencies, layer direction, module ownership, and public API constraints into executable checks.

**Incorrect workflow:**

Relying on an architecture diagram that CI never validates.

**Correct workflow:**

Use import rules, dependency tests, API checks, or custom fitness functions to reject violations.

**Acceptance criteria:**

- Allowed dependency direction is explicit
- Violations fail automatically
- New exceptions require rationale
