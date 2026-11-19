# Systematic debugging

**Law:** no fix without root-cause investigation. Applies to simple bugs, failing tests, build failures, integration issues, and performance — especially under time pressure or when the fix "seems obvious".

## Four phases (complete each before the next)

### 1. Investigate the root cause
- Read error messages and stack traces **completely**.
- Reproduce consistently. Can't reproduce? Gather more data (logs, inputs, environment) instead of guessing.
- Check recent changes: commits (`git log`, `git bisect`), dependencies, configuration, environment.
- In multi-component systems, log data and state at each boundary to find where it breaks.
- Trace the data flow **backward** to the origin of the bad value.

### 2. Analyze patterns
- Find similar working examples in the same codebase.
- Read reference implementations completely.
- List **every** difference between the working and broken cases, however small.
- Identify dependencies, settings, and assumptions.

### 3. Hypothesis and testing
- One specific hypothesis: "I think X causes the problem because Y."
- Test with the smallest possible change, one variable at a time.
- Failed? New hypothesis — don't stack fixes.
- Don't understand something? Say so, research, or ask.

### 4. Implement
- A failing test first (no test infrastructure: Iron law 3 in `SKILL.md`).
- One fix at the root cause, with no unrelated changes.
- Verify: the test passes, nothing else broke, the original problem is gone.
- Fix failed? Count attempts. Fewer than 3 → back to phase 1. **3 or more → stop and discuss the architecture with the human.** Repeated failures indicate a structural problem, not a wrong hypothesis.

## Red flags (back to phase 1)

- "Quick fix now, investigate later."
- Changing something to see if it works.
- Several changes bundled before running tests.
- Skipping the test and relying on manual verification.
- Proposing a fix before tracing the data flow.
- "Just one more attempt" without returning to phase 1.
- Each fix reveals a new problem somewhere else.

Signals from the human that you're off track: questions showing you assumed without checking; requests for evidence you skipped; frustration with the approach.

## Supporting techniques

- **Browser reproduction (web bugs):** reproduce the exact user path with `agent-browser` (setup per verification-and-evidence.md): `open` → `snapshot -i` → act → observe. Collect `errors`, `console`, and `network requests` at the failing step; capture the repro with screenshots at absolute paths in the evidence directory (`<evidence>/repro-1.png`), or `record start <evidence>/repro.webm` if ffmpeg is installed. Session names, paths, and cleanup follow "Browser evidence for web behavior" in verification-and-evidence.md. For React apps, `--enable react-devtools` at launch (fresh session), then `react tree` / `react inspect` to read props and state. Keep the repro as evidence and turn it into a failing automated test when the project has an E2E layer.
- **Defense in depth:** after finding the cause, validate at more than one layer (input, domain, database) when the cost of recurrence is high.
- **Condition-based waiting:** replace arbitrary `sleep`/timeouts with polling for the real condition (eliminates flaky tests).
- **Bisect:** never in the user's checkout. `git worktree add --detach <scratch>/bisect <bad>`, install deps there, `git -C <scratch>/bisect bisect start <bad> <good>`, `bisect run <test-command>` (exit 125 skips an unbuildable commit), then `bisect reset` and `git worktree remove <scratch>/bisect`.
- **Performance:** measure first (profiler, flame graph, `EXPLAIN ANALYZE`), change one thing, measure again. Never optimize without measurement.
- **Genuinely environmental or timing cause:** document what was investigated, add appropriate handling (retry with backoff, timeout, clear error message), and add logging.
