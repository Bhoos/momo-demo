const leave = () => (dispatch, getState, { connection }) => {
  connection.close();
};

export default leave;
