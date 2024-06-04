const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const WebSocket = require('ws');

const app = express();
const port = 3001;

app.use(bodyParser.json());
app.use(cors());

let currentSettlementAmount = 0;
let currentSettlementStatus = '';

// Initialize a simple server
const server = app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

// Initialize the WebSocket server instance
const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
  console.log('New client connected');
  // Send the current state to the newly connected client
  ws.send(JSON.stringify({
    amount: currentSettlementAmount,
    status: currentSettlementStatus
  }));

  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

const broadcast = (data) => {
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(data));
    }
  });
};

app.post('/api/submit', (req, res) => {
  currentSettlementAmount = req.body.amount;
  currentSettlementStatus = 'pending';
  broadcast({ amount: currentSettlementAmount, status: currentSettlementStatus });
  res.json({ amount: currentSettlementAmount, status: currentSettlementStatus });
});

app.post('/api/respond', (req, res) => {
  currentSettlementStatus = req.body.status;
  broadcast({ amount: currentSettlementAmount, status: currentSettlementStatus });
  res.json({ amount: currentSettlementAmount, status: currentSettlementStatus });
});
