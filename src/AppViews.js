import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import Login from './Login';
import Loading from './Loading';
import Room from './Room';
import Error from './Error';

const AppViews = ({ connection }) => {
  if (connection === 'connecting') {
    return <Loading />;
  } else if (connection === 'open') {
    return <Room />;
  } else if (connection === 'error') {
    return <Error />;
  }

  return <Login />;
};

AppViews.propTypes = {
  connection: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  connection: state.connection,
});

export default connect(mapStateToProps)(AppViews);
