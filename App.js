import React from 'react';
import { AccountProvider } from './src/context/AccountContext';
import MainNavigation from './src/navigation/MainNavigation';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeProvider } from '@react-navigation/native';

export default function App() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <AccountProvider>
          <MainNavigation />
        </AccountProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
