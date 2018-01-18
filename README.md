# Using Segment with React Native and Client Sources

This app demonstrates building a React Native app using the Segment Analytics iOS native library, and also an additional client destination (Firebase).  This project only implements iOS libraries for the moment.  Sorry Expo folks, but this approach *will not* work with Expo unless you eject your project, as there is currently no JavaScript only implementation for Segment in a React Native client.  Also using client sources is currently only supported using client libraries.

Why only use native libs?  Native libs offer superior performance on mobile clients.  Also, you get control over the size of your mobile binaries by controlling which libs are bundled with your app.  For hybrid apps, this gives you the ability to track all parts of your application. In the react-native parts of your app, you only need to use the React Native calls for tracking, Segment takes care of calls to whatever other client libs you need.

## Pre-Requisites

1. A Firebase account
2. A Segment account + write key
3. Cocoapods (for your native client libs)
4. [Segment react-native library](https://github.com/tonyxiao/react-native-analytics)

## Overview

1. Podfile

Since this integration uses native libraries, you have to get the Firebase and Segment libs using Cocoapods.

```
# Pods for SegmentNativeClientLibsTest
pod 'Analytics', '~> 3.0'
pod 'Segment-Firebase'
```

After `pod install` you will have to use Xcode workspaces to build this project.  This is a Cocoapods requirement.

2. React Native Packages

`yarn add react-native-analytics`

This library is community developed and provides a RN Native wrapper around the Segment client libraries (including Android).

```
"dependencies": {
  "react": "16.2.0",
  "react-native": "0.52.0",
  "react-native-analytics": "^0.1.2"
},
```

Make sure that your iOS app project in your workspace contains the RNSegmentIOAnalytics.m and .h files from the iOS cocoapod for react-native-analytics, otherwise you will not be able to link your project.  This is a current limitation of the community developed project.

3. Segment Analytics

This approach initializes the Segment Analytics singleton object in native code, at app startup (see `AppDelegate.m`):

```
#import <Analytics/SEGAnalytics.h>
#import <Segment-Firebase/SEGFirebaseIntegrationFactory.h>
...
- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  ...

  SEGAnalyticsConfiguration *configuration = [SEGAnalyticsConfiguration configurationWithWriteKey:@"<YOUR SEGMENT WRITE KEY>"];
  configuration.trackApplicationLifecycleEvents = NO; // Enable this to record certain application events automatically!
  configuration.recordScreenViews = NO; // Enable this to record screen views automatically!
  [configuration use:[SEGFirebaseIntegrationFactory instance]];
  [SEGAnalytics debug:YES];
  [SEGAnalytics setupWithConfiguration:configuration];

  ...
}
```

Configuration options are documented here in the [Segment mobile sources for iOS](https://segment.com/docs/sources/mobile/ios/) library docs.

Note the `[configuration use:[SEGFirebaseIntegrationFactory instance]];` tells Segment to add the Firebase client library to the list of sources for this client.

4. Firebase

Make sure that you have your `GoogleService-Info.plist` file in the root of your app project, and the Xcode is bundling this in your app.  This is required for the Firebase client to start properly.

*IMPORTANT*

Make sure that Firebase is added as a source in your Segment console, and that it is enabled.  Segment analytics will ignore the Firebase client in your app if you do not do this.

If you are having issues getting data to Firebase, you can enable Firebase debug mode in Xcode by adding -FIRDebugEnable to the start params for the simulator.
