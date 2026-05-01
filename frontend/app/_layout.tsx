import React from 'react';
import { Stack } from 'expo-router';
import { PaperProvider, MD3LightTheme, MD3DarkTheme } from 'react-native-paper';
import { StatusBar } from 'expo-status-bar';
import { useThemeStore } from '../src/store';

export default function RootLayout() {
  const mode = useThemeStore((s) => s.mode);
  const theme = mode === 'dark' ? MD3DarkTheme : MD3LightTheme;

  return (
    <PaperProvider theme={theme}>
      <StatusBar style={mode === 'dark' ? 'light' : 'dark'} />
      <Stack screenOptions={{ headerShown: false }} />
    </PaperProvider>
  );
}
