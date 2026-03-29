import React from 'react';
import { Tabs } from 'expo-router';
import { useTheme } from 'react-native-paper';

export default function TabsLayout() {
  const theme = useTheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: theme.colors.primary,
        tabBarStyle: { backgroundColor: theme.colors.surface },
        headerStyle: { backgroundColor: theme.colors.surface },
        headerTintColor: theme.colors.onSurface,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{ title: 'Dashboard', tabBarLabel: 'Dashboard' }}
      />
      <Tabs.Screen
        name="clients"
        options={{ title: 'Clientes', tabBarLabel: 'Clientes' }}
      />
      <Tabs.Screen
        name="debts"
        options={{ title: 'Dívidas', tabBarLabel: 'Dívidas' }}
      />
    </Tabs>
  );
}
