import React, { PureComponent, PropTypes } from 'react';
import { View, StyleSheet, Button, Modal } from 'react-native';
import { connect } from 'react-redux';

import Sticker from './Sticker';
import Stickers from './Stickers';
import avatars from '../assets/avatars';
import User from './User';
import AnimatedContainer from './AnimatedContainer';
import fromEllipse from './fromEllipse';
import leaveAction from './actions/leave';
import sendStickerAction from './actions/sendSticker';

const SIZE = 80;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
  },
  footer: {
    flexDirection: 'row',
  }
});

class Room extends PureComponent {
  static propTypes = {
    members: PropTypes.arrayOf(PropTypes.shape({
      userId: PropTypes.string,
      name: PropTypes.string,
      avatar: PropTypes.string,
    })).isRequired,
    leave: PropTypes.func.isRequired,
    sendSticker: PropTypes.func.isRequired,
    sticker: PropTypes.shape({
      id: PropTypes.string,
      userId: PropTypes.string,
    }),
  };

  static defaultProps = {
    sticker: null,
  };

  state = {
    width: 0,
    height: 0,
    showStickers: false,
  };

  componentWillReceiveProps(nextProps) {
    const sticker = nextProps.sticker;
    if (this.props.sticker !== sticker) {
      const members = nextProps.members;
      const pos = members.length
              - members.findIndex(member => member.userId === sticker.userId) - 1;
      const angle = (pos * 2 * Math.PI) / members.length;
      const { x, y } = fromEllipse(this.state.width, this.state.height, angle, SIZE);

      this.incomingSticker.add(sticker, x, y, this.state.width / 2, this.state.height / 2);
    }
  }

  onLayout = (e) => {
    const { width, height } = e.nativeEvent.layout;
    this.setState({
      width, height,
    });
  }

  chooseSticker = (id) => {
    const { sendSticker } = this.props;

    this.setState({
      showStickers: false,
    });

    if (id > 0) {
      sendSticker(id);
    }
  }

  renderMember = (member, idx, zoomFactor) => {
    const { members } = this.props;
    const { width, height } = this.state;

    if (width === 0) {
      return null;
    }

    const pos = members.length - idx - 1;

    // Get x and y coordinate based on position
    const angle = (pos * 2 * Math.PI) / members.length;

    const { x, y } = fromEllipse(width, height, angle, SIZE);
    return (
      <AnimatedContainer key={member.userId} x={x} y={y} scale={zoomFactor}>
        <User name={member.name} avatar={avatars[member.avatar]} />
      </AnimatedContainer>
    );
  }

  render() {
    const { members, leave } = this.props;
    // Decide the zoom factor based on the number of members
    const zoomFactor = members.length < 8 ? 1 : (8 / members.length);

    return (
      <View style={{ flex: 1 }}>
        <Modal
          animationType="slide"
          transparent
          visible={this.state.showStickers}
          onRequestClose={() => this.chooseSticker(-1)}
        >
          <Stickers onChoose={this.chooseSticker} />
        </Modal>
        <View style={styles.container} onLayout={this.onLayout}>
          { members.map((member, idx) => this.renderMember(member, idx, zoomFactor)) }
          <Sticker ref={(node) => { this.incomingSticker = node; }} />
        </View>
        <View style={styles.footer}>
          <View style={{ flex: 1 }}><Button title="Leave" onPress={leave} /></View>
          <View style={{ flex: 1 }}><Button title="Stickers" onPress={() => this.setState({ showStickers: true })} /></View>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  members: state.members,
  sticker: state.sticker,
});

const mapDispatchToProps = dispatch => ({
  leave: () => dispatch(leaveAction()),
  sendSticker: id => dispatch(sendStickerAction(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Room);
