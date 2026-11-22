# Run and test on a physical Android phone over USB

## Connect from Android Studio

1. Open the project's Android Gradle root in Android Studio (often the `android/` directory in React Native). Let Gradle sync, then choose the app run configuration and the intended build variant. In SDK Manager → SDK Tools, install Android SDK Platform-Tools. For a terminal, put the SDK's `platform-tools` directory on PATH or invoke its `adb` by absolute path.
2. On the phone, open Settings → About phone and tap **Build number** seven times to enable Developer options. The exact location varies by manufacturer. Turn on **USB debugging** and unlock the phone. Use a data-capable USB cable. Accept the RSA authorization prompt for the development computer. On Windows, install the OEM USB driver if needed. On Ubuntu, check the USB udev rules and plugdev membership. macOS normally needs no extra driver. [Hardware device setup](https://developer.android.com/studio/run/device)
3. Run `adb devices -l`. Identify the USB handset by model and serial, and confirm its state is `device`. In Studio, select that same handset in the target menu and click **Run**. Use **Debug** when a breakpoint is part of the check. Open Logcat with the same device and app process selected.

## Repeat an APK test from the terminal

Example for a POSIX shell. Use the actual serial, APK path and application ID of the chosen variant. The Gradle task shown assumes an app module called `app` with a plain debug variant. A flavored build may instead have a task such as `:app:assembleStagingDebug`. [ADB command reference](https://developer.android.com/tools/adb) · [Android Studio build artifacts](https://developer.android.com/build/build-for-release)

```sh
adb version
adb devices -l
device_serial='REPLACE_WITH_USB_SERIAL'
app_id='com.example.app.debug'
apk_path='app/build/outputs/apk/debug/app-debug.apk'

./gradlew :app:assembleDebug
adb -s "$device_serial" install -r "$apk_path"
adb -s "$device_serial" shell am start -W -a android.intent.action.MAIN -c android.intent.category.LAUNCHER -p "$app_id"
adb -s "$device_serial" shell getprop ro.build.version.sdk
```

Expect install success and the intended activity on the phone. Exercise a named journey, such as launch → sign in using test data → open detail → Android Back. Check what happens on screen. For a crash, reproduce it and inspect `adb -s "$device_serial" logcat -b crash -d` or the app's filtered Logcat in Studio. Record the model, Android version, variant, steps and observed result. Remove personal data and tokens from shared logs.

| Symptom | What to check |
| --- | --- |
| No handset listed | Check cable data support, USB port and USB debugging. Reconnect with the screen unlocked. On Windows or Linux, check host drivers or device permissions. |
| `unauthorized` or `offline` | For unauthorized, unlock and confirm the RSA prompt. For offline, reconnect and check Platform-Tools. Studio's Tools → Troubleshoot Device Connections can rescan USB and restart ADB. Restarting the ADB server affects other sessions. |
| Multiple targets | Keep the selected serial on every device command. An emulator and a phone may both be listed as `device`. |
| Signature mismatch during reinstall | Check package ID and signing certificate. Use a compatible signed build or a separate debug application ID. Uninstalling the existing app removes its local data. |
| Only an AAB is available | Use bundletool to generate and install matching APKs or install via a Play test track. For TWA signature verification, test the build delivered by the intended channel. |

For a browser-installed PWA, navigate to the test origin on the phone and install from the browser. There is no project APK to install for that path. For a TWA, test both the website and the installed wrapper.
