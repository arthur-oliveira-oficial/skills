---
name: mobile-engineering
description: Designs, implements, and reviews Android and iOS app features in Kotlin (Jetpack Compose or Views), Swift (SwiftUI or UIKit), and React Native (including Expo), plus Progressive Web Apps (PWA) and Android Trusted Web Activities (TWA). Use for mobile UI/UX, 2026 mobile design trends, component selection, navigation, adaptive layouts, app lifecycle, accessibility, and device verification. Também para criar, corrigir ou auditar telas e fluxos de aplicativos móveis. Use for web app installation, offline flows, Bubblewrap packaging, Digital Asset Links, Android Studio, USB device testing with adb, Xcode, TestFlight, Google Play and App Store submission readiness.
license: MIT
metadata:
  version: "1.5.1"
---

# Mobile engineering

Start with the user's task and its entry and exit points. For example, a person filtering trips must be able to see which filters apply, inspect a trip, and return to the same results. Use this journey to choose components and decide what to test.

1. Inspect the nearest comparable feature, design tokens, navigation owner, supported OS versions and build commands. In a mixed app, trace the actual entry point to the module that renders the screen. Keep existing frameworks and dependencies where they fit.
2. For design or critique, tie each proposal to a user action, a platform convention and an observable outcome. For implementation, carry the chosen interaction through navigation, data ownership, accessibility and recovery. Match the deliverable to the request.
3. Plan the states that change the user's next action. On a search screen, for example, distinguish the first visit, an empty result, a refresh of visible data and a failed request. Specify what a dismissal, retry or Back does to entered data.
4. Verify the affected journey through the app's normal entry point. Name the platform, configuration and result for each check. Distinguish a preview, a build, an automated interaction and an on-device observation in the report.

## Choose the relevant guide

For branded mobile UI, a visual redesign, or a Taste or Anthropic design request, use the [bundled design workflows](references/design-sources.md). Apply the native design review to app screens and the complete web build and browser checks to a Taste page delivered through a PWA or TWA.

| When working on | Read |
| --- | --- |
| Kotlin, Compose, Material 3, Views, foldables or Android Back | [Android implementation](references/android.md) |
| Swift, SwiftUI, UIKit, iPhone or iPad navigation | [Apple implementation](references/apple.md) |
| React Native, Expo, cross-platform navigation or component kits | [React Native implementation](references/react-native.md) |
| Installable web apps on Android or iOS, offline behavior and service worker updates | [PWA implementation](references/pwa.md) |
| Android packaging of a web app, signing or unexpected browser chrome | [Trusted Web Activity](references/twa.md) |
| Android Studio, running on a physical Android phone over USB or collecting Logcat evidence | [Android USB testing](references/android-usb.md) |
| Play Console, signing an AAB, testing tracks or Google Play policy review | [Google Play release](references/google-play.md) |
| Xcode on a physical iPhone, archiving, TestFlight or App Store Review | [Xcode and App Store release](references/app-store.md) |
| A 2026 visual direction, current mobile UI/UX trends or a reference-led redesign | [2026 mobile design patterns](references/mobile-design-2026.md) |
| Implementing a flow seen in a mobile app, such as a playback queue, offline map, quoted reply or order tracker | [Interaction patterns from 20 apps](references/app-interactions.md) |
| A screen concept, branded visual hierarchy or component choice | [Patterns and research](references/patterns.md) |
| A changed flow, accessibility audit or suspected device-specific regression | [Verification](references/verification.md) |

For a shared React Native screen, use the native guide for the specific behavior that differs. In a new app, follow the requested stack. If the user leaves it open, base the choice on target platforms, native integrations, existing team code and the cost of maintaining separate UIs.

Respond in the user's language, defaulting to Brazilian Portuguese when unclear. Follow repository language for persisted artifacts.
