---
name: frontend
description: Designs, implements, audits, and refines production web interfaces with a distinct visual direction, UX grounded in cognitive laws, accessibility, and mobile-first behavior. Adapts to the detected stack — Next.js or Vite + React, Tailwind CSS v3/v4, with or without shadcn/ui (or another component library), Lucide — and also Vue, Nuxt, Angular, Svelte, and plain HTML/CSS. Also creates, validates, exports, and applies DESIGN.md design systems (tokens, Tailwind, Figma, tokens.json). Use for pages, dashboards, SaaS apps, landing pages, admin panels, forms, onboarding, checkout, navigation, components, redesigns, visual polish, UX/usability/accessibility audits, and any change to layout, styling, themes, tokens, or visual states. Not for backend-only work. Também: tela, página, formulário, painel, componente, layout, responsivo, acessibilidade, usabilidade, redesign, design system.
license: MIT
metadata:
  version: "2.1.0"
---

# Frontend

Build interfaces that look designed for **this** product, not generated for any product. The goal is not maximum decoration: it is a clear visual point of view, strong hierarchy, excellent interaction, responsive behavior, accessible semantics, and production-quality code.

Respond in the user's language (default: Brazilian Portuguese). Preserve the product's language, terminology, and i18n.

## Order of precedence

When sources of guidance conflict, follow this order:

1. The user's explicit request.
2. The project's `docs/design/DESIGN.md`, if present (tokens > prose).
3. Coherent conventions already in the repository.
4. This skill and its references.

Compliance, security, consent, and the user's ability to complete the task override any aesthetic preference.

## Routing

Identify the mode before acting and read **only** the references you need:

| Request | Mode | Read |
|---|---|---|
| Create or validate a design system, `DESIGN.md`, export/import tokens | Design system | [references/design-md.md](references/design-md.md) |
| Any frontend change when `docs/design/DESIGN.md` exists | Apply design system | [references/apply-design-md.md](references/apply-design-md.md) |
| New screen, page, component, or app | Build | [references/visual-direction.md](references/visual-direction.md), [references/react.md](references/react.md), [references/interface-guidelines.md](references/interface-guidelines.md) |
| Improve existing UI | Redesign | [references/visual-direction.md](references/visual-direction.md), [references/ux-laws.md](references/ux-laws.md) |
| Audit usability, flow, conversion, friction | UX audit | [references/ux-laws.md](references/ux-laws.md) |
| Forms, interactions, a11y, fine details | Polish | [references/interface-guidelines.md](references/interface-guidelines.md) |
| Before declaring any visual work done | QA | [references/quality-checklist.md](references/quality-checklist.md) |

If the request is **audit only**, do not edit files. If it is implementation, change the code; do not deliver only an audit.

## Workflow

Copy and track for substantial work:

```
- [ ] 1. Inspect the repository and DESIGN.md
- [ ] 2. Frame the UX (user, task, primary action, states)
- [ ] 3. Set the visual direction (short brief)
- [ ] 4. Build semantic, responsive structure
- [ ] 5. Compose from existing primitives
- [ ] 6. Polish typography, spacing, surfaces, states
- [ ] 7. Validate (lint, types, tests, build, mobile and desktop widths)
- [ ] 8. Run the quality checklist and report
```

**1. Inspect.** Before any JSX, read `AGENTS.md`/`CLAUDE.md`/README, `package.json`, `components.json`, `app/` or `src/`, `components/ui/*`, global CSS, theme tokens, fonts, icons, and responsive conventions. Check `docs/design/DESIGN.md`. Never speculate about code you have not opened.

**Detect the stack** (table in [react.md](references/react.md)) and adapt to it:

