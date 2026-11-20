# Proposals (options and alternatives)

When someone asks for options, they want to **choose**, not to be handed a winner. Use this for "give me options", "alternatives", "variations", "other directions", "I don't like it", "rethink this", "design both so I can pick". A specific change the person already described ("make it blue") is not an options request: make it. Adapted from diego3g/design-skills (MIT).

## Contents
- Steps
- Divergence axes
- The check before building
- Where the options live
- Presenting them
- After the answer

## Steps

1. **Restate the problem** in one or two sentences: what's wrong today and what a good result must do. If the request was only "make it better", name the problem you see. Human reachable and the problem was not named → confirm it before building.
2. **Choose the directions** on different axes (below). Write each as one line: the idea and its trade-off.
3. **Build them** in a temporary area, with the same realistic data, the same size, and the same fidelity, including the states each difference affects (if B moves an action into a menu, show the menu open). Every option uses the project's tokens and components: options differ in design, not in brand.
4. **Present** the recommendation first, then stop for the pick.

**Count:** three by default; two when they said "both"; exactly the number they asked for otherwise. Every option must be one you would defend (no straw men), and one of them is deliberately bolder (except when they named both options themselves).

## Divergence axes

An option is a direction when it changes one of these. Give each option a **main axis**; no two options share a main-axis value.

| Axis | What changes | Example values (a project tracker's settings page) |
|---|---|---|
| Structure / placement | Where things live, how they're grouped | one long page · sub-navigation, one section at a time · settings inside each object |
| Interaction model | How people act | explicit Save · autosave with "All changes saved" · edit in place per section |
| Density | How much shows at once | dense table · comfortable cards · progressive disclosure ("More") |
| Emphasis | What the eye meets first | most-changed setting on top · a summary with "Change" links · status-first (what's misconfigured) |
| Removal | What disappears | merge two choices · drop a rare feature from this page · smart defaults instead of options |

**Not axes:** colour scheme, light/dark, typeface, corner radius, illustration style. Those belong to the design system. Use them only when the person explicitly asks for visual styles, and then say that this is the axis. When the person names the axis ("too dense"), the options may share it with clearly different values.

## The check before building

| Option | Main axis | Value | Trade-off |
|---|---|---|---|
| A | Interaction | Autosave per field | Fast; no undo-all |
| B | Structure | Sub-navigation | Scales to more settings; one more click |
| C (bolder) | Removal | 3 smart defaults + "Advanced" | Simplest; hides power-user options |

If two rows share an axis *and* a value, replace one. Shared fixes are fine: say once that all options include them.

## Where the options live

Never edit the real screens until the pick; options that leak into the product are decisions nobody made.

- **Code project:** a temporary route or page (`/explorations/<topic>`) or files under `explorations/<topic>/`, not linked from the product's navigation; or, when the project has Storybook, one story per option.
- **Current** sits beside the options when a design exists today: people judge change against what they know.
- Small twists on one option are sub-variants (A2, A3), not new letters.
- Capture each option at the same widths (the Responsive sizes for the change) for the comparison.

## Presenting them

1. Recommendation first: the letter and why, tied to the problem.
2. One line per option: idea · good at · costs.
3. Where to see them (route or file, screenshots with absolute paths).
4. "Pick one, combine them (for example 'B with A's header'), or tell me none fit and why." Then stop.

No human reachable: build the recommended option on the real screens only if the request asked for a finished change; otherwise leave the options and the recommendation under **Decisions needed**.

## After the answer

- **Pick or combination:** apply it to the real screens; a changed shared piece follows the shared-piece rule in `apply-design-md.md`; then delete the temporary area and report what changed where.
- **All rejected:** their reason is new information about the problem. Restate the problem with it and diverge again, allowing changes to the surrounding parts. Never answer a rejection with small tweaks of the same options.
