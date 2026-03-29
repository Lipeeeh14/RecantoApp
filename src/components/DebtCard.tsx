import React from 'react';
import { View } from 'react-native';
import { Card, Text, Button } from 'react-native-paper';
import { DebtWithStatus } from '../models';
import { formatCurrency, formatDate } from '../utils';
import { DebtStatusBadge } from './DebtStatusBadge';

interface Props {
  debt: DebtWithStatus;
  clientName?: string;
  onMarkPaid?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
}

export function DebtCard({ debt, clientName, onMarkPaid, onEdit, onDelete }: Props) {
  return (
    <Card style={{ marginBottom: 8 }}>
      <Card.Title
        title={debt.description}
        subtitle={clientName ?? `Venc: ${formatDate(debt.dueDate)}`}
      />
      <Card.Content>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <Text variant="titleMedium">{formatCurrency(debt.amount)}</Text>
          <DebtStatusBadge status={debt.status} />
        </View>
        <Text style={{ color: '#6B7280', marginTop: 4 }}>
          Venc: {formatDate(debt.dueDate)}
        </Text>
      </Card.Content>
      <Card.Actions>
        {debt.status !== 'paid' && onMarkPaid && (
          <Button mode="contained" compact onPress={onMarkPaid}>Quitar</Button>
        )}
        {onEdit && <Button compact onPress={onEdit}>Editar</Button>}
        {onDelete && <Button compact textColor="#EF4444" onPress={onDelete}>Excluir</Button>}
      </Card.Actions>
    </Card>
  );
}
