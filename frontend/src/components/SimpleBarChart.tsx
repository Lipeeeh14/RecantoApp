import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, useTheme } from 'react-native-paper';

interface BarItem {
  label: string;
  value: number;
  color: string;
}

interface Props {
  items: BarItem[];
}

export function SimpleBarChart({ items }: Props) {
  const theme = useTheme();
  const max = Math.max(...items.map((i) => i.value), 1);

  return (
    <View style={styles.container}>
      {items.map((item) => (
        <View key={item.label} style={styles.row}>
          <Text style={[styles.label, { color: theme.colors.onSurface }]}>{item.label}</Text>
          <View style={styles.barContainer}>
            <View
              style={[
                styles.bar,
                { width: `${(item.value / max) * 100}%`, backgroundColor: item.color },
              ]}
            />
          </View>
          <Text style={[styles.value, { color: theme.colors.onSurface }]}>{item.value}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { gap: 8 },
  row: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  label: { width: 80, fontSize: 12 },
  barContainer: { flex: 1, height: 20, backgroundColor: '#E5E7EB', borderRadius: 4, overflow: 'hidden' },
  bar: { height: '100%', borderRadius: 4 },
  value: { width: 30, fontSize: 12, textAlign: 'right' },
});
