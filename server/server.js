const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 4000 });

wss.on('connection', (ws) => {
  ws.on('message', (message) => {
    const data = JSON.parse(message);
    if (data.type === 'updateAmount') {
      ws.send(JSON.stringify({ type: 'updateAmount', amount: data.amount }));
    }
  });
});

console.log('WebSocket server running on ws://localhost:4000');
