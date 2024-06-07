'use client';

import React, { FC, useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../app/auth/AuthContext';
import StatusBadge, { Colors } from './StatusBadge';

const PartB: FC = () => {
  const [amount, setAmount] = useState(0);
  const [statusStr, setStatusStr] = useState<string>('');
  const [statusColor, setStatusColor] = useState<string>('');
  const { user } = useAuth();

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

  const handleResponse = async (responseStatus: string) => {
    const response = await axios.post('http://localhost:3001/api/respond', { status: responseStatus });
    setAmount(response.data.amount);
    setStatusStr(response.data.status);
  };

  return (
    <div>
      <div className='flex flex-col'>
        <div className='flex justify-between items-center mb-2'>
          <h1>Party B Interface</h1>
          <div className='w-10 h-10 flex items-center justify-center rounded-full bg-gray-500 text-white font-medium'>
            {user}
          </div>
        </div>
        <p>Current Status: &nbsp;{statusStr !== '' && <StatusBadge status={statusStr} color={statusColor} />}</p>
        <input
          readOnly
          type='number'
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          className='my-5'
        />
      </div>
      <button className='bg-blue-500 text-white p-2 rounded mr-5' onClick={() => handleResponse('agreed')}>Agree</button>
      <button className='bg-red-500 text-white p-2 rounded' onClick={() => handleResponse('disputed')}>Dispute</button>
    </div>
  );
};

export default PartB;
export { PartB };
