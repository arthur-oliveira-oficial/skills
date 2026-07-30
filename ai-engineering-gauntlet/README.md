# AI Engineering Gauntlet Skill

A portable agent skill for evidence-driven AI software development. It follows the same compact layout used by Vercel's agent skills: one skill index, atomic rule files, and one compiled agent document.

## Structure

```text
ai-engineering-gauntlet/
├── SKILL.md
├── AGENTS.md
├── README.md
├── LICENSE
└── rules/
    ├── contract-before-code.md
    ├── tdd-red-green-refactor.md
    └── ...
```

## Install

Copy the entire folder into the skills directory used by your agent, for example:

```text
.agents/skills/ai-engineering-gauntlet/
```

Then ask the agent:

```text
Use the AI Engineering Gauntlet skill for this change. Define the behavioral contract, classify risk, work in red-green-refactor slices, enforce architecture and quality gates, perform adversarial review when appropriate, and finish with reproducible evidence and residual risks.
```
