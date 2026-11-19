# Quick browser pass (small changes)

**Use when** the change is small: one component, a style or copy tweak, no new flow, no new route. Anything bigger, a failing command, or a check not listed here: [browser-verification.md](browser-verification.md). No `skills get core` needed for this pass.

**Tool.** `agent-browser --version`. Missing but the host has other browser tools (agent-browser MCP tools, a built-in browser): run the same checks with them and name the tool. None: report every check below as NOT VERIFIED.

**Rules.** Shell variables and cwd do not persist between tool calls: write literal absolute paths in every command. Every command carries `--session <name>` (letters, digits, `-`, `_`). Replace `<abs>` with the absolute evidence directory (implementation: `<project>/.verification`; audit-only: the scratchpad, never the project), `<s>` with the session, `<url>` with the route.

1. **Server.** Reuse an app that is already running. Otherwise start the project's dev server in the background, or for static files `python3 -u -m http.server 0 --bind 127.0.0.1 --directory <abs site dir>` (read the port from its output); record the PID.
2. **Confirm it serves this project:** `curl -s <url> | grep -c '<text unique to this page>'` must be ≥ 1. After any edit, reload with a new `?v=N` query.
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
agent-browser --session <s> console         # no new warnings
agent-browser --session <s> a11y --selector '<changed area selector>' --tags wcag2a,wcag2aa,wcag21a,wcag21aa,wcag22aa
ls <abs>/screenshots
```

4. **Interactive change only:** `snapshot -i`, `press Tab` to the changed control, screenshot the focus ring, activate it with `Enter`/`Space`, then `errors` again.
5. **Look** at both screenshots (layout, wrapping, clipping) before calling them PASS. If you fix something, rerun step 3 with the next `?v=N`; list older captures of the changed area as stale.
6. **Clean up:** `agent-browser --session <s> close`; `kill <your PID>` only for a server you started.

**Report** one line per check, `PASS` / `FAIL` / `NOT VERIFIED` (text, no emoji), with the command and the absolute screenshot paths. Everything this pass skips (other widths, touch, dark mode, reduced motion, full-page axe, CLS) is NOT VERIFIED by choice; say so in one line.

```
PASS  overflow 320px  eval scrollWidth > clientWidth -> false
PASS  errors/console  empty after load
PASS  axe (changed area)  0 violations
NOT VERIFIED  other widths, touch, dark mode, CLS (small change)
Screenshots: <abs>/screenshots/route-375.png, <abs>/screenshots/route-1440.png
```
