# Trusted Web Activity for Android

A TWA launches a hosted HTTPS web app in a supporting Android browser. The browser renders the site and manages its web storage and service worker. Use this route when the deliverable includes an Android package for an origin the publisher controls. For an iPhone Home Screen experience, use the PWA installation flow. [Chrome TWA quick start](https://developer.chrome.com/docs/android/trusted-web-activity/quick-start)

## Build the wrapper

1. Confirm the production web manifest URL, final launch origin after redirects, Android application ID, intended distribution channel and who controls the website association file. Trace the key user journey in the browser first. Fix web UI and offline behavior in the web app.
2. Reuse the existing Android Browser Helper or Bubblewrap project. For a new wrapper, initialize Bubblewrap in its own directory from the deployed web manifest, then review the generated package ID, launch URL, icons, theme and signing configuration. For example, adapt `bubblewrap init --manifest=https://example.com/app/manifest.webmanifest` to the actual deployment. Run `bubblewrap build` and install its signed APK on the test device. Use the signed app bundle for a Play distribution workflow. Preserve the signing identity and increment the Android version code for package updates. [Bubblewrap walkthrough](https://developer.chrome.com/docs/android/trusted-web-activity/quick-start)
3. Declare the trusted web origin in the wrapper. At each trusted origin, serve `/.well-known/assetlinks.json` over HTTPS with status 200, JSON content type and no redirect. Include relation `delegate_permission/common.handle_all_urls`, target namespace `android_app`, the exact package name and the SHA-256 fingerprint of the certificate signing the installed APK. With Play App Signing, use the app-signing certificate from Play Console for the Play build. A sideloaded test can have a different signer. Keep test associations on the test origin. [Android website associations](https://developer.android.com/training/app-links/configure-assetlinks)
4. Walk through redirects, login and checkout. When a second controlled origin must stay inside the TWA, configure it in the wrapper and serve its association there too. A third-party identity or payment origin should show browser controls. Check the return to the verified origin and Android Back. [Multi-origin TWAs](https://developer.chrome.com/docs/android/trusted-web-activity/multi-origin)

## Diagnose an unexpected address bar

| Observation | Next check |
| --- | --- |
| Bar appears at launch | Record the actual URL after redirects and the browser provider. Fetch the association on that exact origin and inspect the status, body and content type. Compare the package and certificate against the installed APK. |
| Sideload works but the Play build shows a bar | Compare the installed release signer with the website statement. Use the Play app-signing fingerprint for Play delivery. The upload key serves a different step. Recheck using a build delivered by the intended Play track. |
| Bar appears only when leaving the launch host | Trace the sequence of origins. Verify both sides of the association for each intended trusted host. Expect a Custom Tab toolbar on an external origin and check that returning restores the trusted presentation. |

Test the installed package from its launcher icon on Android. Record build channel, signer fingerprint, browser provider, final origin and toolbar behavior. Exercise Back, an external link and the promised offline route after warming the cache. An APK build or a successful JSON fetch alone covers only part of this journey.
