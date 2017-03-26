import React, { Component, PropTypes } from 'react';
import { KeyboardAvoidingView, Button, View, Text, TextInput, ScrollView, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';

import avatars from '../assets/avatars';
import join from './actions/join';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
  },
  input: {
    padding: 5,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1
  },
  avatar: {
    width: 40,
    height: 40,
  },
  avatarContainer: {
    width: 60,
    height: 60,
    padding: 10,
  },
  avatars: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  selected: {
    backgroundColor: 'green',
    borderRadius: 10,
  }
});

class Login extends Component {
  static propTypes = {
    name: PropTypes.string,
    avatar: PropTypes.string,
    join: PropTypes.func.isRequired,
  };

  static defaultProps = {
    name: '',
    avatar: null,
  };

  state = {
    name: this.props.name,
    avatar: this.props.avatar,
  };

  onLogin = () => {
    const { name, avatar } = this.state;
    this.props.join(name, avatar);
  }

  renderAvatars() {
    const { avatar } = this.state;
    return Object.keys(avatars).map(avatarId => (
      <TouchableOpacity
        key={avatarId}
        style={[styles.avatarContainer, avatar === avatarId ? styles.selected : null]}
        onPress={() => this.setState({ avatar: avatarId })}
      >
        <Image style={styles.avatar} source={avatars[avatarId]} />
      </TouchableOpacity>
    ));
  }

  render() {
    const { name, avatar } = this.state;

    return (
      <View style={styles.container}>
        <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
          <Text>Nick name</Text>
          <View style={styles.input}>
            <TextInput
              underlineColorAndroid="transparent"
              style={{ flex: 1 }}
              value={name}
              onChangeText={text => this.setState({ name: text })}
            />
          </View>
          <Text>Avatar</Text>
          <ScrollView>
            <View style={styles.avatars}>
              {this.renderAvatars()}
            </View>
          </ScrollView>
          <Button title="Login" onPress={this.onLogin} disabled={name === '' || avatar === null} />
        </KeyboardAvoidingView>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  name: state.name,
  avatar: state.avatar,
});

const mapDispatchToProps = dispatch => ({
  join: (name, avatar) => dispatch(join(name, avatar)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
