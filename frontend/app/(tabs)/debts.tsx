import React, { useEffect, useMemo, useState } from 'react';
import { View, ScrollView, StyleSheet, Alert } from 'react-native';
import { FAB, Surface, useTheme, ActivityIndicator } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { useClientStore, useDebtStore } from '../../src/store';
import { withStatus } from '../../src/utils';
import { DebtCard } from '../../src/components/DebtCard';
import { SearchFilterBar } from '../../src/components/SearchFilterBar';
import { DebtStatus } from '../../src/models';

export default function DebtsScreen() {
  const theme = useTheme();
  const router = useRouter();
  const { clients, fetchClients } = useClientStore();
  const { debts, fetchDebts, removeDebt, markAsPaid, loading } = useDebtStore();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<DebtStatus | 'all'>('all');

  useEffect(() => {
    fetchClients();
    fetchDebts();
  }, []);

  const clientMap = useMemo(
    () => Object.fromEntries(clients.map((c) => [c.id, c.name])),
    [clients],
  );

  const filtered = useMemo(() => {
    return debts
      .map(withStatus)
      .filter((d) => {
        const matchesStatus = statusFilter === 'all' || d.status === statusFilter;
        const clientName = clientMap[d.clientId] ?? '';
        const matchesSearch =
          d.description.toLowerCase().includes(search.toLowerCase()) ||
          clientName.toLowerCase().includes(search.toLowerCase());
        return matchesStatus && matchesSearch;
      });
  }, [debts, statusFilter, search, clientMap]);

  function confirmDelete(id: string, desc: string) {
    Alert.alert('Excluir dívida', `Excluir "${desc}"?`, [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Excluir', style: 'destructive', onPress: () => removeDebt(id) },
    ]);
  }

  return (
    <Surface style={[styles.root, { backgroundColor: theme.colors.background }]}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <SearchFilterBar
          search={search}
          onSearchChange={setSearch}
          selectedStatus={statusFilter}
          onStatusChange={setStatusFilter}
        />
        {loading && <ActivityIndicator style={{ marginTop: 32 }} />}
        {filtered.map((debt) => (
          <DebtCard
            key={debt.id}
            debt={debt}
            clientName={clientMap[debt.clientId]}
            onMarkPaid={debt.status !== 'paid' ? () => markAsPaid(debt.id) : undefined}
            onEdit={() => router.push(`/debts/edit/${debt.id}`)}
            onDelete={() => confirmDelete(debt.id, debt.description)}
          />
        ))}
      </ScrollView>
      <FAB
        icon="plus"
        style={[styles.fab, { backgroundColor: theme.colors.primary }]}
        onPress={() => router.push('/debts/new')}
      />
    </Surface>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  scroll: { padding: 16, paddingBottom: 80 },
  fab: { position: 'absolute', right: 16, bottom: 16 },
});
