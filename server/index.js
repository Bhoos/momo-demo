const WebSocket = require('ws');

const PORT = 8080;

const server = new WebSocket.Server({ port: PORT });

const clients = {};
let uniqueId = 0;

server.on('connection', (socket) => {
  uniqueId += 1;
  const clientId = uniqueId;

  function clearClient() {
    if (clients[clientId]) {
      socket.close();
      delete clients[clientId];

      // Send a LEAVE message to all the connected clients
      const msg = {
        type: 'LEAVE',
        payload: {
          userId: `${clientId}`,
        },
      };
      Object.keys(clients).forEach(i => clients[i].send(msg));
    }
  }

  function send(msg) {
    try {
      socket.send(JSON.stringify(msg));
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err);
      clearClient();
    }
  }

  // Relay message to all the clients
  socket.on('message', (message) => {
    const msg = JSON.parse(message);
    // Send message to all the clients, injecting the id
    Object.keys(clients).forEach(id => clients[id].send({
      type: msg.type,
      payload: Object.assign({}, msg.payload, {
        userId: `${clientId}`,
      }),
    }));

    // Handle join message uniquely
    if (msg.type === 'JOIN') {
      clients[clientId] = Object.assign({}, msg.payload, {
        send,
      });

      // send in all the connected clients information
      send({
        type: 'MEMBERS',
        payload: {
          clients: Object.keys(clients).map(id => ({
            userId: `${id}`,
            name: clients[id].name,
            avatar: clients[id].avatar,
          })),
        }
      });
    }
  });

  socket.on('error', (e) => {
    // eslint-disable-next-line no-console
    console.error(e);
    clearClient();
  });

  // Remove the client from the list
  socket.on('close', () => {
    clearClient();
  });
});

// eslint-disable-next-line no-console
console.log(`Started WebSocket server at port ${PORT}`);
