import React from 'react';
import { AccountProvider } from './src/context/LoginContext';
import MainNavigation from './src/navigation/MainNavigation';

export default function App() {
  return (
    <AccountProvider>
        <MainNavigation />
    </AccountProvider>
  )
}