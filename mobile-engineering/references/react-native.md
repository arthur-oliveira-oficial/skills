# React Native and Expo

Inspect package.json, lockfile, native build configuration or Expo app config, route entry points, theme provider and installed native modules. Match APIs to the installed RN and Expo versions. Use the existing navigator and build workflow. A dependency with native code outside the installed client needs a compatible native build.

## Build a shared flow

1. Keep route identity, fetch logic, validation and draft state shared when their meaning matches. In Expo Router, represent a detail with a route parameter. In React Navigation, use a screen in the existing stack and pass a stable ID. Test cold links and returning via iOS swipe and Android system Back. [Expo Router navigation](https://docs.expo.dev/router/basics/navigation/) · [Native stack](https://reactnavigation.org/docs/native-stack-navigator/)
2. Let the navigator own its header and insets. Apply the remaining safe-area and keyboard insets where the screen owns custom content. On each OS, open the keyboard, reach the last input, submit, then dismiss. Check for doubled padding or an obscured action. Use platform-specific components when picker presentation or dismissal semantics differ.
3. For long or changing feeds, use the project's virtualized list, stable IDs and external state for selection. With FlatList, pass changing dependencies through props such as extraData when required. Only provide getItemLayout when the dimensions remain predictable at supported font scales. Profile scrolling in a release-like build before replacing a list library. [FlatList](https://reactnative.dev/docs/flatlist)
4. Give interactive controls a label, role and state. A filter chip can announce its label and selected state through accessibilityState. Group a row only when its children represent one action. Test independent secondary actions with VoiceOver and TalkBack because grouping behavior differs. [React Native accessibility](https://reactnative.dev/docs/accessibility)

For adjacent icon actions, size the pressable container first. If using `hitSlop`, check the parent bounds and any sibling drawn above it. Taps outside the parent cannot reach the pressable, and an overlapping sibling can receive the tap. Exercise the facing edges of both controls on each target OS. [React Native Pressable](https://reactnative.dev/docs/pressable)

For async search, use the app's query cache or associate each request with a generation. Only the active generation can update results, errors or loading state. Clearing the field invalidates the outstanding request. In a controlled test, resolve the newer query first, then let the older one succeed or fail. Also clear the field before a response arrives.

## Pick the smallest component that fits

| Project need | Candidate and decision |
| --- | --- |
| Existing Material theme and standard forms | Paper supplies Material controls. Reuse its themed text inputs, buttons and helper text. Keep field labels visible after entry and expose errors to assistive technology. [React Native Paper](https://reactnativepaper.com/) |
| Shared branded controls and responsive overlays | Tamagui offers composable sheets. Check the selected renderer's keyboard, dismissal and gesture behavior, especially when the sheet contains a scrolling list. [Tamagui Sheet](https://tamagui.dev/styled-ui/sheet) |
| Existing bespoke component language | Restyle supplies typed theme variants for building blocks. Define variants by intent and provide interaction and accessibility behavior in the actual control. [Shopify Restyle](https://shopify.github.io/restyle/fundamentals/variants/) |
| Native SwiftUI or Compose control inside an Expo app | Evaluate the relevant @expo/ui binding against the project's SDK and target OS. Keep business state above the platform-specific control. [Expo UI skill](https://www.skills.sh/expo/skills/expo-ui) |

A form bug rarely warrants a new kit. Reproduce it with the installed control, compare its documented contract, and verify the smallest compatible change on each target OS.
