import Expo from 'expo';
import React from 'react';
import { StyleSheet, View, StatusBar } from 'react-native';
import { Provider } from 'react-redux';

import AppViews from './src/AppViews';
import configureStore from './src/reducer/configureStore';

const store = configureStore();

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});

const App = () => (
  <Provider store={store}>
    <View style={styles.container}>
      <StatusBar hidden />
      <AppViews />
    </View>
  </Provider>
);

Expo.registerRootComponent(App);
