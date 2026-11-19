# Skills

Agent skills for Claude Code, Codex, and other agents that read `SKILL.md`.

| Skill | Use it for |
|---|---|
| [`frontend-engineering`](frontend-engineering/SKILL.md) | Designing, building, auditing, and polishing web UIs: visual direction, UX laws, accessibility (WCAG 2.2 AA) and UX audits, responsive layout (mobile, tablet, desktop), React with Next.js or Vite, Tailwind, with or without shadcn/ui, plain HTML/CSS, `DESIGN.md` design systems, and browser verification. |
| [`engineering-gauntlet`](engineering-gauntlet/SKILL.md) | Evidence-driven engineering with AI agents, end to end: discovery and design gate, risk-scaled gates, behavioral contracts, implementation plans, inline or subagent-driven execution, TDD, systematic debugging, architecture, backend practices (including adding auth to an existing API), risk and review, receiving review and finishing branches, prompt and skill authoring. |

Both skills are written in English and respond in the user's language (default: Brazilian Portuguese), including report headings. Each has a short `SKILL.md` that routes to `references/` files loaded on demand.

## Install

Symlink each skill folder into the agent's skills directory. With symlinks, `git pull` in this repo updates every agent at once.

```bash
# Claude Code (all projects)
ln -s "$PWD/frontend-engineering" ~/.claude/skills/frontend-engineering
ln -s "$PWD/engineering-gauntlet" ~/.claude/skills/engineering-gauntlet

# Codex (all projects)
ln -s "$PWD/frontend-engineering" ~/.codex/skills/frontend-engineering
ln -s "$PWD/engineering-gauntlet" ~/.codex/skills/engineering-gauntlet

# or per project (copies, pinned to this version)
mkdir -p .claude/skills && cp -R frontend-engineering engineering-gauntlet .claude/skills/
```

Restart the agent after installing. Invoke explicitly with `/frontend-engineering` or `/engineering-gauntlet`, or let the agent pick them from their descriptions.

## Optional dependency: agent-browser

Browser verification, UI bug reproduction, and exploratory QA use [agent-browser](https://github.com/vercel-labs/agent-browser) (commands tested on 0.43):

```bash
npm i -g agent-browser && agent-browser install
```

- The skills load the version-matched usage guide with `agent-browser skills get core`, and use the bundled `dogfood` workflow only for multi-page apps or flows.
- Video recording (`record start`) needs **ffmpeg**; without it, the skills fall back to one screenshot per step.
- Without agent-browser, the skills still work and report browser checks as **not verified**.

Verification artifacts (screenshots, videos) use **absolute paths** (`"$PWD/.verification/…"`); a relative `.verification/x.png` is parsed by agent-browser as a CSS selector and saved elsewhere. Implementation work writes them to `.verification/` in the target project (add it to that project's `.gitignore`); audit-only work writes nothing into the project and keeps evidence outside it.

## How the skills were tested

Both skills were exercised with subagents on fixture projects (a money bug fix, a vague "add auth" request, a static pricing page, and a UX/a11y audit of a broken signup form), scored against the skill's own rules, fixed, and re-run. Notable rules that came out of it:

- **engineering-gauntlet:** small/medium/large defined; gates scale with the change, not just the risk level; verified work is committed on a feature branch before merge/PR choices; reports have a **Decisions needed** section; calculation tests must discriminate plausible wrong implementations (floor/ceil/half-even); money rounding is a business decision; manual mutation testing when no tool exists; high-risk work keeps a design approval even when discovery is skipped.
- **frontend-engineering:** dedicated accessibility-audit route; known axe blind spots (placeholder-only labels, clickable `<div>`s, focus visibility, charset); short verification pass for small changes; 200% text-resize check; wait for animations before evidence screenshots; no invented "most popular" badges, annual prices show the total billed, and links to pages that don't exist are reported as open items.

## Versions

- **2.3.1** — Second round from the retest: bug route covers regression/money/mutation, auth design checklist, compliance findings in audits, 200% text check, lighter responsive subset for content pages.
- **2.3.0** — Fixes from behavioral tests: absolute evidence paths, audit-only evidence outside the project, risk proportionality, commit before delivery, discriminating tests.

## Credits

Built on ideas from [obra/superpowers](https://github.com/obra/superpowers), [mattpocock/skills](https://github.com/mattpocock/skills), [anthropics/skills](https://github.com/anthropics/skills), [Vercel Web Interface Guidelines](https://github.com/vercel-labs/web-interface-guidelines), [emilkowalski/skills](https://github.com/emilkowalski/skills), and Anthropic's prompting and skill-authoring guides.
