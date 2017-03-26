import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import reducer from './';

// Configure the server URL here
const URL = 'ws://localhost:8080/';
// const URL = 'wss://demo.bhoos.com:8443/';

const connection = {
  socket: null,
  store: null,

  send(obj) {
    this.socket.send(JSON.stringify(obj));
  },

  open(name, avatar) {
    const ws = new WebSocket(URL);

    ws.onopen = () => {
      this.send({
        type: 'JOIN',
        payload: { name, avatar },
      });
    };

    ws.onmessage = (e) => {
      const msg = JSON.parse(e.data);
      this.store.dispatch(msg);
    };

    ws.onerror = (e) => {
      this.store.dispatch({
        type: 'ERROR',
        payload: {
          message: e.message,
        },
      });
    };

    this.socket = ws;
  },

  close() {
    this.socket.close();
    this.socket = null;
    this.store.dispatch({
      type: 'DISCONNECT',
    });
  },

  sendSticker(id) {
    this.send({
      type: 'STICKER',
      payload: {
        id,
      },
    });
  }
};

const configureStore = () => {
  const store = createStore(reducer, applyMiddleware(thunk.withExtraArgument({ connection })));
  connection.store = store;
  return store;
};

export default configureStore;
