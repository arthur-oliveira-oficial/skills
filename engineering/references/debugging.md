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
- A failing test first (or a reproduction script if there is no framework).
- One fix at the root cause, with no unrelated changes.
- Verify: the test passes, nothing else broke, the original problem is gone.
- Fix failed? Count attempts. Fewer than 3 → back to phase 1. **3 or more → stop and discuss the architecture with the human.** Repeated failures indicate a structural problem, not a wrong hypothesis.

## Red flags (back to phase 1)

- "Quick fix now, investigate later."
- Changing something to see if it works.
- Several changes bundled before running tests.
- Skipping the test and relying on manual verification.
- Proposing a fix before tracing the data flow.
- "Just one more attempt" after two failures.
- Each fix reveals a new problem somewhere else.

Signals from the human that you're off track: questions showing you assumed without checking; requests for evidence you skipped; frustration with the approach.

## Supporting techniques

- **Defense in depth:** after finding the cause, validate at more than one layer (input, domain, database) when the cost of recurrence is high.
- **Condition-based waiting:** replace arbitrary `sleep`/timeouts with polling for the real condition (eliminates flaky tests).
- **Bisect:** `git bisect run <test-command>` to find the commit that introduced the regression.
- **Performance:** measure first (profiler, flame graph, `EXPLAIN ANALYZE`), change one thing, measure again. Never optimize without measurement.
- **Genuinely environmental or timing cause:** document what was investigated, add appropriate handling (retry with backoff, timeout, clear error message), and add logging.
