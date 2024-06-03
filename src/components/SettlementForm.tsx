"use client";

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SettlementForm: React.FC = () => {
  const [amount, setAmount] = useState<number | string>('');
  const [response, setResponse] = useState<string | null>(null);
  const [lastModified, setLastModified] = useState<string | null>(null);

  useEffect(() => {
    axios.get('/api/settlement').then(res => {
      setAmount(res.data.amount);
      setResponse(res.data.response);
      setLastModified(res.data.lastModified);
    });
  }, []);

  const handleSubmit = () => {
    axios.get('/api/settlement').then(res => {
      if (res.data.lastModified !== lastModified) {
        alert('Party B has responded. Please refresh the page.');
      } else {
        axios.post('/api/settlement', { amount: Number(amount) }).then(res => {
          setResponse(null);
          setLastModified(res.data.lastModified);
        });
      }
    });
  };

  return (
    <div className="bg-white p-4 rounded shadow">
      <h1 className="text-xl font-bold mb-2">Party A: Submit Settlement Amount</h1>
      <input 
        type="number" 
        value={amount} 
        onChange={(e) => setAmount(e.target.value)} 
        className="border p-2 rounded mb-2 w-full"
      />
      <button onClick={handleSubmit} className="bg-blue-500 text-white p-2 rounded">
        Submit
      </button>
      {response && <p className="mt-2">Party B's Response: {response}</p>}
    </div>
  );
};

export default SettlementForm;
export { SettlementForm };