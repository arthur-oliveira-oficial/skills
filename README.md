# Skills

Agent skills for Claude Code (and other agents that read `SKILL.md`).

| Skill | Use it for |
|---|---|
| [`frontend-engineering`](frontend-engineering/SKILL.md) | Designing, building, auditing, and polishing web UIs: visual direction, UX laws, accessibility, responsive layout (mobile, tablet, desktop), React with Next.js or Vite, Tailwind, with or without shadcn/ui, `DESIGN.md` design systems, and browser verification. |
| [`engineering-gauntlet`](engineering-gauntlet/SKILL.md) | Evidence-driven engineering with AI agents, end to end: discovery and design gate, behavioral contracts, implementation plans, inline or subagent-driven execution, TDD, systematic debugging, architecture, backend practices, risk and review, receiving review and finishing branches, prompt and skill authoring. |

Both skills are written in English and respond in the user's language (default: Brazilian Portuguese). Each has a short `SKILL.md` that routes to `references/` files loaded on demand.

## Install

Copy or symlink each skill folder into a skills directory:

```bash
# personal (all projects)
ln -s "$PWD/frontend-engineering" ~/.claude/skills/frontend-engineering
ln -s "$PWD/engineering-gauntlet" ~/.claude/skills/engineering-gauntlet

# or per project
mkdir -p .claude/skills && cp -R frontend-engineering engineering-gauntlet .claude/skills/
```

Invoke explicitly with `/frontend-engineering` or `/engineering-gauntlet`, or let the agent pick them from their descriptions.

## Optional dependency: agent-browser

Browser verification, UI bug reproduction, and exploratory QA use [agent-browser](https://github.com/vercel-labs/agent-browser):

```bash
npm i -g agent-browser && agent-browser install
```

The skills load the version-matched usage guide with `agent-browser skills get core` and use the bundled `dogfood` and `modern-web-guidance` skills when relevant. Without agent-browser, the skills still work and report browser checks as not verified.

Verification artifacts (screenshots, videos) are written to `.verification/` in the target project; add it to that project's `.gitignore`.

## Credits

Built on ideas from [obra/superpowers](https://github.com/obra/superpowers), [mattpocock/skills](https://github.com/mattpocock/skills), [anthropics/skills](https://github.com/anthropics/skills), [Vercel Web Interface Guidelines](https://github.com/vercel-labs/web-interface-guidelines), [emilkowalski/skills](https://github.com/emilkowalski/skills), and Anthropic's prompting and skill-authoring guides.
