"use client";

import React, { FC } from 'react';
import {
  Login,
  PartB,
  PartA,
  useAuth,
} from '../components';

const HomeContent: FC = () => {
  const { user } = useAuth();

  if (!user) {
    return <Login />;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Settlement System</h1>
      {user === 'A' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <PartA />
        </div>
      )}
      {user === 'B' && <PartB />}
    </div>
  );
};

const Home: FC = () => {
  return <HomeContent />;
};

export default Home;
