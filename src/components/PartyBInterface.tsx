"use client";

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PartyBInterface: React.FC = () => {
  const [amount, setAmount] = useState<number | null>(null);

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:4000');
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === 'updateAmount') {
        setAmount(data.amount);
      }
    };

    axios.get('/api/settlement').then(res => {
      setAmount(res.data.amount);
    });

    return () => {
      ws.close();
    };
  }, []);

  const handleResponse = (response: string) => {
    axios.post('/api/settlement', { response }).then(res => {
      // Handle response
    });
  };

  return (
    <div className="bg-white p-4 rounded shadow mt-4">
      <h1 className="text-xl font-bold mb-2">Party B: Review Settlement Amount</h1>
      {amount !== null ? <p>Proposed Amount: {amount}</p> : <p>Loading...</p>}
      <button 
        onClick={() => handleResponse('agree')} 
        className="bg-green-500 text-white p-2 rounded mr-2"
      >
        Agree
      </button>
      <button 
        onClick={() => handleResponse('dispute')} 
        className="bg-red-500 text-white p-2 rounded"
      >
        Dispute
      </button>
    </div>
  );
};

export default PartyBInterface;
export { PartyBInterface };