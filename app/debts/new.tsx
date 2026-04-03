import React, { useEffect, useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Text, TextInput, Button, Surface, useTheme, IconButton } from 'react-native-paper';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useClientStore, useDebtStore } from '../../src/store';
import { toISODateString, maskCurrency, parseCurrency, maskDate, parseDate, isoToDisplayDate } from '../../src/utils';

export default function NewDebtScreen() {
  const { clientId: preselectedClientId } = useLocalSearchParams<{ clientId?: string }>();
  const theme = useTheme();
  const router = useRouter();
  const { clients, fetchClients } = useClientStore();
  const { addDebt, loading } = useDebtStore();

  const [clientId, setClientId] = useState(preselectedClientId ?? '');
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [dueDate, setDueDate] = useState(isoToDisplayDate(toISODateString()));
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    fetchClients();
  }, []);

  function validate() {
    const e: Record<string, string> = {};
    if (!clientId) e.clientId = 'Selecione um cliente.';
    if (!description.trim()) e.description = 'Descrição é obrigatória.';
    if (parseCurrency(amount) <= 0) e.amount = 'Valor inválido.';
    if (!dueDate || parseDate(dueDate) === null) e.dueDate = 'Data inválida. Use DD/MM/AAAA.';
    return e;
  }

  async function handleSave() {
    const e = validate();
    if (Object.keys(e).length > 0) { setErrors(e); return; }
    setErrors({});
    await addDebt({ clientId, description: description.trim(), amount: parseCurrency(amount), dueDate: parseDate(dueDate)!, paid: false });
    router.back();
  }

  return (
    <Surface style={[styles.root, { backgroundColor: theme.colors.background }]}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.header}>
          <IconButton icon="arrow-left" onPress={() => router.back()} />
          <Text variant="titleLarge" style={{ color: theme.colors.onBackground }}>Nova Dívida</Text>
          <View style={{ width: 48 }} />
        </View>

        <Text style={[styles.label, { color: theme.colors.onSurface }]}>Cliente *</Text>
        {clients.map((c) => (
          <Button
            key={c.id}
            mode={clientId === c.id ? 'contained' : 'outlined'}
            onPress={() => setClientId(c.id)}
            style={styles.clientBtn}
            compact
          >
            {c.name}
          </Button>
        ))}
        {!!errors.clientId && <Text style={styles.error}>{errors.clientId}</Text>}

        <TextInput label="Descrição *" value={description} onChangeText={setDescription} style={styles.input} error={!!errors.description} />
        {!!errors.description && <Text style={styles.error}>{errors.description}</Text>}

        <TextInput label="Valor (R$) *" value={amount} onChangeText={(v) => setAmount(maskCurrency(v))} style={styles.input} keyboardType="numeric" error={!!errors.amount} />
        {!!errors.amount && <Text style={styles.error}>{errors.amount}</Text>}

        <TextInput label="Vencimento (DD/MM/AAAA) *" value={dueDate} onChangeText={(v) => setDueDate(maskDate(v))} style={styles.input} keyboardType="numeric" error={!!errors.dueDate} />
        {!!errors.dueDate && <Text style={styles.error}>{errors.dueDate}</Text>}

        <Button mode="contained" onPress={handleSave} loading={loading} style={styles.btn}>
          Salvar
        </Button>
      </ScrollView>
    </Surface>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  scroll: { padding: 16 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 },
  label: { marginBottom: 6, fontWeight: '600' },
  clientBtn: { marginBottom: 6 },
  input: { marginBottom: 12 },
  error: { color: '#EF4444', marginBottom: 8, marginTop: -8 },
  btn: { marginTop: 8 },
});
