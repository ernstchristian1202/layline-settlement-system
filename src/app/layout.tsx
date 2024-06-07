"use client";

import React, { FC, ReactNode } from 'react';
import '../styles/globals.css';
import { AuthProvider } from '../components';

const RootLayout: FC<{ children: ReactNode }> = ({ children }) => {
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
