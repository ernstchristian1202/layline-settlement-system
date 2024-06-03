"use client";

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ResponseDisplay: React.FC = () => {
    const [response, setResponse] = useState<string | null>(null);
  
    useEffect(() => {
      axios.get('/api/settlement').then(res => {
        setResponse(res.data.response);
      });
    }, []);
  
    return (
      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-xl font-bold mb-2">Party B's Response</h2>
        {response ? <p>{response}</p> : <p>No response yet</p>}
      </div>
    );
  };
  
export default ResponseDisplay;
export { ResponseDisplay };  
