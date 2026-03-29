import React from 'react';
import { Card, Text } from 'react-native-paper';
import { Client } from '../models';

interface Props {
  client: Client;
  debtCount?: number;
  onPress?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
}

export function ClientCard({ client, debtCount, onPress, onEdit, onDelete }: Props) {
  return (
    <Card style={{ marginBottom: 8 }} onPress={onPress}>
      <Card.Title
        title={client.name}
        subtitle={client.phone ?? client.email ?? 'Sem contato'}
        right={() =>
          debtCount !== undefined ? (
            <Text style={{ marginRight: 16, color: '#6B7280' }}>{debtCount} dívida(s)</Text>
          ) : null
        }
      />
      {(onEdit || onDelete) && (
        <Card.Actions>
          {onEdit && (
            <Text onPress={onEdit} style={{ color: '#3B82F6' }}>Editar</Text>
          )}
          {onDelete && (
            <Text onPress={onDelete} style={{ color: '#EF4444', marginLeft: 8 }}>Excluir</Text>
          )}
        </Card.Actions>
      )}
    </Card>
  );
}
