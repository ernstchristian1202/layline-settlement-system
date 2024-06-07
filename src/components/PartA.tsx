"use client";

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { StatusBadge, Colors } from '../components';

const PartA: React.FC = () => {
  const [amount, setAmount] = useState<number>(0);
  const [statusStr, setStatusStr] = useState<string>('');
  const [statusColor, setStatusColor] = useState<string>('');

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:3001');
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setAmount(data.amount);
      setStatusStr(data.status);
    };

    return () => {
      ws.close();
    };
  }, []);

  useEffect(() => {
    switch (statusStr) {
      case 'pending':
        setStatusColor(Colors.PENDING);
        break;
      case 'agreed':
        setStatusColor(Colors.AGREE);
        break;
      case 'disputed':
        setStatusColor(Colors.DISPUTE);
        break;
      
      default:
        break;
    }
  }, [statusStr]);

  const handleSubmit = async () => {
    const response = await axios.post('http://localhost:3001/api/submit', { amount });
    setAmount(response.data.amount);
    setStatusStr(response.data.status);
  };

  return (
    <div className='flex flex-col'>
      <div className='flex justify-between items-center mb-2'>
        <h1>Party A Interface</h1>
        <div className='w-10 h-10 flex items-center justify-center rounded-full bg-gray-500 text-white font-medium'>
          A
        </div>
      </div>
      <p>Current Status: &nbsp;{statusStr !== '' && <StatusBadge status={statusStr} color={statusColor} />}</p>
      <input
        type='number'
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
        className='my-5'
      />
      <button type='submit' className='bg-blue-500 text-white p-2 rounded' onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default PartA;
export { PartA };
