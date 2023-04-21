import React from 'react';
import { AccountProvider } from './src/context/AccountContext';
import MainNavigation from './src/navigation/MainNavigation';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function App() {
  return (
    <SafeAreaProvider>
      <AccountProvider>
        <MainNavigation />
      </AccountProvider>
    </SafeAreaProvider>
  );
}
