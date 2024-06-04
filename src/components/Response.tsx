"use client";

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Response: React.FC = () => {
  const [response, setResponse] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get('/api/settlement');
      setResponse(result.data.message);
    };

    fetchData();
  }, []);

  return (
    <div className="p-4 border rounded">
      <h2 className="text-xl font-bold mb-4">Response Display</h2>
      <p>Current Response: {response}</p>
    </div>
  );
};

export default Response;
export { Response };
