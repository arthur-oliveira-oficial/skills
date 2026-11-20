# Screen states

A screen is not designed until every state it can be in is designed; the happy path is one of many. Use this catalogue in step 2 (Frame the UX) of a new screen, flow, or component, a redesign, or "which states are missing?". Adapted from diego3g/design-skills (MIT).

## Contents
- How to use the catalogue
- Data
- System
- Activity
- People
- Interaction
- Rules for every state
- Making states reviewable in code

## How to use the catalogue

Walk every group and mark each item one of three ways:

- **applies**, with one line on what the screen shows;
- **doesn't apply**, with the reason ("single-user app: no someone-else states");
- **open question**, listed under the report's open items.

Write the list before coding. When a human is reachable and the screen is new, has more than one kind of user, or shows shared or live data, show the list with the scope before building (it counts toward the SKILL.md question budget). Either way, the final report carries it as a **States** section: one line per group (Data, System, Activity, People) naming the states that apply, those that don't with the reason, and the open ones, and which were checked in the browser. Example: `System — applies: first load, couldn't load, offline, deleted in another tab; doesn't apply: changed by someone else (single user); open: none; checked: all but offline (NOT VERIFIED)`. The examples use an invented bakery's orders screen.

## Data

| State | When it applies | Example |
|---|---|---|
| Default | Always | Today's 14 orders, mixed statuses |
| Empty · first time | The person never had data here | "No orders yet. Share your order link" + Copy link |
| Empty · filtered to nothing | A search or filter hides everything | "No orders match 'croissant'" + Clear filter |
| One item | Lists, tables, grids | A single order: does the layout still look intentional? |
| Few | Lists | 3 orders, space left below |
| Many / overflow | Any list that can grow | 60 orders: scrolling, sticky header, pagination or "Show all (60)" |
| Very long text | Names, titles, notes, numbers | "Maria Fernanda de Albuquerque Santos", R$ 1.234.567,89, a 400-character note |
| Missing optional fields | Optional data | An order with no phone and no note |

## System

| State | When it applies | Example |
|---|---|---|
| First load | Data comes from somewhere | Skeleton in the final layout |
| Refresh | Data updates while visible | The list stays; a small "Updating…" appears; no full skeleton |
| Couldn't load | Any fetch | "Couldn't load today's orders." + Try again |
| Offline | Online apps | Keep the last data, "Offline since 10:31", queue or block actions |
| Partly failed | Several sources or items | 13 orders loaded, 1 failed inline with Retry |
| Slow | Operations that can take seconds | After ~2 s: "Still working…", never a frozen screen |
| Changed while viewing | Shared or live data | "This order changed. Review again." |
| Already done by someone else | More than one person acts on the same thing | "Ana already marked this ready at 9:12" (the server's 409/412 answer, not a generic error) |
| Expired | Links, sessions, approvals, offers | "This link expired. Ask for a new one." |

## Activity

| State | When it applies | Example |
|---|---|---|
| In progress | Long or background work | A step list: done ✓, now (spinner), next ○ |
| Waiting on someone else | Approvals, replies | "Waiting for the customer" |
| Finished just now | After an action | "Marked ready" with Undo |
| Undo window | Reversible actions | The toast's time limit, and what shows when the undo itself fails |
| Paused (by choice) vs failed | Anything that can stop | "Paused" (neutral, Resume) vs "Couldn't print the label" (danger, Try again) |

## People

| State | When it applies | Example |
|---|---|---|
| Role / permission | More than one kind of user | A cashier sees orders but not totals; a hidden action vs a disabled one with the reason |
| First time vs returning | Onboarding, empty accounts | A first-day checklist vs the daily view |
| Pending approval | Something another person must confirm | "Waiting for the owner's OK" |

## Interaction

Normal · hover · pressed · focus (keyboard) · disabled · loading · selected, per interactive piece. They come from the component's states matrix (`apply-design-md.md`), not redrawn per screen. On the screen, only handle the ones that change layout or content: a loading button, a selected row that opens details.

## Rules for every state

- **Realistic, messy data:** build the main state with the most complex realistic case (long names, many items, mixed statuses), not the tidiest. Short tidy data hides truncation and wrapping bugs.
- **A way out:** every state offers the action that resolves it and says who does it ("Ask an admin to enable exports"). A dead end becomes a support ticket.
- **Failure is worded as failure:** "Couldn't save", never "Stopped" or "Paused", which read as someone's choice.
- **Banner vs inline:** a whole-app problem (offline, maintenance, billing) goes in a top banner; a problem with one item goes inline on that item.
- **One empty-state piece** across the product, with variants, not a bespoke one per screen.
- **No layout shift between states:** same widths and heights when loading, refreshing, swapping labels, or failing.
- **Assume more than one person** uses shared data unless the product is single-user.

## Making states reviewable in code

Each applicable state must be reachable on demand, so it can be checked and screenshotted:

- with Storybook (or similar) in the project: one story per state;
- otherwise: fixtures or mocks per state, or the forcing commands in `quality-checklist.md` (Forcing states);
- never by editing production data.

Name evidence as `<screen>-<state>-<width>.png` (`orders-empty-filtered-375.png`), and list in the report which states were checked and which are `NOT VERIFIED`. One screenshot per non-default state is enough (the evidence budget in `browser-verification.md`, Responsive sizes); the full size matrix is only for the default state.
