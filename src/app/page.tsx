"use client";

import React, { FC } from 'react';
import { useAuth } from './auth/AuthContext';
import {
  Login,
  PartB,
  PartA,
} from '../components';

const HomeContent: FC = () => {
  const { user } = useAuth();

  if (!user) {
    return <Login />;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {user === 'A' && <PartA />}
        {user === 'B' && <PartB />}
      </div>
    </div>
  );
};

const Home: FC = () => {
  return <HomeContent />;
};

export default Home;
