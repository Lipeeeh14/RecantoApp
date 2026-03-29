import React from 'react';
import { Card, Text } from 'react-native-paper';

interface Props {
  title: string;
  value: string;
  color?: string;
}

export function SummaryCard({ title, value, color = '#3B82F6' }: Props) {
  return (
    <Card style={{ flex: 1, margin: 4 }}>
      <Card.Content>
        <Text style={{ color: '#6B7280', fontSize: 12 }}>{title}</Text>
        <Text variant="titleLarge" style={{ color, fontWeight: 'bold' }}>{value}</Text>
      </Card.Content>
    </Card>
  );
}
