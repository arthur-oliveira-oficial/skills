---
name: frontend-engineering
description: "Designs, builds, audits, and verifies production web interfaces (UI, frontend). Use for pages, sites, dashboards, SaaS apps, landing pages, admin panels, forms, onboarding, checkout, navigation, components, redesigns, visual polish, CSS, themes, dark mode, responsive layout (mobile, tablet, desktop), UI bugs, frontend code review, UX/usability/accessibility audits, browser verification or QA of a web app, and any change to layout, styling, tokens, or visual states; with Next.js or Vite + React, Tailwind CSS, shadcn/ui or other component libraries, Vue, Nuxt, Angular, Svelte, or plain HTML/CSS; and for creating, validating, exporting, or applying a DESIGN.md design system (tokens, Tailwind theme, tokens.json). Not for backend-only work, native mobile apps, HTML email, or charts. Também: tela, página, site, interface, formulário, painel, componente, layout, estilo, tema, responsivo, acessibilidade, usabilidade, redesign, design system."
license: MIT
metadata:
  version: "2.4.0"
---

# Frontend Engineering

Build interfaces that look designed for **this** product, not generated for any product. The goal is not maximum decoration: it is a clear visual point of view, strong hierarchy, excellent interaction, responsive behavior, accessible semantics, and production-quality code.

Respond in the language of the user's messages (Brazilian Portuguese if undeterminable), including report headings; persisted artifacts (comments, commits, docs, identifiers) follow the repository's language. Preserve the product's language, terminology, and i18n. Match reply length to the user's; reserve the full report for the final delivery.

## Order of precedence

On conflict, follow this order:

1. The user's explicit request.
2. The project's DESIGN.md, if present (tokens > prose; location in step 1).
3. Coherent conventions already in the repository.
4. This skill and its references.

Compliance, security, consent, and the user's ability to complete the task override any aesthetic preference. Non-negotiable rules constrain outcomes (no overflow at 320px, keyboard access, no fabricated claims of your own), not technique: a desktop-first codebase keeps its convention.

## Routing

Identify the mode and read **only** the references it needs:

| Request | Mode | Read |
|---|---|---|
| Create, validate, export, or import a `DESIGN.md` | Design system | [design-md.md](references/design-md.md) |
| Any frontend change when a DESIGN.md exists | Apply design system | [apply-design-md.md](references/apply-design-md.md) |
| New screen, page, component, or app | Build | [visual-direction.md](references/visual-direction.md), [interface-guidelines.md](references/interface-guidelines.md), [responsive-layout.md](references/responsive-layout.md); [react.md](references/react.md) only when React is detected or chosen |
| Improve existing UI | Redesign | [visual-direction.md](references/visual-direction.md), [ux-laws.md](references/ux-laws.md), [responsive-layout.md](references/responsive-layout.md) |
| UI bug | Debug | `engineering-gauntlet` debugging for root cause; [browser-verification.md](references/browser-verification.md) to reproduce and prove the fix |
| Slow page, layout shift, heavy bundle | Performance | [react.md](references/react.md) (Performance) or framework equivalent; [browser-verification.md](references/browser-verification.md) (vitals) |
| Dark mode, motion | Theme/motion | [visual-direction.md](references/visual-direction.md) (Color, Motion); [browser-verification.md](references/browser-verification.md) (Color scheme) |
| Review a frontend diff or PR | Review | [quality-checklist.md](references/quality-checklist.md) as a scan list, [interface-guidelines.md](references/interface-guidelines.md) |
| Audit usability, flow, conversion, friction | UX audit | [ux-laws.md](references/ux-laws.md); [browser-verification.md](references/browser-verification.md) when the app can run |
| Audit accessibility (WCAG, keyboard, screen reader, contrast) | A11y audit | [interface-guidelines.md](references/interface-guidelines.md), [browser-verification.md](references/browser-verification.md) (axe and its blind spots), [quality-checklist.md](references/quality-checklist.md) (Accessibility) |
| Mobile, tablet, desktop layouts, breakpoints, touch vs. pointer | Responsive | [responsive-layout.md](references/responsive-layout.md) |
| Forms, interactions, a11y, fine details | Polish | [interface-guidelines.md](references/interface-guidelines.md) |
| Browser check of a small change | Quick check | [browser-quick.md](references/browser-quick.md) |
| Full browser pass or exploratory QA | Browser verification | [browser-verification.md](references/browser-verification.md) |
| Before declaring any implementation work done | QA | [quality-checklist.md](references/quality-checklist.md) |

