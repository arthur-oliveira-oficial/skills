# Mobile UI/UX patterns for 2026

Research reviewed on November 22, 2026. Apple and Google presentations document platform directions. Shipped products show a design in use, and portfolio studies show a designer's proposal. The implementation choices and checks below are recommendations inferred from those sources. When updating this guide, date the observation and check the API against the project's supported versions.

## Pick a direction from the task

| What the person is trying to do | Pattern to consider | Decision to make first |
| --- | --- | --- |
| Find a trip, file or song | Scoped search or a dedicated search destination | Is the search space the current list or the whole catalog? |
| Browse full-bleed media while controlling it | System navigation and controls over content | Which controls must remain reachable as content scrolls? |
| Find the next action on a branded screen | Expressive typography, shape and semantic color | Which action or state deserves the strongest visual emphasis? |
| Move between phone, foldable and tablet | Continuous list-detail layout | What selection, draft and scroll position must survive resizing? |
| Follow a ride, delivery or live event | Glanceable status outside the app | What event changes the user's next action, and when does tracking end? |
| Turn an outline into something editable | Assistance inside the existing editor | What can the user inspect, correct or discard before applying? |

### Search that communicates its scope

At WWDC26 Apple demonstrated how search placement depends on navigation structure. In a travel app, give **Search trips** its own destination when discovery spans the catalog. Place **Search this itinerary** inside an itinerary when it filters only local entries. For a few recent bookings, a local field may cover the whole need. Put active date or destination filters next to results so a person can explain why a trip disappeared. [WWDC26 search design](https://developer.apple.com/videos/play/wwdc2026/292/) · [Paradise Travel, May 2026 portfolio study](https://www.behance.net/gallery/248779363/Paradise-Travel-Mobile-App-UXUI)

Use SwiftUI's searchable navigation or a search-role tab where supported. In Compose use the project's Material search component and navigation owner. For RN and web, give the search route or local field the same scope and an accessible name.

Select a result, go back and change one filter. The query, remaining filters and place in results should survive. When there are zero matches, clearing filters and retrying a failed network request are distinct actions.

### System materials over scrolling content

Liquid Glass predates 2026. The WWDC26 refinement gives people control over its appearance, from clearer to more tinted. In a music screen, let the tab bar and player controls occupy the system control layer while track names and artwork remain easy to scan. In a reading or finance screen, a solid surface can give dense content a dependable background. [WWDC26 keynote](https://developer.apple.com/videos/play/wwdc2026/101/) · [SwiftUI refinements](https://developer.apple.com/videos/play/wwdc2026/269/)

Start with native bars on Apple platforms. On Android use the app's Material surface and content color roles. For RN or a PWA, a solid themed toolbar provides a baseline across devices.

Scroll the brightest and darkest artwork behind the controls, change transparency preferences where supported, enlarge text and reach the final item. The action label and selected destination must remain distinguishable throughout.

### Expressive hierarchy and recognizable branding

Material 3 Expressive continues the direction introduced in 2025. Google's 2026 retrospective highlights tactile components that adapt across form factors. Apple's 2026 branding session shows how typography, tint and imagery can carry identity alongside familiar controls. One practical translation for booking is a distinctive destination headline, stable text styles for prices and dates, and a filled **Reserve** button beside a quieter **Save** action. [Google Design, 2026](https://design.google/library/design-company-of-year-2026) · [WWDC26 branding examples](https://developer.apple.com/videos/play/wwdc2026/251/)

Define semantic roles for accent, on-accent text, selection and critical status. Use a label or checkmark as a second selection cue. Preserve font scaling when using custom type. A short shape or motion change can acknowledge a selection. Keep its final state visible with motion reduced.

In dark mode and at the largest supported text size, ask someone to identify the next action and the selected option before tapping. A destructive action needs its own label and placement.

### Adaptive layouts that preserve the work

Google's 2026 resizability guidance highlights a concrete case where a bottom action moves offscreen in a wider, shorter window. For an orders workspace, use one pane in a narrow window and a list beside the selected order when width permits. Keep the order ID, unsaved note and list position above the layout that switches. Base the change on available space, including when the keyboard is open. [Android's 2026 adaptive guidance](https://android-developers.googleblog.com/2026/02/prepare-your-app-for-resizability-and.html) · [Canonical layouts](https://developer.android.com/develop/ui/compose/layouts/adaptive/canonical-layouts)

Compose adaptive navigation and SwiftUI split views can present the same selection differently. In RN observe the app window size. In a PWA or TWA use the available layout width and keep the selected record addressable by URL.

Select the twentieth order, type a note, resize twice and return. The order, note and place in the list survive, and Save is reachable in the shortest window.

### Progress at a glance, inside and outside the app

Google's illustrated templates use a continuous track for rideshare and segmented stages for delivery. Apple's WWDC26 Live Activities session shows how a live score can fit compact and expanded presentations. Choose the representation from the data. An ETA can change, a completed stage is discrete, and an unknown duration calls for a status label. [Android visual examples](https://developer.android.com/design/ui/mobile/guides/home-screen/live-updates) · [WWDC26 Live Activities](https://developer.apple.com/videos/play/wwdc2026/223/)

For a pickup, show the current phase and useful time first. When the driver arrives, bring the pickup instruction forward. Use ActivityKit or a supported Android Live Update for an ongoing user-initiated task. Keep an in-app status screen available for RN, PWA, TWA and devices where the external surface is unavailable or disabled.

Delay an update, cancel the trip, finish a second trip and open each from its status surface. An old ETA should expire, cancellation should end tracking and navigation should open the correct trip.

### AI assistance with an editable result

Apple's 2026 Design Awards feature Detail, an editor that turns an outline into a teleprompter script. The transferable pattern is a specific transformation in a workflow someone already understands. In a notes app, place **Draft summary** beside the note and present the result in an editable preview with **Use summary** and **Discard**. Preserve the original note and the manual editing path. [2026 Apple Design Awards, Detail](https://developer.apple.com/design/awards/) · [Google Design on multimodal interaction](https://design.google/library/design-company-of-year-2026)

Keep source, suggestion and committed text separate. If the person changes the source while generation is running, prevent a late result from overwriting their edits. Announce completion once to assistive technology.

Cancel a slow generation, edit the source, then deliver the old response. The editor should retain the user's changes. Offer this pattern when drafting is part of the requested task.

## Use in a design review

For a travel booking brief, specify the screen sequence before choosing visual treatments. On discovery, search the full catalog. On detail, keep price and availability legible over real imagery. After booking, expose live status only while there is an event to follow. Compare the proposed and existing flows on the same task, including one interruption such as Back, loss of signal or a window resize. Record what was observed and which design decision it supports.

## Brand-specific skills for a design brief

- **Duolingo-inspired learning.** HKTITAN's community skills cover interaction design and gamification. For a lesson, distinguish feedback on one answer from celebration on completion. Show a correction and a next action after an error. Test with sound off and Reduce Motion enabled so the learner still knows what happened. Use the product's own characters and voice. [duo-design source](https://github.com/hktitan/duolingo/blob/HEAD/skills/duo-design/SKILL.md) · [duo-gamification on skills.sh](https://www.skills.sh/hktitan/duolingo/duo-gamification) · [Duolingo brand voice](https://design.duolingo.com/writing/duo)
- **Shopify merchant workflows.** Shopify publishes its own toolkit. Its repository marks the dedicated Polaris App Home skill as deprecated and directs users to the consolidated shopify skill. For an embedded merchant app, use the Polaris resource index to design an orders view with search, filters, status and a clear path to details. For a native app, adapt this information hierarchy using the project's native components. Polaris App Home web components run inside Shopify admin. [Shopify skill on skills.sh](https://www.skills.sh/shopify/shopify-ai-toolkit/shopify) · [Maintainer's deprecation notice](https://github.com/Shopify/shopify-ai-toolkit/blob/HEAD/deprecated/shopify-polaris-app-home/SKILL.md) · [Official index pattern](https://shopify.dev/docs/api/app-home/latest/patterns/templates/resource-index)
- **Spotify-inspired media browsing.** Ihlamury's community skill describes dark surfaces, typography and spacing derived from the website. Treat its palette as a sketch. Its suggested primary text and base background yield about 2.4:1 contrast together, too low for body text. For a mobile library, use recognizable artwork, readable title and artist, and persistent playback controls. Verify Play/Pause announces the action available and a docked player leaves the final track reachable. Real Spotify integrations also have artwork and attribution requirements. [spotify-ui-skills on skills.sh](https://www.skills.sh/ihlamury/design-drift/spotify-ui-skills) · [Skill source](https://github.com/ihlamury/design-drift/blob/HEAD/skills/brands/spotify/SKILL.md) · [Spotify partner guidelines](https://developer.spotify.com/documentation/design)