| Detected stack | Adaptation |
|---|---|
| Next.js + shadcn | Server Components by default; shadcn via CLI |
| Next.js without shadcn | Same, with custom components or headless primitives |
| Vite + React + shadcn | SPA: no `"use client"`/Next APIs; the project's router and data fetching; shadcn with `rsc: false` |
| Vite + React without shadcn | SPA; custom components with Tailwind + semantic HTML; headless primitives for complex focus/keyboard behavior |
| Existing library (MUI, Mantine, Chakra, Ant) | Use it and its theme; do not introduce shadcn |
| Vue, Nuxt, Angular, Svelte, HTML/CSS | Same design, UX, and a11y principles; the framework's idioms and components |

New project with no stack specified: Next.js App Router + TypeScript + Tailwind + shadcn/ui + lucide-react. Request for an SPA or "Vite": Vite + React + TypeScript + Tailwind (shadcn only if requested or accepted). Never install shadcn or another UI library in a project that does not use it without the user's agreement.

**2. Frame the UX.** Determine product type, primary user and job-to-be-done, the screen's primary action, information hierarchy, appropriate density, required trust level (casual, premium, enterprise, financial, health, developer tool), and every state: loading, empty, error, success, disabled, partial.

**3. Visual direction.** Write a 6-item internal brief (mood, visual anchor, density, surface strategy, typography, interaction character). Details in [visual-direction.md](references/visual-direction.md). If DESIGN.md exists, the direction comes from it.

**4–6. Build.** Structure and responsiveness before decoration. Mobile-first: base classes for the smallest viewport, `sm:`/`md:`/`lg:` only to enhance. Reuse existing components, tokens, validation, state, and translations.

**7. Validate.** Run the available lint, typecheck, tests, and build. If a browser is available, check at least ~375px and ~1280px. If something could not be run, say exactly what. Never claim it passed without running it.

**8. Report.** Files changed, design decisions and why, UX laws applied (when relevant), validations run with results, open items and risks.

## Non-negotiable rules

- **Scope:** do only what was asked or is clearly necessary. Do not rewrite architectures, restyle unrelated screens, or add libraries (components, icons, CSS, animation, state) without real need.
- **Mobile-first:** no horizontal scrolling at 320px; important features do not disappear on mobile.
- **Accessibility is a design constraint, not a final audit:** semantic HTML, keyboard, visible focus, labels, accessible names, contrast, `prefers-reduced-motion`. Never rely on color alone.
- **Touch targets:** the normative WCAG 2.2 AA 2.5.8 minimum is 24×24 CSS px; prefer 44×44 px for important touch controls.
- **Real states:** loading, empty, error, and success are part of the design, not an afterthought.
- **Honesty:** do not invent logos, testimonials, metrics, awards, or conversion lifts. No dark patterns (false urgency, fabricated scarcity, fake progress, hidden cancellation, pre-checked opt-ins).
- **Tokens, not literals:** use theme variables and semantic tokens; never replace tokens with hard-coded approximations.
- **Sensitive data:** never in `localStorage`.

## Specific modes

**Redesign.** Do not rewrite everything. Identify the 3–5 highest-impact problems (unclear hierarchy, weak spacing rhythm, excessive cards, inconsistent radii, low contrast, mechanical responsiveness, unnecessary client-side complexity, weak empty/loading states, cluttered actions). Fix them in order of impact while preserving behavior.

**Landing page.** Establish audience, value proposition, proof, objections, and conversion action before layout. Avoid the generic hero → logo cloud → 3 cards → testimonials → pricing sequence unless the content calls for it. Use real product visuals.

**Dashboard / SaaS.** Task completion and information scent over spectacle: clear active navigation, a useful title and action area, sensible defaults, search/filter when needed, contextual actions near the object they affect, responsive data representation. Do not wrap every metric in a floating card.

**UX audit.** Prioritized findings with file/screen, evidence, law/heuristic, recommendation, and risk. No code edits.

## Relationship with the `engineering` skill

For medium/high-risk frontend changes (authentication, payments, data, critical flows), also apply the `engineering` skill's process: behavioral contract, tests before implementation, and reproducible evidence.
