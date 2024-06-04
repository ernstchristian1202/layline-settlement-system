const express = require('express');
const bodyParser = require('body-parser');
const next = require('next');
const ws = require('ws');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const settlementState = {
  amount: 0,
  response: '',
};

app.prepare().then(() => {
  const server = express();

  server.use(bodyParser.json());

  server.get('/api/settlement', (req, res) => {
    res.json({ amount: settlementState.amount, message: settlementState.response });
  });

  server.post('/api/settlement', (req, res) => {
    const { amount, action } = req.body;
    if (amount !== undefined) {
      settlementState.amount = amount;
    }
    if (action) {
      settlementState.response = action === 'agree' ? 'Agreed' : 'Disputed';
    }
    res.json(settlementState);
  });

  server.all('*', (req, res) => {
    return handle(req, res);
  });

  const wsServer = new ws.Server({ noServer: true });

  wsServer.on('connection', (socket) => {
    socket.on('message', (message) => {
      const data = JSON.parse(message);
      if (data.type === 'update') {
        settlementState.amount = data.amount;
        settlementState.response = data.response;
      }
      wsServer.clients.forEach((client) => {
        if (client.readyState === ws.OPEN) {
          client.send(JSON.stringify(settlementState));
        }
      });
    });
  });

  const port = process.env.PORT || 3000;
  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });

  server.on('upgrade', (request, socket, head) => {
    wsServer.handleUpgrade(request, socket, head, (ws) => {
      wsServer.emit('connection', ws, request);
    });
  });
});
