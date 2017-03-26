import React, { Component, PropTypes } from 'react';
import { View, Image, Button, TouchableOpacity, StyleSheet } from 'react-native';

import stickers from '../assets/stickers';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#8886',
    justifyContent: 'flex-end',
  },
  innerContainer: {
    borderRadius: 10,
    backgroundColor: '#fff8',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  imageContainer: {
    width: 100,
    height: 60,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 80,
    height: 40,
  }
});

class Stickers extends Component {
  renderSticker = (id) => {
    const { onChoose } = this.props;
    return (
      <TouchableOpacity style={styles.imageContainer} key={id} onPress={() => onChoose(id)}>
        <Image style={styles.image} source={stickers[id]} resizeMode="contain" />
      </TouchableOpacity>
    );
  }

  render() {
    const { onChoose } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.innerContainer}>
          {Object.keys(stickers).map(this.renderSticker)}
        </View>
        <Button title="Close" onPress={() => onChoose(-1)} />
      </View>
    );
  }
}

Stickers.propTypes = {
  onChoose: PropTypes.func.isRequired,
};

export default Stickers;
