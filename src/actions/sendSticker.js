const sendSticker = id => (dispatch, getState, { connection }) => {
  connection.sendSticker(id);
};

export default sendSticker;
