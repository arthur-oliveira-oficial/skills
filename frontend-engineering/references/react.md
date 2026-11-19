# React: Next.js or Vite, with or without shadcn/ui

## Contents
- Detect the stack
- Supported stacks and defaults
- Next.js (App Router)
- Vite + React (SPA)
- Tailwind CSS (v3 and v4)
- With shadcn/ui
- Without shadcn/ui
- Components
- Data and loading
- Icons
- Performance
- Responsiveness

## Detect the stack

Before any code, identify the real combination by reading files — never assume:

| Signal | Conclusion |
|---|---|
| `next` in `package.json`, `next.config.*`, `app/` or `pages/` | Next.js (App Router if `app/`, Pages Router if `pages/`) |
| `vite` in `package.json`, `vite.config.*`, `index.html` at the root, `src/main.tsx` | Vite + React (SPA) |
| `react-router`, `@tanstack/react-router` | Client-side routing (Vite) |
| `tailwindcss` v4 / `@import "tailwindcss"` / `@tailwindcss/vite` | Tailwind v4 (CSS config via `@theme`) |
| `tailwind.config.*` and `@tailwind base` | Tailwind v3 |
| `components.json` and `components/ui/*` | shadcn/ui installed |
| `@radix-ui/*`, `@base-ui-components/*`, `react-aria-components`, `@headlessui/react` | Headless primitives without shadcn |
| `@mui/*`, `antd`, `@chakra-ui/*`, `@mantine/*` | Own component library — **use it**, do not introduce shadcn |
| `pnpm-lock.yaml` / `yarn.lock` / `bun.lock` / `package-lock.json` | Package manager to use |

Record the detected combination in the final report. For a new project with no stated stack, use the default: **Next.js App Router + TypeScript + Tailwind + shadcn/ui + lucide-react**. If the user asks for an SPA, a serverless app, an internal dashboard, or "Vite", use **Vite + React + TypeScript + Tailwind** (with shadcn only if requested or accepted).

## Supported stacks and defaults

| Stack | Routing | Data | Components |
|---|---|---|---|
| Next.js + shadcn | App Router (file-based) | Server Components, Server Actions, server-side `fetch` | shadcn/ui |
| Next.js without shadcn | App Router | same | custom components + headless primitives |
| Vite + React + shadcn | React Router or TanStack Router (whichever exists) | TanStack Query or the project's pattern | shadcn/ui |
| Vite + React without shadcn | same | same | custom components + headless primitives |

In all of them: TypeScript, Tailwind, and `lucide-react`, unless the project has a different convention.

## Next.js (App Router)

- Components are Server Components by default. `"use client"` only where there is interactivity or browser APIs, on the smallest possible component. Never make a whole page client-side because of one control.
- Fetch data on the server, in parallel (`Promise.all`); avoid waterfalls of independent `await`s.
- Use `loading.tsx`, `error.tsx`, and `not-found.tsx` for route states; `<Suspense>` for partial streaming.
- Mutations via Server Actions (or the existing approach), with server-side validation and `useActionState`/`useFormStatus` for pending state.
- `next/image` for images, `next/font` for fonts, `next/link` for navigation, `metadata` for `<title>`.
- Do not import server-only code into client components (use `server-only` when useful).

## Vite + React (SPA)

