# iOS with Swift

Read deployment targets, schemes, existing view controllers or SwiftUI scene roots, presentation styles and asset catalogs. Keep navigation in the owner already coordinating the feature. A UIKit navigation controller can push a hosting controller for a SwiftUI detail without introducing a second navigation bar.

## Navigation and ownership

- Use tabs for peer destinations and retain the user's place in each. Use a navigation stack for drill-down. When a regular-width window can support side-by-side browsing, use a split view with an explicit selection. Check what appears when the window collapses with an item selected. Apple's Food Truck sample gives a runnable example for an orders workflow. [Tab bars](https://developer.apple.com/design/human-interface-guidelines/tab-bars) · [Split views](https://developer.apple.com/design/human-interface-guidelines/split-views) · [Food Truck sample](https://developer.apple.com/documentation/swiftui/food-truck-building-a-swiftui-multiplatform-app)
- Present a bounded task such as choosing filters in a sheet. Decide whether edits apply immediately or on Done. For deferred edits, keep a local draft, commit once on Done, and treat swipe dismissal consistently with Cancel. At large text sizes let the sheet grow or scroll so both the last field and completion action remain reachable. [Sheets](https://developer.apple.com/design/human-interface-guidelines/sheets)
- Keep transient view state near its owner. Pass a binding when a child edits a parent-owned value. Use the project's observation mechanism for shared model data. For async search tied to the query, handle cancellation and discard superseded responses. Verify returning to a screen preserves the expected selection and draft. [Managing UI state](https://developer.apple.com/documentation/swiftui/managing-user-interface-state)

For top-level sections such as Saved and Browse, keep Saved available when it has no items and explain how to add the first one. Switch sections after scrolling, return, and verify the user resumes in the same place. [Apple tab bars](https://developer.apple.com/design/human-interface-guidelines/tab-bars)

## Legibility and interaction

For a frequent swipe action such as Archive, provide the same command in an onscreen menu or button. Try it by touch and through VoiceOver, then check focus after the row disappears. [Apple accessibility guidance](https://developer.apple.com/design/human-interface-guidelines/accessibility)

Use text styles that participate in Dynamic Type. Let horizontal label/value pairs stack when enlarged. Use system colors, SF Symbols with accessible names when interactive, and a comfortable 44 × 44 pt hit region for common controls. Inspect VoiceOver order and spoken values on a real task. [Apple UI design tips](https://developer.apple.com/design/tips/) · [Larger Text evaluation](https://developer.apple.com/help/app-store-connect/manage-app-accessibility/larger-text-evaluation-criteria)

Let system bars and navigation controls adopt the available material. If custom Liquid Glass serves a specific navigation or control role, check API availability against the minimum OS, provide the existing supported appearance on older systems, and test Reduce Transparency, Increase Contrast and Reduce Motion over varied content. Keep reading surfaces legible as they scroll under bars. [Liquid Glass](https://developer.apple.com/documentation/technologyoverviews/liquid-glass) · [Layout and safe areas](https://developer.apple.com/design/human-interface-guidelines/layout)
