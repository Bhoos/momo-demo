import React from 'react';
import { View, ActivityIndicator, StyleSheet, Text } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
});

const Loading = () => (
  <View style={styles.container}>
    <ActivityIndicator animating />
    <Text>Connecting...</Text>
  </View>
);

export default Loading;
