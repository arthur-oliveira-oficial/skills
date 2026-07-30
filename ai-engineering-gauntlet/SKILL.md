---
name: ai-engineering-gauntlet
description: Evidence-driven AI coding practices inspired by Robert C. Martin's specification-first, TDD, architecture, metrics, mutation testing, and adversarial verification workflow. Use when planning, implementing, reviewing, or refactoring software with AI agents, especially when correctness must be demonstrated rather than assumed.
license: MIT
metadata:
  author: community
  version: "1.0.0"
---

# AI Engineering Gauntlet

A compact guide for using AI to produce software inside explicit behavioral, architectural, and quality constraints. The human owns intent and acceptance. The AI may generate and refactor code, but completion requires reproducible evidence.

## When to Apply

Reference these guidelines when:
- Implementing a feature or bug fix with an AI coding agent
- Refactoring AI-generated code
- Reviewing a pull request produced substantially by AI
- Designing agent workflows for medium- or high-risk changes
- Establishing quality gates for an existing repository

## Rule Categories by Priority

| Priority | Category | Impact | Prefix |
|---|---|---|---|
| 1 | Behavioral Contract | CRITICAL | `contract-` |
| 2 | Test-Driven Delivery | CRITICAL | `tdd-` |
| 3 | Verification Gauntlet | CRITICAL | `verify-` |
| 4 | Architecture Control | HIGH | `architecture-` |
| 5 | Risk and Human Control | HIGH | `risk-` |
| 6 | Agent Collaboration | MEDIUM-HIGH | `agent-` |
| 7 | Evidence and Reporting | MEDIUM | `evidence-` |

## Quick Reference

### 1. Behavioral Contract (CRITICAL)
- `contract-before-code` - Define observable behavior before implementation
- `contract-gherkin-examples` - Express important flows as executable examples
- `contract-invariants` - Record properties that must remain true

### 2. Test-Driven Delivery (CRITICAL)
- `tdd-red-green-refactor` - Require a failing test before implementation
- `tdd-small-slices` - Deliver one behavior slice at a time
- `tdd-regression-first` - Reproduce bugs with a test before fixing them

### 3. Verification Gauntlet (CRITICAL)
- `verify-overlapping-tests` - Use independent test layers for different failure modes
- `verify-mutation-testing` - Test whether the tests detect plausible faults
- `verify-no-weakened-gates` - Never lower thresholds to make a change pass

### 4. Architecture Control (HIGH)
- `architecture-boundaries` - Encode dependency and module boundaries as checks
- `architecture-complexity-budget` - Set explicit size and complexity budgets

### 5. Risk and Human Control (HIGH)
- `risk-classify-first` - Match verification depth to change risk
- `risk-human-review` - Require targeted human review for high-impact code

### 6. Agent Collaboration (MEDIUM-HIGH)
- `agent-separate-roles` - Separate specification, coding, critique, and verification
- `agent-adversarial-review` - Assign an independent agent to search for omissions

### 7. Evidence and Reporting (MEDIUM)
- `evidence-command-results` - Report commands, exit codes, and skipped checks
- `evidence-residual-risk` - State what remains uncertain after verification

## How to Use

Read individual rule files for detailed guidance and examples:

```
rules/contract-before-code.md
rules/tdd-red-green-refactor.md
rules/verify-mutation-testing.md
```

Each rule contains:
- Why the rule matters
- An incorrect workflow
- A correct workflow
- Practical acceptance criteria

## Full Compiled Document

For the complete guide with every rule expanded, read `AGENTS.md`.
