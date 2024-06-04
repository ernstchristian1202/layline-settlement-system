"use client";

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PartB: React.FC = () => {
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

  const handleResponse = async (responseStatus: string) => {
    const response = await axios.post('http://localhost:3001/api/respond', { status: responseStatus });
    setAmount(response.data.amount);
    setStatus(response.data.status);
  };

  return (
    <div>
      <h1>Party B Interface</h1>
      <p>Settlement Amount: {amount}</p>
      <p>Current Status: {status}</p>
      <button
        className="bg-green-500 text-white p-2 rounded mr-2"
        onClick={() => handleResponse('agreed')}
      >
        Agree
      </button>
      <button
        className="bg-red-500 text-white p-2 rounded"
        onClick={() => handleResponse('disputed')}
      >
        Dispute
      </button>
    </div>
  );
};

export default PartB;
export { PartB };
