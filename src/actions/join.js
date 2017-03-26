const join = (name, avatar) => (dispatch, getState, { connection }) => {
  connection.open(name, avatar);

  dispatch({
    type: 'CONNECTING',
    payload: {
      name, avatar,
    },
  });
};

export default join;
