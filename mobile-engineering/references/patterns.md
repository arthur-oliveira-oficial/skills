# Choosing mobile UI patterns

Choose the screen by what the person needs to do. Identify what must be visible before the first action, what can wait until selection, and what must survive Back. The examples below are design recommendations derived from the linked material. Recheck official guidance for the platform and SDK used by the project.

## Visual identity across a flow

Choose the detail that helps someone make the decision at each step. In a trail app, a landscape photo helps a hiker recognize a destination while browsing. Keep distance and ascent aligned across rows so routes are easy to compare. Once navigation starts, give the next turn and its distance the prominent position. Carry the trail identity through its name and marker, using the app’s familiar navigation and controls.

Exercise both screens with a long trail name, enlarged system text and an unavailable photo. The hiker should still be able to distinguish two routes, select one and read the next turn. If the photograph carries essential information about the route, surface that fact in accessible text as well.

## Patterns by task

| User task | Compact layout and component choice | Adaptation or failure to exercise |
| --- | --- | --- |
| Find a known item | Search field, scannable result rows and a detail destination. Show applied filters near results. | Preserve query and scroll on return. Give no matches a clear-filters action. Show a retry for a failed search. |
| Explore unfamiliar options | Use image-led cards when imagery helps the choice. Put comparable facts in the same position on each card. | On wider windows add columns while keeping reading order stable. At large text sizes allow cards to grow. |
| Compare and act on records | Use aligned list rows, a persistent selection and an adjacent detail pane when space allows. | Collapse the same selection into a detail route on narrow windows. Handle deletion of the selected record. |
| Narrow a result set | Show a few frequent choices inline. Put complex or multi-group filters in a sheet with a clear commit model. | Make selection perceptible through text, shape or a checkmark. A removable chip needs a spoken action and an adequate hit area. |
| Complete a form or booking | Group related fields. Use a platform picker where it reduces entry errors. Show a primary action that names the outcome. | Keep entered values on validation failure. Put feedback by the field and reveal it above the keyboard. Prevent duplicate submission while a request is pending. |
| Change a setting | Group labeled rows by purpose. Use a switch for an immediate binary change, a picker for an exclusive choice and a detail row for deeper configuration. | Expose the current value before activation. If persistence fails, reconcile the visible setting with the stored one and explain recovery. |
| Track changing activity | Show a short summary above chronological rows. Use a chart when shape or comparison adds meaning. | Provide a readable value or trend summary alongside the chart. Separate stale data, pending changes and successful completion. |

## Reading visual references

- **Travel discovery.** The GetYourGuide concept emphasizes ratings, content hierarchy and the path from browsing to booking. For a trip detail, place price and booking action where someone deciding on that trip can find both. Test with a long destination name and unavailable dates. The portfolio describes design intent and supplies no conversion measurement. [GetYourGuide redesign on Behance](https://www.behance.net/gallery/249299785/GetYourGuide-App-Redesign-UX-Case-Study-Travel-App)
- **Personal finance.** Swift Save combines expense tracking, monthly spending and transaction history. Borrow the distinction between an overview and individual records. For disputed charges, give the history and transaction detail a direct route even when the chart is prominent. [Swift Save on Behance](https://www.behance.net/gallery/239687041/Swift-Save-Finance-App-UX-Case-Study)
- **Filter vocabulary.** Mobbin catalogs filled, outlined, removable and menu-opening chips across shipped products. Pick the affordance from the effect of tapping it. A trailing removal icon and a disclosure indicator imply different outcomes. [Mobbin chip examples](https://mobbin.com/glossary/chip)
- **Adaptive workspaces.** Compare Apple's order-management example with Google's list-detail and supporting-pane layouts. Keep a selection visible beside its detail when users switch repeatedly between items. A secondary pane also works for controls that act on the main content. [Food Truck](https://developer.apple.com/documentation/swiftui/food-truck-building-a-swiftui-multiplatform-app) · [Android canonical layouts](https://developer.android.com/develop/ui/compose/layouts/adaptive/canonical-layouts)

For a redesign informed by current platform and product examples, use the [2026 mobile design patterns](mobile-design-2026.md).

## Skills.sh survey

Use these as implementation leads when the project matches their prerequisites. For a version-sensitive choice, confirm it in the installed SDK's documentation.

| Skill | Reusable idea and when it applies |
| --- | --- |
| [Android adaptive](https://www.skills.sh/android/skills/adaptive) | Check the project's Compose and navigation setup before selecting a multi-pane strategy. Preserve the existing stack for a change scoped to one screen. |
| [SwiftUI Expert](https://www.skills.sh/avdlee/swiftui-agent-skill/swiftui-expert-skill) | Inspect state ownership and view identity before tuning a SwiftUI view. Check availability of newer APIs against deployment targets. |
| [Expo building-native-ui](https://www.skills.sh/expo/skills/building-native-ui) | Start from native controls and consult the relevant interaction guide when building an Expo screen. |
| [Vercel React Native skills](https://www.skills.sh/vercel-labs/agent-skills/vercel-react-native-skills) | For a slow feed, examine list rendering, image cost and animation work. Measure the affected interaction in the actual app. |
