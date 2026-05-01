import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Searchbar, Chip } from 'react-native-paper';
import { DebtStatus } from '../models';
import { STATUS_LABELS } from '../utils';

interface Props {
  search: string;
  onSearchChange: (text: string) => void;
  selectedStatus?: DebtStatus | 'all';
  onStatusChange?: (status: DebtStatus | 'all') => void;
}

const STATUS_OPTIONS: Array<DebtStatus | 'all'> = ['all', 'pending', 'overdue', 'paid'];

export function SearchFilterBar({ search, onSearchChange, selectedStatus, onStatusChange }: Props) {
  return (
    <View style={styles.container}>
      <Searchbar
        placeholder="Buscar..."
        value={search}
        onChangeText={onSearchChange}
      />
      {onStatusChange && (
        <View style={styles.chips}>
          {STATUS_OPTIONS.map((status) => (
            <Chip
              key={status}
              selected={selectedStatus === status}
              onPress={() => onStatusChange(status)}
              compact
            >
              {status === 'all' ? 'Todos' : STATUS_LABELS[status]}
            </Chip>
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { gap: 8, marginBottom: 12 },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: 6 },
});
