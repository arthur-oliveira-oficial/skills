# Prompts, skills, and agents

How to write instructions for AI models (system prompts, skills, `AGENTS.md`/`CLAUDE.md`) and orchestrate subagents. Based on Anthropic's official prompting and skill-authoring best practices.

## Contents
- Prompt principles
- Structure
- Examples (few-shot)
- Agentic behavior
- Writing skills
- AGENTS.md / CLAUDE.md
- Subagents
- Evaluate and iterate

## Prompt principles

- **Clear and direct.** Treat the model as a brilliant colleague who just arrived and doesn't know your norms. Test: could a colleague with little context follow it? If not, the model can't either.
- **Explain why.** "Never use ellipses" is worse than "the response will be read by a text-to-speech engine, so don't use ellipses". The model generalizes from the reason.
- **Be specific about output:** format, length, audience, constraints. If you want more than the minimum, ask for it explicitly.
- **Numbered steps** when order or completeness matters.
- **Say what to do**, not only what to avoid.
- **Concise.** Include only context the model lacks. Every paragraph must justify its token cost.
- **No information that goes stale** ("before August 2025…"); use an old-patterns section if needed.
- **Consistent terminology:** one term per concept.

## Structure

- Separate content types with descriptive, consistent XML tags: `<instructions>`, `<context>`, `<documents>`, `<examples>`, `<input>`.
- Nest when there is hierarchy (`<documents><document index="1">…`).
- Long documents at the top, question/instruction at the end.
- A role in the system prompt when useful ("You are a security reviewer for payment APIs…").
- For rigid outputs (JSON, standardized reports), give an exact template; for flexible outputs, a "sensible default, adapt as needed" template.

## Examples (few-shot)

3 to 5 examples that are **relevant** (mirror the real case), **diverse** (cover edges and don't induce accidental patterns), and **tagged** (`<example>` inside `<examples>`). Input/output examples convey style and level of detail better than descriptions.

## Agentic behavior

Useful snippets for coding-agent prompts:

- **Investigate before answering:** "Never speculate about code you have not opened. If the user references a file, read it before answering."
- **Avoid over-engineering:** "Only make changes that are requested or clearly necessary. Don't add features, refactors, docstrings on unchanged code, error handling for impossible scenarios, or abstractions for one-time use."
- **Don't optimize for the test:** "Implement the correct general solution for all valid inputs. Don't hard-code values for test cases. If a test seems wrong, say so instead of working around it."
- **Reversibility:** "Local, reversible actions (editing files, running tests) are fine. Before actions that are hard to undo, affect shared systems, or are destructive, ask."
- **Parallel tools:** "Independent calls should be made in parallel."
- **Temporary files:** "Remove scripts and helper files created for iteration at the end."
- **State in long tasks:** record progress in structured files (e.g., `progress.md`, `tests.json`) and use git as a log/checkpoint; when resuming, read the state before acting.

Tune **emphasis** to the model: current models follow instructions precisely; excessive ALL CAPS and "CRITICAL" cause over-application. Use normal language and reserve emphasis for what truly matters.

## Writing skills

Structure:

```
skill-name/
├── SKILL.md          # overview and routing (< 500 lines)
├── references/       # details loaded on demand
└── scripts/          # utilities that are executed, not read
```

Frontmatter:
- `name`: up to 64 characters, lowercase letters, numbers, and hyphens; no `anthropic`/`claude`.
- `description`: up to 1024 characters, **third person**, with concrete trigger terms. It decides whether the skill activates among dozens of others. Say **what it does in one short sentence, then when to use it** (triggers, symptoms, file types, error messages, tool names). Do **not** summarize the workflow or rules in the description: agents may follow the summary instead of reading the skill.

Best practices:
- **Progressive disclosure:** `SKILL.md` acts as an index; details live in reference files linked **one level** deep (no chained references).
- Reference files over 100 lines start with a table of contents.
- **Degrees of freedom** by fragility: general instructions for tasks with several valid approaches; exact scripts for fragile operations (migrations, binary formats).
- Offer **one default** with an escape hatch, not five alternatives.
- Workflows with a copyable checklist and **feedback loops** (validate → fix → repeat).
- Scripts handle errors instead of punting to the model; constants are justified; make clear whether a script should be **executed** or **read**.
- Descriptive file names; forward slashes; MCP tools with qualified names (`Server:tool`).
- Don't assume packages are installed; list dependencies.

## AGENTS.md / CLAUDE.md

Persistent repository context for agents. Include only what isn't obvious from the code:

- exact build, test, lint, and typecheck commands, and how to run a single test
- non-obvious conventions and architecture decisions (linking to ADRs)
- known pitfalls, fragile areas, what **not** to do
- expected workflow (branches, commits, PRs)

Short, factual, up to date. Avoid repeating the README or explaining what the code already shows.

## Subagents

- Delegate **independent, parallelizable** work or broad reading where you only need the conclusion. Tasks of a few calls are done directly.
- The subagent's prompt is all the context it will have: goal, what's already ruled out, relevant files, narrow scope, and return format (e.g., "report < 400 words with file:line").
- For independent review, hand over the **code and the contract**, not your conclusion — or it tends to confirm it.
- Verify the result (diff, tests); a subagent's success report is not evidence.
- Chained self-correction pattern: draft → review against criteria → refine, each step inspectable.

## Test-driven skills

Treat writing a skill (or a CLAUDE.md rule, or a system prompt) as TDD for process documentation. The rule: **no skill without a failing test first** — this applies to edits as well.

1. **Red — baseline:** run realistic scenarios with fresh subagents **without** the skill. Record the choices, the rationalizations verbatim, and which pressures caused violations.
2. **Green — minimal skill:** write only what addresses the observed failures. Re-run the same scenarios with the skill and confirm compliance.
3. **Refactor — close loopholes:** each new rationalization gets an explicit counter (a row in a rationalization table, a red flag); re-test until it holds.

Match the fix to the failure:

| Observed failure | Fix |
|---|---|
| Rule broken under pressure | explicit prohibition + rationalization table + red flags (soft "prefer/consider" fails here) |
| Wrong output shape | positive recipe/template stating what the output contains |
| Missing element | required field in the template |
| Behavior should depend on a condition | conditional tied to an observable check |

Avoid nuance clauses and exemptions ("unless it seems unnecessary") — they reopen the negotiation.

Test by skill type:
- **Discipline** (TDD, verification): combine pressures — time ("urgent"), sunk cost ("already wrote it"), fatigue, authority — and check compliance under the worst combination.
- **Technique** (debugging method): new scenarios and edge cases.
- **Pattern** (architecture style): recognition, application, and cases where it does **not** apply.
- **Reference** (API, spec): retrieval, correct application, coverage gaps.

Compare wording variants against a no-guidance control with several runs each (≥ 5), reading flagged outputs manually. Test one skill at a time before writing the next.

## Evaluate and iterate

- Before writing much, run the model **without** the skill/prompt on representative tasks and note real failures.
- Create at least 3 evaluation scenarios with expected behavior.
- Write the minimum that fixes the failures; compare against the baseline.
- Observe real usage: files never read, ignored references, forgotten rules → reorganize, make more visible, or remove.
- Test on the models you'll use (smaller models may need more guidance).
