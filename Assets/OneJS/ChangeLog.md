﻿## [2022-11-08] v1.3.5 - useEventfulState()

* Implemented useEventfulState()
* Fixed inconsistent timing between performance.now() and requestAnimationFrame()
* Keep existing unity-* classnames intact for stock controls
* Added IsByRef check in TSDef Converter
* Updated Preact Signals to latest version
* Path Resolver tweak

## [2022-10-13] v1.3.3a - Bundler Changes

* Added user-defined sub-directories for the bundler to ignore during runtime updates

## [2022-10-08] v1.3.3 - Async/await support

* Async/await are now supported in OneJS scripts
* Preact Signals are also now fully supported

* Changed QueuedActions to use PriorityQueue
* Added RadioButton and RadioButtonGroup TS Defs and sample usage
* Fixed issue with relative path loading same modules more than once
* Fixed OneJSBuildProcessor+OnPreprocessBuild _ignoreList issue
* NetSync: Have Server also Broadcast
* Tailwind ParseColor bugfix @LordXyroz

## [2022-09-15] v1.3.1a - ExCSS.Unity fix

* Patched ExCSS.Unity.dll so it doesn't cause conflicts with other Unity packages

## [2022-09-13] v1.3.1 - Minor Bug Fixes

* Fixed turning Live Reload off for Standalone builds
* Add Navigation Events to the TS definitions
* Better UglifyJS error handling
* Adds support for chaining pseudo selectors @Walrusking16
* Tag lookup fix, Dom compliance and ListView example @Sciumo

## [2022-09-01] v1.3.0 - Runtime CSS

You are now able to load CSS strings at runtime via `document.addRuntimeCSS()`. See https://onejs.com/runtimecss for more information.

* Runtime CSS
* Updated Jint to latest
* Copy to Clipboard for TSDefConverter (credit to @Sciumo)
* Added node_modules to JSPathResolver
* _engine.ResetConstraints() in Update Loop
* Action queues without coroutines
* setInterval

## [2022-07-10] v1.2.1 - Minor features and bugfixes

* Implemented onValueChanged for UI Toolkit controls
* Fixed __listeners Linux slowdown
* GameObject Extensions AddComp(), GetComp(), and FindType() fixes
* UIElementsNativeModule handling for 2022.2 and later

## [2022-06-24] v1.2.0 - WorkingDir Rework

You are now able to keep all your scripts under `{ProjectDir}/OneJS`. And the scripts will be automatically bundled into`{persistentDataPath}/OneJS` for Standalone builds.

* Added a Bundler component that is responsible for extracting scripts.
* Added OneJSBuildProcessor ScriptableObject that is responsible for packaging scripts (for Standalone builds).
  * This is generally automatic as it uses OnPreprocessBuild
  * It also provides glob ignore patterns for things you don't want to include in the bundle.
* Added `[DefaultExecutionOrder]` for various components.
* Added an extra option (`Poll Standalone Screen`) on the Tailwind component to allow you to also watch for screen changes for standalone builds.

## [2022-06-19] v1.1.2 - Bugfixes

* Fixed various preact cyclic reference errors
* Fixed preact diff bug (missing parentNode)
* Fixed Tailwind StyleScale regression in 2021.3

## [2022-06-08] v1.1.1 - Flipbook and more Tailwind support

### Newly Added:

* Flipbook Visual Element
* Negative value support for Tailwind

### Minor Bug fixes:

* Opacity bugfix
* Preact useContext bugfix
* Preact nested children bugfix

## [2022-05-26] v1.1.0 - Tailwind and Multi-Device Live Reload

### New Features:

* Tailwind
* Multi-Device Live Reload
* USS transition support in JSX

### Other Notables:

* Completely reworked Live Reload's File watching mechanism to conserve more CPU cycles. Previously it was using  FileSystemWatcher (poor performance when watching directories recursively).
* New GradientRect control (allows linear gradients with 4 corners, demo'ed in the fortnite ui sample)

### Minor Bug fixes:

* Fixed Double to Single casting error during Dom.setAttribute
* Fixed object[] casting during Dom.setAttribute
* Fixed unityTextAlign style Enum bug
* Fixed overflow style Enum bug
* Fixed a bunch of setStyleList bugs

## [2022-05-16] v1.0.0 - Initial Release

* Full Preact Integration with 1-to-1 interop with UI Toolkit
* Live Reload
* C# to TS Def converter