Several rows can apply at once: read the union and deliver one report.

**Audit or review only:** do not edit or create files in the project; evidence goes outside it. Implementation: change the code, not just an audit.

## Workflow

Copy and track for substantial work:

```
- [ ] 1. Inspect the repository and DESIGN.md; capture a baseline
- [ ] 2. Frame the UX (user, task, primary action, states)
- [ ] 3. Set the visual direction (short brief)
- [ ] 4. Build semantic, responsive structure
- [ ] 5. Compose from existing primitives
- [ ] 6. Polish typography, spacing, surfaces, states
- [ ] 7. Validate (lint, types, tests, build) and verify in the browser
- [ ] 8. Run the quality checklist and report
```

**1. Inspect.** Read `AGENTS.md`/`CLAUDE.md`/README and `package.json`. List `components/ui` and the app tree; open only the files you will change, their imports, and the token/global CSS file. Never speculate about unopened code. DESIGN.md: `docs/design/DESIGN.md`, else at the root or under `docs/`; one found elsewhere is canonical (no duplicate). Changing existing UI that can run: capture a baseline before the first edit (screenshots at 375 and 1440, `a11y --json`, `vitals --json`; see [browser-verification.md](references/browser-verification.md)).

**Detect the stack** from files and adapt:

| Signal | Stack | Adaptation |
|---|---|---|
| `next` dependency, `next.config.*` | Next.js (App Router if `app/`) | Server Components by default; shadcn via CLI if `components.json` |
| `vite` dependency, `vite.config.*` | Vite + React SPA | No `"use client"`/Next APIs; the project's router; shadcn only with `components.json` (`rsc: false`), else headless primitives for complex focus/keyboard |
| `@mui/*`, `@mantine/*`, `@chakra-ui/*`, `antd` | Existing library | Use it and its theme; do not introduce shadcn |
| `vue`/`nuxt`, `@angular/core`, `svelte` | Other framework | Same principles; the framework's idioms |
| No `package.json` | Plain HTML/CSS | Semantic HTML, CSS custom properties as tokens |

New project with no stack specified: a single page or prototype → plain HTML/CSS; an app → Next.js App Router + TypeScript + Tailwind + shadcn/ui + lucide-react. Request for an SPA or "Vite": Vite + React + TypeScript + Tailwind (shadcn only if requested or accepted). Never add shadcn or another UI library to a project without the user's agreement.

**2. Frame the UX.** Determine product type, primary user and job-to-be-done, the screen's primary action, information hierarchy, appropriate density, required trust level, and every state: loading, empty, error, success, disabled, partial.

**3. Visual direction.** Write a 6-item internal brief (mood, visual anchor, density, surface strategy, typography, interaction character). Details in [visual-direction.md](references/visual-direction.md). If DESIGN.md exists, the direction comes from it.

**4–6. Build.** Structure and responsiveness before decoration. Mobile-first: base classes for the smallest viewport, `sm:`/`md:`/`lg:` only to enhance. Reuse existing components, tokens, validation, state, and translations.

