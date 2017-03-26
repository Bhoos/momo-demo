import React, { Component, PropTypes } from 'react';
import { Animated } from 'react-native';

const coordinate = PropTypes.shape({
  x: PropTypes.number,
  y: PropTypes.number,
});

class FlyBy extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired,
    start: coordinate.isRequired,
    end: coordinate.isRequired,
    onComplete: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      anim: new Animated.Value(0),
    };
  }

  componentDidMount() {
    const { onComplete } = this.props;
    this.animation = Animated.timing(this.state.anim, {
      toValue: 1,
      duration: 1500,
    });
    this.animation.start(() => {
      onComplete();
    });
  }

  componentWillUnmount() {
    this.animation.stop();
  }

  render() {
    const { anim } = this.state;
    const { start, end } = this.props;
    const style = {
      position: 'absolute',
      left: anim.interpolate({
        inputRange: [0, 1],
        outputRange: [start.x, end.x],
      }),
      top: anim.interpolate({
        inputRange: [0, 1],
        outputRange: [start.y, end.y],
      }),
      opacity: anim.interpolate({
        inputRange: [0, 0.2, 0.8, 1],
        outputRange: [0, 1, 1, 0],
      }),
    };

    return (
      <Animated.View style={style}>
        {this.props.children}
      </Animated.View>
    );
  }
}

export default FlyBy;
