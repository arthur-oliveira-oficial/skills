# Quick browser pass (small changes)

**Use when** the change is small: one component, a style or copy tweak, no new flow, no new route. Anything bigger, a failing command, or a check not listed here: [browser-verification.md](browser-verification.md). No `skills get core` needed for this pass.

**Tool.** `agent-browser --version`. Missing but the host has other browser tools (agent-browser MCP tools, a built-in browser): run the same checks with them and name the tool. None: report every check below as NOT VERIFIED.

**Rules.** Shell variables and cwd do not persist between tool calls: write literal absolute paths in every command. Every command carries `--session <name>` (letters, digits, `-`, `_`). Replace `<abs>` with the absolute evidence directory (implementation: `<project>/.verification`; git worktree: `<git-common-dir>/verification/<slug>`; audit-, review- or diagnose-only: the scratchpad, never the project), `<s>` with the session, `<url>` with the route. zsh: for width/height pairs use `while read -r w h` or `bash -c`; `set -- $pair` does not split and the previous viewport is silently kept.

1. **Server.** Reuse an app that is already running. Otherwise start the project's dev server in the background, or for static files `python3 -u -m http.server 0 --bind 127.0.0.1 --directory <abs site dir>` (read the port from its output); record the PID.
2. **Confirm it serves this project:** `curl -s <url> | grep -c '<text unique to this page>'` must be ≥ 1 (client-rendered SPA: grep the `<title>` or bundle name, then confirm after `open` with `wait --text '<page text>'`; route behind login: see Security in browser-verification.md). After any edit, reload with a new `?v=N` query and confirm the edit is live (`get text <sel>` or a computed-style `eval` on what you changed); if stale, `close` and reopen, do not re-edit.
3. **Run:**

```bash
mkdir -p <abs>/screenshots
agent-browser --session <s> errors --clear
agent-browser --session <s> console --clear
agent-browser --session <s> set viewport 320 568
agent-browser --session <s> open '<url>?v=1'
agent-browser --session <s> wait --load load
agent-browser --session <s> eval "document.documentElement.scrollWidth > document.documentElement.clientWidth"   # false
agent-browser --session <s> set viewport 375 812
agent-browser --session <s> screenshot --full <abs>/screenshots/route-375.png
agent-browser --session <s> set viewport 1440 900
agent-browser --session <s> screenshot --full <abs>/screenshots/route-1440.png
agent-browser --session <s> errors          # empty
agent-browser --session <s> console         # no warnings from the changed area
agent-browser --session <s> a11y --selector '<changed area selector>' --tags wcag2a,wcag2aa,wcag21a,wcag21aa,wcag22aa
ls <abs>/screenshots
```

4. **Interactive change only:** `snapshot -i`, `press Tab` to the changed control, screenshot the focus ring, activate it with `Enter`/`Space`, then `errors` again.
5. **Look** at every screenshot (layout, wrapping, clipping; sibling controls equal height, no uneven wrapping) before calling it PASS. Also capture the width the change targets, both sides of any breakpoint you touched, and each state of a toggle on the page. Rerun an invalid or inconclusive measurement (eval error, wrong viewport, stale page) before reporting. If you fix something, rerun step 3 with the next `?v=N`; list older captures of the changed area as stale.
6. **Clean up:** undo forced state (`set media light`, `network unroute`, `set offline off`); `agent-browser --session <s> close`; `kill <your PID>` only for a server you started, then confirm the port is free.

**Report** one line per check, `PASS` / `FAIL` / `NOT VERIFIED` (text, no emoji), with its method (`input` real keyboard/click, `dom` DOM or computed-style read, `stub` scripted), the command, and the absolute screenshot paths. No baseline in this pass: report absolute results and "baseline: not captured". Everything this pass skips (other widths, touch, dark mode, reduced motion, full-page axe, CLS) is NOT VERIFIED by choice; say so in one line.

```
PASS  overflow 320px  dom  eval scrollWidth > clientWidth -> false
PASS  errors/console  dom  empty after load
PASS  axe (changed area)  dom  0 violations
NOT VERIFIED  other widths, touch, dark mode, CLS (small change); baseline: not captured
Screenshots: <abs>/screenshots/route-375.png, <abs>/screenshots/route-1440.png
```
