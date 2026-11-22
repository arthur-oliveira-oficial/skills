# Verify the mobile journey

Choose checks that exercise the changed behavior. Use the app's existing test harness, scheme, build variant and device targets. Record the OS, device or simulator, action and observed outcome. A simulator can exercise navigation and layout. Physical hardware is valuable when the claim concerns camera behavior, haptics, sustained frame rate or a particular fold posture.

| Change | Exercise | Observable result |
| --- | --- | --- |
| List, detail or navigation | Select a record after scrolling, open its detail, change window size and return via system navigation. | The record keeps its identity. Back reaches the expected destination. The list resumes at the expected position. |
| Input or async save | Open the keyboard on the last field, enter a long value, submit twice during latency, then simulate a recoverable failure and retry. | The action stays reachable, pending feedback appears, edits survive failure and one intended save completes. |
| Search and filters | Send two searches and deliver the older response last. Apply a filter with no matches, then clear it. | The newest query owns the results. The empty state has an exit. Clearing restores the appropriate result set. |
| A custom control or overlay | Navigate using VoiceOver on iOS or TalkBack on Android. Open, operate and dismiss the overlay. | Label, role and state are spoken. Background controls are unreachable while modal. Focus returns to a meaningful control. |
| Adaptive or expressive layout | Try compact and expanded windows, enlarged text, dark mode and reduced motion as applicable. Scroll to the last action. | Text and controls remain reachable, contrast holds over moving content and the user can finish with motion reduced. |
| State that must survive interruption | Background and resume. Separately recreate the Android activity or terminate and relaunch when persistence is part of the contract. | Check transient, saved and durable values against their specified lifetimes. Report which interruption was exercised. |

For Kotlin use the repository's Gradle wrapper and the relevant unit or connected Compose/Espresso test. For Swift use its Xcode scheme and an available simulator with XCTest or UI tests. In React Native, component tests cover state and callbacks. Use a native build on each affected OS for system Back, the keyboard, native modules and screen-reader behavior. Report unavailable targets and the checks actually completed.
