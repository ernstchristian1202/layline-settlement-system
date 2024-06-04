"use client";

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PartA: React.FC = () => {
  const [amount, setAmount] = useState(0);
  const [status, setStatus] = useState('');

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:3001');
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setAmount(data.amount);
      setStatus(data.status);
    };

    return () => {
      ws.close();
    };
  }, []);

  const handleSubmit = async () => {
    const response = await axios.post('http://localhost:3001/api/submit', { amount });
    setAmount(response.data.amount);
    setStatus(response.data.status);
  };

  return (
    <div>
      <h1>Party A Interface</h1>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
      />
      <button type="submit" className="bg-blue-500 text-white p-2 rounded" onClick={handleSubmit}>Submit</button>
      <p>Current Status: {status}</p>
    </div>
  );
};

export default PartA;
export { PartA };
