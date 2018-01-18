/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';

import Analytics from 'react-native-analytics';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

export default class App extends Component<{}> {
  render() {

    // Test analytics - this is not the normal place you would put this in a
    // React Native app but I am being lazy here

    // If you are using just the Segment Analytics library, you can call Analytics.setup here,
    // otherwise if you are adding additional client libraries via Cocoapods,
    // you will want to init everything in the AppDelegate.m file, as shown in this
    // project. This configuration does not require a setup call from javascript code,
    // which is actually prefereable as 12F configuration with Xcode and React Native leaves
    // a lot to be desired.

    //Analytics.setup("<YOUR SEGMENT WRITE KEY HERE>", 30);

    // These calls are made via the Segment Analytics cocoapod. React Native bridging is
    // provided via Tony Xiao's Analytics RN wrapper:
    // https://github.com/tonyxiao/react-native-analytics

    Analytics.identify("snc_user", {"name":"test name"});
    Analytics.track("snc_test_track", {"name":"test track with name"});
    Analytics.screen("snc_home", {"screenType":"TEST APP HOME SCREEN"});

    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Segment React Native Test App
        </Text>
        <Text style={styles.instructions}>
          This app demonstrates Segment and Firebase calls from a React Native app.
        </Text>
        <Text style={styles.instructions}>
          {instructions}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