**7. Validate.** Run the available lint, typecheck, tests, and build. Then verify in a real browser with `agent-browser`: small change → [browser-quick.md](references/browser-quick.md); otherwise the full pass in [browser-verification.md](references/browser-verification.md) (`agent-browser skills get core` only for it, unless the host already provides agent-browser tools), with screenshots as evidence (absolute paths). Close the session and stop any server you started. If `agent-browser` is missing or the app cannot run, list the checks not verified; never claim a pass you did not run.

**8. Report.** With `engineering-gauntlet` active, use its report, browser checks as Evidence rows. Otherwise: files changed, design decisions and why, UX laws that drove a change, checks run with `PASS`/`FAIL` and the command, open items and risks, then **Not verified**.

## Non-negotiable rules

- **Scope:** do only what was asked or is clearly necessary. Do not rewrite architectures, restyle unrelated screens, or add libraries (components, icons, CSS, animation, state) without real need.
- **Mobile-first:** no horizontal scrolling at 320px; important features do not disappear on mobile; tablet and desktop are deliberate enhancements (size classes in [responsive-layout.md](references/responsive-layout.md)).
- **Accessibility is a design constraint, not a final audit:** semantic HTML, keyboard, visible focus, labels, accessible names, contrast, `prefers-reduced-motion`. Never rely on color alone.
- **Touch targets:** the normative WCAG 2.2 AA 2.5.8 minimum is 24×24 CSS px; prefer 44×44 px for important touch controls.
- **Real states:** loading, empty, error, and success are part of the design, not an afterthought.
- **Honesty:** do not invent logos, testimonials, metrics, awards, "most popular" badges, or conversion lifts. No dark patterns (false urgency, fabricated scarcity, fake progress, hidden cancellation, pre-checked opt-ins). Prices: when showing a per-month equivalent of an annual plan, also show the total actually billed.
- **Missing content, links, and data:** do not invent URLs, routes, facts, or content. Use neutral copy and visibly marked placeholders for facts; link to destinations that don't exist yet only as a recorded assumption; list all of them in the report as open items.
- **Ask or assume:** a business rule or destination the repo cannot answer → human reachable: ask before building (up to 3 questions at once); otherwise build with the assumption visible and listed as open. A requested claim you cannot verify ("Mais popular", "N customers") → ask whether it is true first; offer a neutral alternative ("Recomendado").
- **Tokens, not literals:** use theme variables and semantic tokens; never replace tokens with hard-coded approximations.
- **Sensitive data:** never in `localStorage`.

## Specific modes

**Redesign.** Do not rewrite everything. Fix the 3–5 highest-impact problems (unclear hierarchy, weak spacing rhythm, excessive cards, inconsistent radii, low contrast, mechanical responsiveness, weak empty/loading states, cluttered actions) in order of impact, preserving behavior.

**Landing page.** Establish audience, value proposition, proof, objections, and conversion action before layout. Avoid the generic hero → logo cloud → 3 cards → testimonials → pricing sequence unless the content calls for it. Use real product visuals.

**Dashboard / SaaS.** Task completion and information scent over spectacle: clear active navigation, a useful title and action area, sensible defaults, search/filter when needed, contextual actions near the object they affect, responsive data representation. Do not wrap every metric in a floating card.

**UX / a11y audit.** Findings with file/screen, evidence, law/heuristic or WCAG criterion, recommendation, and effort, labeled P0 (blocks the task, exposes data, or compliance), P1 (WCAG A/AA failure or major friction), or P2 (polish), ordered by label. No code edits, no files written into the project. When the app can run, verify findings in the browser; `agent-browser skills get dogfood` only for multi-page apps or flows. End with the checks run, what was **not verified**, and an offer to implement the P0/P1 fixes.

## Relationship with the `engineering-gauntlet` skill

For interface work this skill leads. For medium/high-risk changes (auth, payments, data, critical flows), also apply the `engineering-gauntlet` process: behavioral contract, tests first, reproducible evidence. State which gauntlet gates you applied. Static pages with no test infrastructure: scripted browser checks run red-then-green count as the tests.
