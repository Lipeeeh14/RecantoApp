import React, { useEffect, useMemo, useState } from 'react';
import { View, ScrollView, StyleSheet, Alert } from 'react-native';
import { FAB, Surface, useTheme, ActivityIndicator } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { useClientStore, useDebtStore } from '../../src/store';
import { ClientCard } from '../../src/components/ClientCard';
import { SearchFilterBar } from '../../src/components/SearchFilterBar';

export default function ClientsScreen() {
  const theme = useTheme();
  const router = useRouter();
  const { clients, fetchClients, removeClient, loading } = useClientStore();
  const { debts, fetchDebts } = useDebtStore();
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchClients();
    fetchDebts();
  }, []);

  const debtCountMap = useMemo(
    () =>
      debts.reduce<Record<string, number>>((acc, d) => {
        acc[d.clientId] = (acc[d.clientId] ?? 0) + 1;
        return acc;
      }, {}),
    [debts],
  );

  const filtered = useMemo(
    () =>
      clients.filter((c) =>
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        (c.email ?? '').toLowerCase().includes(search.toLowerCase()),
      ),
    [clients, search],
  );

  function confirmDelete(id: string, name: string) {
    Alert.alert('Excluir cliente', `Excluir "${name}"?`, [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Excluir', style: 'destructive', onPress: () => removeClient(id) },
    ]);
  }

  return (
    <Surface style={[styles.root, { backgroundColor: theme.colors.background }]}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <SearchFilterBar search={search} onSearchChange={setSearch} />
        {loading && <ActivityIndicator style={{ marginTop: 32 }} />}
        {filtered.map((client) => (
          <ClientCard
            key={client.id}
            client={client}
            debtCount={debtCountMap[client.id] ?? 0}
            onPress={() => router.push(`/clients/${client.id}`)}
            onEdit={() => router.push(`/clients/edit/${client.id}`)}
            onDelete={() => confirmDelete(client.id, client.name)}
          />
        ))}
      </ScrollView>
      <FAB
        icon="plus"
        style={[styles.fab, { backgroundColor: theme.colors.primary }]}
        onPress={() => router.push('/clients/new')}
      />
    </Surface>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  scroll: { padding: 16, paddingBottom: 80 },
  fab: { position: 'absolute', right: 16, bottom: 16 },
});
