import React, { Component } from 'react';
import { View, Image, StyleSheet } from 'react-native';

import allStickers from '../assets/stickers';
import FlyBy from './FlyBy';

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});

class Sticker extends Component {
  constructor(props) {
    super(props);

    this.state = {
      stickers: [],
    };
  }

  add(sticker, sx, sy, ex, ey) {
    const { stickers } = this.state;

    // make sure the same sticker is not added twice
    if (stickers.find(s => s.id === sticker.id && s.userId === sticker.userId)) {
      return;
    }

    this.setState({
      stickers: stickers.concat({ id: sticker.id, userId: sticker.userId, sx, sy, ex, ey }),
    });
  }

  renderSticker = (item) => {
    const { id, userId, sx, sy, ex, ey } = item;
    return (
      <FlyBy
        key={`${userId}-${id}`}
        start={{ x: sx, y: sy }}
        end={{ x: ex, y: ey }}
        onComplete={() => this.setState({ stickers: this.state.stickers.filter(i => i !== item) })}
      >
        <Image source={allStickers[item.id]} resizeMode="contain" style={{ width: 80, height: 40 }} />
      </FlyBy>
    );
  }

  render() {
    const { stickers } = this.state;
    return (
      <View style={styles.container}>
        {stickers.map(this.renderSticker)}
      </View>
    );
  }
}

export default Sticker;
