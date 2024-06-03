import React from 'react';
import {
  PartyBInterface,
  ResponseDisplay,
  SettlementForm,
} from '../components';

const Home: React.FC = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Settlement System</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <SettlementForm />
        <ResponseDisplay />
      </div>
      <PartyBInterface />
    </div>
  );
};

export default Home;
