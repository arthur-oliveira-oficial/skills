# Delivery: receiving review and finishing the branch

## Contents
- Receiving code review
- Finishing a development branch
- Rationalizations

## Receiving code review

Technical correctness over social comfort. Verify before implementing; ask before assuming.

**Response pattern**
1. Read all feedback before reacting.
2. Restate each item as a concrete requirement, or ask about it.
3. Check it against the codebase.
4. Evaluate: is it correct **for this codebase**?
5. Respond with a brief acknowledgment or reasoned pushback.
6. Implement one item at a time, testing each.

**Unclear items:** if any item is unclear, implement nothing yet — ask about the unclear items first, since related items may depend on each other.

**By source**
- **The human partner:** implement once understood; ask if scope is unclear.
- **External reviewers (people, bots, other agents):** be careful and skeptical. Check whether it breaks existing behavior, why the current code exists, compatibility constraints, and whether the reviewer had full context. Flag what you cannot verify.
- **Conflicts with decisions the human already made:** stop and discuss before changing anything.

**YAGNI check:** for suggestions to add "proper"/"professional" features (extra config, abstraction, validation), search for actual usage. Unused → propose dropping the suggestion. Used → implement it properly.

**Order:** clarify → blocking issues (breakage, security) → simple fixes (typos, imports) → complex fixes (logic, refactors). Run tests after each; check for regressions.

**Push back when** the suggestion breaks functionality, the reviewer lacks context, it adds unused features, it is technically wrong for this stack, legacy/compatibility constraints apply, or it conflicts with architecture decisions. Be specific: cite code, tests, or constraints. Escalate architectural disagreements to the human.

**Tone**
- No performative agreement ("Great point!", "You're absolutely right!") and no thanking — state the fix or just make it.
- If your pushback was wrong, correct it factually in one or two sentences and move on.
- On GitHub, reply inside the inline comment thread, not as a top-level PR comment.

## Finishing a development branch

Run when implementation is complete and reviewed.

1. **Verify:** run the full test suite (plus lint, types, build). Any failure → report and stop; no options until it passes.
2. **Detect the environment:**
   ```bash
   git rev-parse --git-dir --git-common-dir   # differ → inside a worktree
   git branch --show-current                  # empty → detached HEAD
   ```
3. **Determine the base branch** the work forked from. If unclear, ask before merging.
4. **Present the options** and wait for the choice:
   1. Merge locally into the base branch.
   2. Push and open a pull request.
   3. Keep the branch as-is.
   4. Discard the work.
   (Detached HEAD: push as a new branch and open a PR, or keep as-is.)
5. **Execute:**
   - **Merge:** update the base branch, merge, **re-run tests on the merged result**. Failure → stop and investigate, leaving branch and worktree intact. Success → clean up and delete the feature branch.
   - **PR:** push, open the PR against the base branch (`gh pr create`), include the evidence report and residual risk in the body, report the URL, keep the worktree for feedback.
   - **Keep:** report where the branch and worktree are.
   - **Discard:** only on explicit request; the human must type `discard` to confirm; then delete the branch (force) and worktree.
6. **Clean up** (after merge or confirmed discard):
   - Worktrees this workflow created under `.worktrees/`: `git worktree remove <path>` then `git worktree prune`.
   - If removal is refused because of uncommitted files, **never force it**: show the files and let the human commit, move, or delete them.
   - Leave worktrees the host environment created alone.

Merging, pushing, and opening PRs are external side effects: do them only after the human picks that option.

## Rationalizations

| Excuse | Reality |
|---|---|
| "They obviously want it merged" | Ask; merge is an external side effect. |
| "Push was rejected, I'll force it" | Never; fetch, rebase or merge, re-test, and ask if unsure. |
| "'Get rid of it' means discard" | Discard requires typing `discard`. |
| "Tests passed on the branch, the merge is fine" | Re-run on the merged result. |
| "The reviewer is right, just do it" | Verify against the codebase first. |
