import React, { useEffect, useMemo } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Text, Surface, useTheme, IconButton } from 'react-native-paper';
import { useClientStore, useDebtStore, useThemeStore } from '../../src/store';
import { withStatus, formatCurrency } from '../../src/utils';
import { SummaryCard } from '../../src/components/SummaryCard';
import { SimpleBarChart } from '../../src/components/SimpleBarChart';
import { DebtCard } from '../../src/components/DebtCard';

export default function DashboardScreen() {
  const theme = useTheme();
  const toggleTheme = useThemeStore((s) => s.toggle);
  const { clients, fetchClients } = useClientStore();
  const { debts, fetchDebts, markAsPaid } = useDebtStore();

  useEffect(() => {
    fetchClients();
    fetchDebts();
  }, []);

  const debtsWithStatus = useMemo(() => debts.map(withStatus), [debts]);

  const summary = useMemo(() => {
    const pending = debtsWithStatus.filter((d) => d.status === 'pending');
    const overdue = debtsWithStatus.filter((d) => d.status === 'overdue');
    const paid = debtsWithStatus.filter((d) => d.status === 'paid');
    return {
      totalPending: pending.reduce((s, d) => s + d.amount, 0),
      totalOverdue: overdue.reduce((s, d) => s + d.amount, 0),
      totalPaid: paid.reduce((s, d) => s + d.amount, 0),
      countPending: pending.length,
      countOverdue: overdue.length,
      countPaid: paid.length,
    };
  }, [debtsWithStatus]);

  const recentDebts = useMemo(
    () => [...debtsWithStatus].sort((a, b) => b.createdAt.localeCompare(a.createdAt)).slice(0, 5),
    [debtsWithStatus],
  );

  const clientMap = useMemo(
    () => Object.fromEntries(clients.map((c) => [c.id, c.name])),
    [clients],
  );

  return (
    <Surface style={[styles.root, { backgroundColor: theme.colors.background }]}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.header}>
          <Text variant="headlineMedium" style={{ color: theme.colors.onBackground }}>
            Dashboard
          </Text>
          <IconButton icon="theme-light-dark" onPress={toggleTheme} />
        </View>

        <View style={styles.row}>
          <SummaryCard title="A Receber" value={formatCurrency(summary.totalPending)} color="#F59E0B" />
          <SummaryCard title="Em Atraso" value={formatCurrency(summary.totalOverdue)} color="#EF4444" />
        </View>
        <View style={styles.row}>
          <SummaryCard title="Recebido" value={formatCurrency(summary.totalPaid)} color="#10B981" />
          <SummaryCard title="Clientes" value={String(clients.length)} color="#3B82F6" />
        </View>

        <Text variant="titleMedium" style={[styles.section, { color: theme.colors.onBackground }]}>
          Distribuição por Status
        </Text>
        <Surface style={[styles.card, { backgroundColor: theme.colors.surface }]}>
          <SimpleBarChart
            items={[
              { label: 'Pendente', value: summary.countPending, color: '#F59E0B' },
              { label: 'Em Atraso', value: summary.countOverdue, color: '#EF4444' },
              { label: 'Quitada', value: summary.countPaid, color: '#10B981' },
            ]}
          />
        </Surface>

        <Text variant="titleMedium" style={[styles.section, { color: theme.colors.onBackground }]}>
          Dívidas Recentes
        </Text>
        {recentDebts.map((debt) => (
          <DebtCard
            key={debt.id}
            debt={debt}
            clientName={clientMap[debt.clientId]}
            onMarkPaid={debt.status !== 'paid' ? () => markAsPaid(debt.id) : undefined}
          />
        ))}
      </ScrollView>
    </Surface>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  scroll: { padding: 16 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  row: { flexDirection: 'row', marginBottom: 4 },
  section: { marginTop: 16, marginBottom: 8 },
  card: { padding: 16, borderRadius: 8, marginBottom: 8 },
});
