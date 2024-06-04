"use client";

import React from 'react';
import '../styles/globals.css';
import { AuthProvider } from '../components/AuthContext';

const RootLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <html>
      <body>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
};

export default RootLayout;
