# Android with Kotlin

Identify the app module, Gradle wrapper, variant, minSdk and targetSdk, Compose BOM or Views theme, and navigation library. Check the resolved artifact before using adaptive or expressive APIs. In a Fragment or XML screen, follow its view lifecycle and extend its existing Material components. Use an interop boundary for an isolated Compose feature when it fits the project.

## From navigation to state

- Model top-level destinations separately from actions within one destination. A compact window can use a bottom navigation bar and a wider window a rail. Decide from available window space, including multi-window and folds. For an inbox, keep the message ID and scroll position as the layout changes between one pane and two. [Canonical layouts](https://developer.android.com/develop/ui/compose/layouts/adaptive/canonical-layouts)
- Keep Back consistent with the active navigation owner. In a list-detail flow, closing a sheet precedes leaving the detail. Exercise system Back and cancellation of the predictive gesture on supported devices. Introduce a custom handler only for a specific consumed action.
- Hoist state to the lowest owner shared by its readers and writers. In Compose, pass values and event callbacks to reusable components. Screen-level business state fits a ViewModel with lifecycle-aware collection. Keep pending input or selected IDs in saveable state when recreation must restore them. Reload large records from the repository. A ViewModel alone survives rotation but loses its contents on process death. [Saving UI state](https://developer.android.com/develop/ui/compose/state-saving)
- For a feed with local data, display available items during refresh, indicate failures where retry is possible, and keep bookmarks tied to stable item IDs. Use the app's data and sync strategy. Google's sample illustrates how repositories supply state to the presentation layer. [Now in Android architecture](https://github.com/android/nowinandroid/blob/main/docs/ArchitectureLearningJourney.md)

## Components and layout

Use theme color roles and paired content colors. Start with Material text fields, buttons, dialogs and list items. Let a scaffold own system insets once, then check the last row, bottom action and focused field with gesture navigation and the IME open. In Compose lists use stable keys when reordering can move item state.

Aim for a 48 × 48 dp touch target. A small glyph can sit inside a full-sized IconButton. Avoid overlapping expanded hit areas. Expose toggle role and checked value once on a labeled interactive row, and exclude decorative icons from spoken output. Check large font scale in sp and TalkBack traversal. [Compose accessibility defaults](https://developer.android.com/develop/ui/compose/accessibility/api-defaults)

For Material 3 Expressive, use size, grouping, shape or motion to clarify which action deserves attention. Test that the hierarchy remains readable with dynamic color and reduced animation. Adopt components available in the app's Material version. [Google Design research](https://design.google/library/expressive-material-design-google-research)
