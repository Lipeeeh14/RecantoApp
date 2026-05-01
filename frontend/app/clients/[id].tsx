import React, { useEffect, useMemo, useState } from 'react';
import { View, ScrollView, StyleSheet, Alert } from 'react-native';
import { Text, Surface, useTheme, Button, ActivityIndicator, IconButton } from 'react-native-paper';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useClientStore, useDebtStore } from '../../src/store';
import { withStatus } from '../../src/utils';
import { DebtCard } from '../../src/components/DebtCard';
import { DebtStatus } from '../../src/models';

export default function ClientDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const theme = useTheme();
  const router = useRouter();
  const { clients, fetchClients } = useClientStore();
  const { debts, fetchDebts, removeDebt, markAsPaid } = useDebtStore();

  useEffect(() => {
    fetchClients();
    fetchDebts();
  }, []);

  const client = useMemo(() => clients.find((c) => c.id === id), [clients, id]);

  const clientDebts = useMemo(
    () => debts.filter((d) => d.clientId === id).map(withStatus),
    [debts, id],
  );

  if (!client) {
    return (
      <Surface style={[styles.root, { backgroundColor: theme.colors.background }]}>
        <ActivityIndicator style={{ marginTop: 64 }} />
      </Surface>
    );
  }

  function confirmDelete(debtId: string, desc: string) {
    Alert.alert('Excluir dívida', `Excluir "${desc}"?`, [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Excluir', style: 'destructive', onPress: () => removeDebt(debtId) },
    ]);
  }

  return (
    <Surface style={[styles.root, { backgroundColor: theme.colors.background }]}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.header}>
          <IconButton icon="arrow-left" onPress={() => router.back()} />
          <Text variant="headlineSmall" style={{ color: theme.colors.onBackground }}>{client.name}</Text>
          <IconButton icon="pencil" onPress={() => router.push(`/clients/edit/${client.id}`)} />
        </View>

        {client.phone ? (
          <Text style={[styles.info, { color: theme.colors.onSurface }]}>📞 {client.phone}</Text>
        ) : null}
        {client.email ? (
          <Text style={[styles.info, { color: theme.colors.onSurface }]}>✉️ {client.email}</Text>
        ) : null}
        {client.notes ? (
          <Text style={[styles.info, { color: theme.colors.onSurface }]}>📝 {client.notes}</Text>
        ) : null}

        <View style={styles.sectionHeader}>
          <Text variant="titleMedium" style={{ color: theme.colors.onBackground }}>
            Dívidas ({clientDebts.length})
          </Text>
          <Button
            mode="contained"
            compact
            onPress={() => router.push({ pathname: '/debts/new', params: { clientId: id } })}
          >
            Nova Dívida
          </Button>
        </View>

        {clientDebts.map((debt) => (
          <DebtCard
            key={debt.id}
            debt={debt}
            onMarkPaid={debt.status !== 'paid' ? () => markAsPaid(debt.id) : undefined}
            onEdit={() => router.push(`/debts/edit/${debt.id}`)}
            onDelete={() => confirmDelete(debt.id, debt.description)}
          />
        ))}
      </ScrollView>
    </Surface>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  scroll: { padding: 16 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 },
  info: { marginBottom: 4, fontSize: 15 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 16, marginBottom: 8 },
});
