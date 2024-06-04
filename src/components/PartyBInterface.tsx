"use client"; // Ensure this is a client component

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PartyBInterface: React.FC = () => {
  const [response, setResponse] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get('/api/settlement');
      setResponse(result.data.message);
    };

    fetchData();
  }, []);

  const handleResponse = async (action: 'agree' | 'dispute') => {
    await axios.post('/api/settlement', { action });
    setResponse(action === 'agree' ? 'Agreed' : 'Disputed');
  };

  return (
    <div className="p-4 border rounded">
      <h2 className="text-xl font-bold mb-4">Party B Interface</h2>
      <p>Current Response: {response}</p>
      <button
        className="bg-green-500 text-white p-2 rounded mr-2"
        onClick={() => handleResponse('agree')}
      >
        Agree
      </button>
      <button
        className="bg-red-500 text-white p-2 rounded"
        onClick={() => handleResponse('dispute')}
      >
        Dispute
      </button>
    </div>
  );
};

export default PartyBInterface;