- Everything runs on the client: there is no `"use client"`, no Server Components, and no Server Actions. Do not use Next APIs (`next/image`, `next/link`, `next/font`).
- **Routing:** use the existing router (React Router, TanStack Router). Navigate with `<Link>`; filter/tab/pagination state in the URL (`useSearchParams` or typed search params).
- **Code splitting:** `React.lazy` + `<Suspense>` per route; load heavy modules on demand.
- **Data:** TanStack Query (or the project's pattern) for caching, loading, errors, retries, and optimistic updates. Avoid scattered manual `useEffect` + `fetch`.
- **Route states:** error boundaries per route/area; `Suspense` fallbacks with skeletons.
- **Images:** explicit `width`/`height`, `loading="lazy"` below the fold, `fetchpriority="high"` on the hero image, modern formats (AVIF/WebP).
- **Fonts:** self-host (e.g. `@fontsource/*` or files in `public/`) with `font-display: swap` and `<link rel="preload">` for critical fonts in `index.html`.
- **Title/meta:** update `document.title` per route (the router usually offers a mechanism).
- **Alias:** confirm `@/` in `vite.config.*` (`resolve.alias`) and `tsconfig` (`paths`) before using it.
- **Environment variables:** only `import.meta.env.VITE_*` reach the client; never put secrets in them.
- Validate with `tsc --noEmit` (or the project's script), lint, and `vite build`; `vite preview` to check the build.

## Tailwind CSS (v3 and v4)

- **v4:** CSS-based config — `@import "tailwindcss";` and tokens in `@theme { --color-primary: …; --radius-md: …; }`. `@tailwindcss/vite` plugin in Vite projects. Dark mode via `@custom-variant dark` if the project uses a class.
- **v3:** tokens in `tailwind.config.*` (`theme.extend`), `@tailwind base/components/utilities` directives, `darkMode: 'class'` when applicable.
- Both: semantic tokens as CSS variables (`--background`, `--foreground`, `--primary`, `--muted`, `--border`, `--ring`, `--radius`), consumed through classes (`bg-background`, `text-muted-foreground`). Avoid arbitrary colors (`bg-[#3b82f6]`) outside the tokens.
- Combine classes with `cn()` (`clsx` + `tailwind-merge`) and variants with `cva` when the project already uses it or when there are ≥ 2 real variants.
- Do not mix syntax versions: follow the installed version.

## With shadcn/ui

Treat shadcn as editable source code, not a visual constraint.

1. Read `components.json` (style, aliases, `rsc: true/false`, Radix or Base UI base).
2. Inspect the existing `components/ui/*`.
3. Add only what is needed with the CLI using the project's package manager (`pnpm dlx shadcn@latest add …`, `npx shadcn@latest add …`, `bunx …`).
4. In **Vite**, confirm `rsc: false` and the `@/` alias are configured; `"use client"` in components is irrelevant.
5. Compose from existing primitives; customize to the visual direction while preserving accessible behavior.
6. Do not hand-recreate a complex primitive (Dialog, Popover, Combobox, DropdownMenu, Tabs, Tooltip) that shadcn already provides.

## Without shadcn/ui

When the project does not use shadcn (or the user does not want it):

- **Do not install shadcn on your own.** Ask or follow the request.
- If there is a component library (MUI, Mantine, Chakra, Ant), use it and its theme system; apply the visual direction through theme customization, not by overriding CSS at each usage.
- If there are headless primitives (Radix, Base UI, React Aria, Headless UI), style them with Tailwind — they handle focus, keyboard, and ARIA.
- With none of those:
  - Simple components (Button, Input, Card, Badge, Label, Textarea, native Select) → write them with semantic HTML + Tailwind, organized in `src/components/ui/`, with `cn()` and variants via `cva` or a mapping object.
  - Components with complex focus/keyboard behavior (dialog, menu, combobox, popover, tooltip, tabs) → prefer native elements when sufficient (`<dialog>`, `<details>`, `<select>`, the `popover` attribute) or propose adding **one** headless package (Radix or React Aria) instead of reimplementing accessibility by hand.
- Keep the same quality bar: focus, disabled, loading, and error states; consistent variants; theme tokens.

## Components

- Create a component when there is real reuse, independent behavior, or a clear conceptual boundary. Do not fragment JSX into dozens of files to look architected.
- Semantic names, explicit props, small composable primitives, colocated types, predictable state ownership.
- Prefer composition (children, slots, compound components) over boolean props that multiply variants.
- Derive values during render instead of syncing state with `useEffect`.
- Avoid premature generic systems.

## Data and loading

- Use the established data approach.
- Skeletons shaped like the final content; no spinner for everything. A short show delay and minimum visible time to avoid flicker.
- Optimistic updates when success is likely; rollback or undo on failure.
- State that must survive refresh and sharing goes in the URL.

## Icons

`lucide-react`, unless another strategy is established. Import individually; consistent size per context; icons clarify, they do not decorate. Icon-only → `aria-label` (plus tooltip if unfamiliar); decorative → `aria-hidden="true"`. Do not mix filled and outline styles. Conventional icons: `Search`, `Settings`, `Plus`, `Trash2`, `Pencil`, `ExternalLink`, `Ellipsis`, `X`, `Menu`.

## Performance

- Explicit image dimensions (avoid layout shift); preload only what is above the fold.
- Critical fonts preloaded, subset, few variable axes.
- Code splitting per route; lazy loading only for genuinely heavy modules.
- Minimize JS and re-renders; uncontrolled inputs or cheap controlled updates.
- Large lists: virtualization (`@tanstack/react-virtual` if already present) or `content-visibility: auto`.
- Batch DOM reads/writes; long tasks in Web Workers.
- Test with CPU and network throttling and in Safari.
- Remove dead code, unused imports, placeholders, and `console.log` before finishing.

## Responsiveness

Follow `responsive-layout.md` for size classes, per-device patterns, input modality, and the testing protocol. In code:

- Mobile-first Tailwind: base classes for compact, then `sm:`/`md:`/`lg:`/`xl:`.
- Reusable components use container queries (`@container`, `@md:`) instead of viewport breakpoints.
- Layout switches that change the component tree (e.g. sidebar ↔ drawer) prefer CSS; when JS is needed, use a `matchMedia` hook that is SSR-safe in Next.js (render a CSS-hidden fallback first, avoid hydration mismatch).
- Never branch on user agent.
