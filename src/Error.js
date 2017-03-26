import React, { PropTypes } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontWeight: 'bold',
    borderBottomWidth: 1,
    borderBottomColor: 'black',
  },
});

const Error = ({ error, back }) => (
  <View style={styles.container}>
    <Text style={styles.title}>ERROR</Text>
    <Text>{error}</Text>
    <Button title="Back" onPress={back} />
  </View>
);

Error.propTypes = {
  error: PropTypes.string.isRequired,
  back: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  error: state.error,
});

const mapDispatchToProps = dispatch => ({
  back: () => dispatch({ type: 'DISCONNECT' }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Error);
