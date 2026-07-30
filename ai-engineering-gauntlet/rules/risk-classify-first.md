---
title: Classify Change Risk First
impact: HIGH
tags: ai-coding, quality, verification
---

## Classify Change Risk First

Classify risk before implementation so the required review and verification depth is known in advance.

**Incorrect workflow:**

Applying the same lightweight process to text changes and payment logic.

**Correct workflow:**

Consider security, money, data loss, migrations, concurrency, public APIs, reversibility, and blast radius.

**Acceptance criteria:**

- Risk level is stated
- Risk drivers are listed
- Required gates follow from risk
