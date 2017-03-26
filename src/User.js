import React, { PropTypes } from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    width: 80,
    height: 80,
    backgroundColor: '#eee',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 10,
  },
  image: {
    width: 60,
    height: 60,
  },
  name: {
    fontWeight: 'bold',
    backgroundColor: 'transparent',
    position: 'absolute',
    textAlign: 'center',
    padding: 1,
    bottom: 0,
    width: 80,
    fontSize: 8,
  },
});

const User = ({ name, avatar }) => (
  <View style={styles.container}>
    <Image style={styles.image} source={avatar} />
    <Text allowFontScaling={false} style={styles.name}>{name}</Text>
  </View>
);

User.propTypes = {
  name: PropTypes.string.isRequired,
  avatar: Image.propTypes.source.isRequired,
};

export default User;
