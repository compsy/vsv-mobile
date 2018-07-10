# Getting Started

## Requirements
### Required:
* Node.js
* Xcode 8.0+ (for iOS Development)
* Android Studio or at least Android SDK (for Android Development)


### Recommended:
* Atom IDE
  * Nuclide

## Environment Setup
First, clone the repository:
```
$ git clone https://github.com/compsy/vsv-mobile
```

Now navigate in your console to the vsvnative directory:
```
$ cd vsv-mobile/vsvnative
```

Install the dependencies for the project (for this step you must have Node.js installed with npm):
```
$ npm install
```

That's all! You're now ready to develop. We used Atom IDE with Facebook's nuclide package, but use whatever is most confortable.

## Testing Using Simulators
While developing, you can use simulators for both Android and iOS for quick testing.

### Using the iOS Simulator
Using the iOS Simulator requires that you have a recent version of Xcode and are therefore using MacOSX as your operating system.

To use the iOS simulator, simply navigate to the vsvnative directory and use:
```
$ react-native run-ios
```

This should begin running the iOS simulator and building your application. The app will start once it is built and the simulator is running.

You can use:
<kbd>⌘</kbd> + <kbd>R</kbd> to reload the application.
<kbd>⌘</kbd> + <kbd>D</kbd> to open the developer menu.

### Using the Android Emulator
Using the Android Emulator requires that you have a recent version of Android Studio with Android Virtual Device (AVD) set up.

First, create an AVD and run it.

Then, to use the Android emulator, simply navigate to the vsvnative directory and use:
```
$ react-native run-android
```

This should begin building and running the application on the Android emulator.

You can use:
<kbd>⌘</kbd> or <kbd>Ctrl</kbd> + <kbd>R</kbd> to reload the application.
<kbd>⌘</kbd> or <kbd>Ctrl</kbd> + <kbd>D</kbd> to open the developer menu.

## Building to Device
You can build your application to device for iOS or Android to use for development or for release. The process is the same as detailed in the React Native official documentation here:
https://facebook.github.io/react-native/docs/running-on-device.html

