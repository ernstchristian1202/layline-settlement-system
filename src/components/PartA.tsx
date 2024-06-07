'use client';

import React, { FC, useState, useEffect } from 'react';
import axios from 'axios';
import { StatusBadge, Colors } from '../components';
import { useAuth } from '../app/auth/AuthContext';

const PartA: FC = () => {
  const [amount, setAmount] = useState<number>(0);
  const [statusStr, setStatusStr] = useState<string>('');
  const [statusColor, setStatusColor] = useState<string>('');
  const [disableSubmit, setDisableSubmit] = useState<boolean>(false);
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
        setDisableSubmit(true);
        break;
      case 'agreed':
        setStatusColor(Colors.AGREE);
        setDisableSubmit(true);
        break;
      case 'disputed':
        setStatusColor(Colors.DISPUTE);
        setDisableSubmit(false);
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
          {user}
        </div>
      </div>
      <p>Current Status: &nbsp;{statusStr !== '' && <StatusBadge status={statusStr} color={statusColor} />}</p>
      <input
        type='number'
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
        className='my-5'
      />
      <button
        type='submit'
        className={disableSubmit ? `bg-gray-500 text-white font-bold py-2 px-4 rounded opacity-50 cursor-not-allowed`: `bg-blue-500 text-white p-2 rounded`}
        onClick={handleSubmit}
        disabled={disableSubmit}
      >
        Submit
      </button>
    </div>
  );
};

export default PartA;
export { PartA };
