import React, { Component, PropTypes } from 'react';
import { Animated } from 'react-native';

class AnimatedContainer extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired,
    scale: PropTypes.number.isRequired,
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      position: new Animated.ValueXY({ x: props.x, y: props.y }),
      opacity: new Animated.Value(0),
    };

    Animated.timing(this.state.opacity, {
      toValue: 1,
      duration: 500,
    }).start();
  }

  componentWillReceiveProps(nextProps) {
    Animated.spring(this.state.position, {
      toValue: { x: nextProps.x, y: nextProps.y },
    }).start();
  }

  render() {
    const { opacity, position } = this.state;
    const style = {
      position: 'absolute',
      opacity,
      ...position.getLayout(),
      transform: [
        { scale: opacity.interpolate({
          inputRange: [0, 1],
          outputRange: [1, this.props.scale]
        }) }
      ]
    };

    return (
      <Animated.View style={style}>
        {this.props.children}
      </Animated.View>
    );
  }
}

export default AnimatedContainer;
