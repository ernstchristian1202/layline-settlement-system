"use client"; // Ensure this is a client component

import React, { useState } from 'react';
import axios from 'axios';

const SettlementForm: React.FC = () => {
  const [amount, setAmount] = useState<number>(0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await axios.post('/api/settlement', { amount });
  };

  return (
    <div className="p-4 border rounded">
      <h2 className="text-xl font-bold mb-4">Settlement Form</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          placeholder="Enter amount"
          className="border p-2 w-full mb-4"
          required
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Submit
        </button>
      </form>
    </div>
  );
};

export default SettlementForm;
