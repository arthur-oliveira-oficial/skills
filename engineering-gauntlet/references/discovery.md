# Discovery and design gate

Find out what the person actually wants, and why, before building. The first guess about what someone wants is usually thinner than it feels.

## Contents
- When to use and when to skip
- The design gate
- Handling the first message
- Conversation rules
- Playback
- Approaches
- Design doc
- Builder check
- Red flags

## When to use and when to skip

Use for new features, components, behavior changes, integrations, and non-trivial refactors where intent, scope, or approach is open.

When adding a capability to an existing system (auth, multi-tenancy, permissions, billing), the first open question is usually the **data and ownership model** (who owns what, who may see it, what happens to existing data), because it changes the schema and every route.

Skip when:
- The request is small and clear → do it and say what you did.
- The person says to skip the questions → proceed; the gate goes with it. **Except for high-risk work** (auth, money, data loss, destructive migrations): skipping questions does not skip approval. Pick the safest reasonable option, show it as a short design (≤ 10 lines: approach, data changes, risks, rollback), and wait for an explicit yes before building.
- A complete spec or plan already exists and nothing material is open → confirm briefly and go to the contract/plan.

**No human can answer (headless run, subagent, batch):** do not wait. Low/medium risk: take the recommended approach, write the short design as **your proposal**, build in the working tree, and list every assumed answer under **Decisions needed**. High risk: produce the ≤ 10-line design and stop unless the task text explicitly authorizes building. Never merge, push, or deploy.

## The design gate

Nothing gets built until the person approves the design (no human available: the no-human rule above). "Building" includes product code, scaffolding, installing dependencies, creating projects, adding test infrastructure, and starting implementation. Reading and exploring the repository are allowed. If the project has no test setup, propose the minimal one as part of the design (e.g. the runtime's built-in test runner) so it is approved together.

Exception: a **spike** the person agreed to may be built. It stays labeled throwaway; keeping it requires a new request that passes through the gate.

Required sequence:
1. Present approaches; the person picks one. If the person already chose, asks for the design directly, or you already labelled the choice as your call, put the recommended approach and the short design in one message for a single approval.
2. Write the design doc (short or full).
3. Get approval of the doc.
4. Move to the contract and plan ([implementation-plan.md](implementation-plan.md)), or straight to the default workflow for small work.

## Handling the first message

- **Detailed request (spec or plan):** play it back briefly (≤ 100 words for small/medium work), note relevant findings about the current code or constraints, invite corrections, and ask the one open question that would most change the build. If nothing material is open, propose the short design and ask for approval.
- **Vague request:** ask one open question about the biggest unsettled point and say what the answer would change.
- If the person did not ask for discovery, end with a light offer to skip it and just start.

## Conversation rules

- Look at the repository and existing context first; never ask what they already answer.
- Ask only questions whose answer changes the build; otherwise state a proposed default with your reasoning so they can correct it. Dependent questions one at a time; independent ones may be batched (max 3, each with your proposed default). After about three product questions on a change, move the remaining items into the design as proposals.
- Get the person describing goals before offering options. Once the "why" is clear, offer concrete choices with trade-offs and a recommendation.
- Make the "how it gets built" calls (language, library, storage) yourself when the person focuses on outcomes, and label each as your call.
- Cover goals, non-goals, anti-goals (what must not happen), prior art, current state, and the details they care about — without reading them out as a script.
- Plain language; no process jargon.

## Playback

Play back your understanding once before the design (≤ 100 words for small/medium work), then continue. Mark anything you filled in as **your proposal**. Vague enthusiasm ("sounds good") about a playback is not approval of a design.

## Approaches

Two or three genuinely different approaches, each with trade-offs (complexity, risk, cost, reversibility, fit with the existing code), and one recommendation with the reason. Not a menu that steers toward a predetermined answer.

## Design doc

- **Small change:** a short doc in the conversation covering the agreed points.
- **Small but high risk** (auth, money, migration): short doc in the conversation; writing a doc file is not "building".
- **Project:** a full doc saved as `<feature-slug>-design.md` in the path the user names, else the repository's existing plans/specs/ADR folder, else `docs/plan-implementation/`; committed only if the user wants.

Contents:
- intent and why
- goals, non-goals, anti-goals
- constraints
- approaches considered, trade-offs, chosen approach
- decided details
- what the implementer may decide alone

Several independent projects → agree on an order and run discovery for one at a time.

## Builder check

For projects, before handing the doc over, have a fresh subagent read it as the implementer would and list its questions. Sort them:
- answered by existing context → add to the doc
- minor → decide, mark as your call
- need the person → ask in one message (max 3, each with your proposed default), most important first; the rest become proposals

## Red flags

- Building or scaffolding before approval.
- Asking questions the repository already answers.
- Filling in defaults silently instead of marking them as proposals.
- Skipping the approaches step.
- Treating vague enthusiasm as approval.
- Continuing to build on a spike without re-approval.
