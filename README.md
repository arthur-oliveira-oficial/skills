# Skills

Agent skills for Claude Code, Codex, and other agents that read `SKILL.md`.

| Skill | Use it for |
|---|---|
| [`frontend-engineering`](frontend-engineering/SKILL.md) | Designing, building, auditing, and polishing web UIs: visual direction, UX laws, accessibility (WCAG 2.2 AA) and UX audits, responsive layout (mobile, tablet, desktop), React with Next.js or Vite, Tailwind, with or without shadcn/ui, plain HTML/CSS, `DESIGN.md` design systems, and browser verification. |
| [`engineering-gauntlet`](engineering-gauntlet/SKILL.md) | Evidence-driven engineering with AI agents, end to end: discovery and design gate, risk-scaled gates, behavioral contracts, implementation plans, inline or subagent-driven execution, TDD, systematic debugging, architecture, backend practices (including adding auth to an existing API), risk and review, receiving review and finishing branches, prompt and skill authoring. |

Both skills are written in English and respond in the language of the user's messages (Brazilian Portuguese when it cannot be determined), including report headings; persisted artifacts (commits, PR text, docs, comments) follow the repository's language. Each has a short `SKILL.md` that routes to `references/` files loaded on demand.

## Install

Symlink each skill folder into the agent's skills directory. With symlinks, `git pull` in this repo updates every agent at once.

```bash
# Run from this repo's root.
# Claude Code (all projects)
mkdir -p ~/.claude/skills
ln -sfn "$PWD/frontend-engineering" ~/.claude/skills/frontend-engineering
ln -sfn "$PWD/engineering-gauntlet" ~/.claude/skills/engineering-gauntlet

# Codex (all projects)
mkdir -p ~/.codex/skills
ln -sfn "$PWD/frontend-engineering" ~/.codex/skills/frontend-engineering
ln -sfn "$PWD/engineering-gauntlet" ~/.codex/skills/engineering-gauntlet

# or per project (copies, pinned to this version)
SKILLS_REPO="$PWD"; cd /path/to/project
mkdir -p .claude/skills && cp -R "$SKILLS_REPO/frontend-engineering" "$SKILLS_REPO/engineering-gauntlet" .claude/skills/
```

`ln -sfn` is safe to re-run (it replaces an existing link). Restart the agent after installing. In Claude Code, invoke explicitly with `/frontend-engineering` or `/engineering-gauntlet`; in other agents, invoke them by name or let the agent pick them from their descriptions. Each skill folder carries its own MIT `LICENSE`, so copies stay licensed.

## Optional dependency: agent-browser

Browser verification, UI bug reproduction, and exploratory QA use [agent-browser](https://github.com/vercel-labs/agent-browser) (commands tested on 0.43):

```bash
npm i -g agent-browser && agent-browser install
```

- Small changes use a short pass (`frontend-engineering/references/browser-quick.md`). The full pass loads the version-matched guide with `agent-browser skills get core` (skipped when the host already provides agent-browser tools), and the bundled `dogfood` workflow is used only for multi-page apps or flows.
- Video recording (`record start`) needs **ffmpeg**; without it, the skills fall back to one screenshot per step.
- Without agent-browser, the skills still work and report browser checks as **not verified**.

Verification artifacts (screenshots, videos) use **absolute paths** (`"$PWD/.verification/…"`); a relative `.verification/x.png` is parsed by agent-browser as a CSS selector and saved elsewhere. Implementation work writes them to `.verification/` in the target project; the skills do not edit a tracked `.gitignore`, so exclude it yourself, preferably locally with `echo .verification/ >> .git/info/exclude`. Audit-only work writes nothing into the project and keeps evidence outside it.

## How the skills were tested

Both skills were exercised with subagents on fixture projects (a money bug fix, a vague "add auth" request, a static pricing page, and a UX/a11y audit of a broken signup form), scored against the skill's own rules, fixed, and re-run. Notable rules that came out of it:

- **engineering-gauntlet:** small/medium/large defined; gates scale with the change, not just the risk level; verified work is committed (on a feature branch, staging only the changed paths) only when the host, project, and human allow commits, otherwise it is left in the working tree with "commit" listed under **Decisions needed**; reports have a **Decisions needed** section; calculation tests must discriminate plausible wrong implementations (floor/ceil/half-even); money rounding is a business decision; manual mutation testing when no tool exists; high-risk work keeps a design approval even when discovery is skipped.
- **frontend-engineering:** dedicated accessibility-audit route; known axe blind spots (placeholder-only labels, clickable `<div>`s, focus visibility, charset); short verification pass for small changes; 200% text-resize check; wait for animations before evidence screenshots; no invented "most popular" badges, annual prices show the total billed, and links to pages that don't exist are reported as open items.

## Versions

- **2.4.0** — Fifth round, from a multi-agent Fable audit and simulated-human scenario tests: commits only when allowed, with explicit staging; one approval model (ask before building on business rules when a human is present); PASS/FAIL/NOT VERIFIED reports with risk and approval slots, one report when both skills are active, shorter replies; frontend leads UI work and states which gauntlet gates applied; P0/P1/P2 audit labels and an ask-or-assume rule for unverifiable claims; 320px in the default size list; baselines captured before the first edit; DESIGN.md found outside `docs/design/` and user request over DESIGN.md; inline stack detection, lighter inspection, and a short `browser-quick.md` pass; reply and artifact language rules; routing for UI bugs, performance, dark mode/motion, and frontend review; valid YAML descriptions; idempotent install and a LICENSE per skill.
- **2.3.3** — Fourth round: read-only reviewer subagents, per-item vs. total rounding and float half-cases, agent-browser state resets (`a11y`/`vitals` with a URL re-navigate, `set device` UA persists), label-based target size, text-scaling check for px pages, retake (not delete) stale evidence.
- **2.3.2** — Third round: retake evidence after fixes, zsh-safe session wrapper, audit evidence path in setup, missing viewport meta, no-JS defaults, WCAG 2.5.8 exceptions, high-risk step order, handling of reviewer suggestions, displayed vs. charged amounts.
- **2.3.1** — Second round from the retest: bug route covers regression/money/mutation, auth design checklist, compliance findings in audits, 200% text check, lighter responsive subset for content pages.
- **2.3.0** — Fixes from behavioral tests: absolute evidence paths, audit-only evidence outside the project, risk proportionality, commit before delivery, discriminating tests.

## Credits

Built on ideas from [obra/superpowers](https://github.com/obra/superpowers), [mattpocock/skills](https://github.com/mattpocock/skills), [anthropics/skills](https://github.com/anthropics/skills), [Vercel Web Interface Guidelines](https://github.com/vercel-labs/web-interface-guidelines), [emilkowalski/skills](https://github.com/emilkowalski/skills), and Anthropic's prompting and skill-authoring guides.
