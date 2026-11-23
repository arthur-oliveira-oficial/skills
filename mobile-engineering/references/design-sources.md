# Bundled design workflows

## Open the bundled sources

Set `skill_dir` to the absolute path of this skill’s folder. Its [launcher](../scripts/design-sources.sh) reads the [bundled archive](../assets/design-sources.tar.gz) from any project directory. Read the Anthropic guide for a new visual direction or a substantial redesign.

```sh
"$skill_dir/scripts/design-sources.sh" guide
```

For a Taste build, unpack once per task. Keep the resulting path for subsequent commands. This works offline with a standalone copy of this skill. The unpacked directory includes the original manuals, scripts, templates, asset credits, licenses, tests and plugin manifests.

```sh
sources_dir=$("$skill_dir/scripts/design-sources.sh" unpack)
taste="$sources_dir/taste-skill/skills/taste-skill"
printf 'Taste directory: %s\n' "$taste"
cat "$taste/SKILL.md"
```

## Apply the guides to an app screen

Read the Anthropic guide for the brief, then examine the Taste manual and relevant library entries when the design draws on its photography, layout, type, copy or motion. Translate the visual roles into the existing Compose, SwiftUI, UIKit, Views or React Native components. A prominent image might help choose a route on discovery. In active navigation, the next instruction needs that space.

Compare the design with an adjacent screen. Keep action vocabulary, system navigation, text scaling, safe areas and gesture behavior consistent. Exercise the primary journey at compact width, with enlarged text, with reduced motion and with a missing image where relevant. Verify in the app using the [mobile verification guide](verification.md). Use the browser checks below for HTML rendered by a web route, including a PWA or TWA landing page. For a TWA, also exercise the packaged app’s entry and Back behavior on Android.

## Build and verify a Taste page

Follow the unpacked manual from the page brief through handoff. Use the target project as the working directory so the build marker and history belong to the page. The scripts use Node 22+ and a Chromium browser. Set `CHROME_PATH` for a custom browser location. FFmpeg is optional for image conversion and cropping.

For example, begin a bakery site with the following commands. Substitute the actual page, category and primary action. For framework apps use the local dev URL or the built page and its asset root.

```sh
node "$taste/scripts/gate.mjs" --start index.html --kind place --category bakery --primary "Order bread"
node "$taste/scripts/start.mjs" deal --page place --trade bakery
```

Use the manual’s page plan, type and palette tools, starter and layout library. Follow its guides for photography and credits, icons, UI fragments, diagrams, motion, effects and copy as the brief calls for them. In an existing project, bring in the assets used by the page and integrate them with its framework and design system.

Run the manual’s copy, consistency, layout, screenshot and performance checks on the rendered page. Inspect the screenshots, correct findings, rebuild as needed and invoke the finish gate explicitly from the project directory. Report the actual gate result and open findings. The original plugin’s host-specific hook is included in its source package. The parent skills invoke the gate through the CLI.

```sh
node "$taste/scripts/gate.mjs" index.html
```

## Source versions

- Taste Skill 2.5.1, including third-party asset credits. [Original repository at the bundled revision](https://github.com/Leonxlnx/taste-skill/tree/6c0b5c78f5d31776e2210305abaa210cdc0030bf)
- Anthropic frontend-design 1.1.1, including its plugin metadata and licenses. [Original plugin at the requested revision](https://github.com/anthropics/claude-plugins-official/tree/73c8cf3ea7e296057b467990f2f5d61b4c922260/plugins/frontend-design)
