# Progressive Web Apps on Android and iOS

Start with the routes people use in a browser and the specific value of installing the app. For a field checklist, that value might be opening today's saved work without a signal. Establish which actions require a connection and how long a draft must survive. Inspect the existing manifest, hosting base path, routing and service worker registration before choosing a plugin or adding a worker.

## Installation and standalone UX

- Link a web app manifest from the entry pages. Serve the production app over HTTPS. Give the app a stable same-origin `id`, recognizable name, launcher icons at 192 and 512 pixels, and a separately tested maskable icon when appropriate. Choose an in-scope `start_url` and a display mode such as `standalone`. For a deployment under `/field/`, verify both the installed launch URL and a direct link under that prefix. Manifest scope determines the app's navigation boundary. Worker registration scope determines which pages it can control. [Installability guide](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Guides/Making_PWAs_installable)
- In a browser exposing `beforeinstallprompt`, save the event and offer Install at a useful moment. Invoke the prompt from a user action, consume the event once, and let dismissal return directly to the task. On iPhone, offer Safari's Share → Add to Home Screen instructions when needed, including Open as Web App on versions that show it. Keep the journey usable from a tab and suppress install promotion in standalone mode. [web.dev installation prompt](https://web.dev/learn/pwa/installation-prompt) · [Apple iPhone guide](https://support.apple.com/guide/iphone/open-as-web-app-iphea86e5236/27/ios/27)
- Without a browser toolbar, provide a visible route back from detail screens, including direct entries with no app history. Keep primary actions above the home indicator and reachable with the keyboard open. Preserve browser Back semantics. If push is part of the feature, feature-detect it and ask after the user opts into a concrete notification. Exercise that flow from the iOS Home Screen. [WebKit Home Screen web apps](https://webkit.org/blog/13878/web-push-for-web-apps-on-ios-and-ipados/)

## Offline and updates

| Resource or action | Behavior to implement and verify |
| --- | --- |
| App shell and versioned assets | Precache the assets needed for the promised offline route. An offline HTML fallback belongs to document navigation. Preserve the response type for API calls and assets. Test a previously unopened route after warming the shell. |
| Previously loaded records | Choose which records may be stored and show their last refresh when freshness matters. Give an uncached record an explicit offline state. For account-scoped storage, isolate accounts and clear their cached data on sign-out. |
| Edits during loss of signal | For online-only submission, preserve the draft and offer retry. If offline submission is promised, persist the pending operation, show its status and deduplicate retries at the server. Retry in the foreground when background sync is unavailable. Show success after acknowledgement. |
| New service worker | Keep cache names scoped to the app. Test version A open with a draft while version B is deployed. Coordinate activation, compatible assets and reload so the draft survives. Remove obsolete app caches when their clients no longer need them. [Service worker lifecycle](https://web.dev/articles/service-worker-lifecycle) |

For verification, install from a clean profile and launch from the icon. Exercise the same route in a tab and standalone. Open online, disconnect, close and relaunch, then reconnect and check recovery. Record the browser, OS, installation path and which data was cached before disconnecting.

The community PWA skill on skills.sh illustrates a minimal shell cache. Choose the caching policy per resource and account when applying that pattern to an existing app. [PWA skill](https://www.skills.sh/ffsshhttiikk/opencode-agents-skills/pwa)
