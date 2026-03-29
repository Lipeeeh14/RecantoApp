import React, { useEffect, useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Text, TextInput, Button, Surface, useTheme, IconButton, ActivityIndicator } from 'react-native-paper';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useClientStore } from '../../../src/store';

export default function EditClientScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const theme = useTheme();
  const router = useRouter();
  const { clients, fetchClients, updateClient, loading } = useClientStore();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [notes, setNotes] = useState('');
  const [error, setError] = useState('');
  const [ready, setReady] = useState(false);

  useEffect(() => {
    fetchClients().then(() => setReady(true));
  }, []);

  useEffect(() => {
    const client = clients.find((c) => c.id === id);
    if (client) {
      setName(client.name);
      setPhone(client.phone ?? '');
      setEmail(client.email ?? '');
      setNotes(client.notes ?? '');
    }
  }, [clients, id]);

  if (!ready) {
    return (
      <Surface style={[styles.root, { backgroundColor: theme.colors.background }]}>
        <ActivityIndicator style={{ marginTop: 64 }} />
      </Surface>
    );
  }

  async function handleSave() {
    if (!name.trim()) {
      setError('Nome é obrigatório.');
      return;
    }
    setError('');
    await updateClient(id, { name: name.trim(), phone: phone.trim() || undefined, email: email.trim() || undefined, notes: notes.trim() || undefined });
    router.back();
  }

  return (
    <Surface style={[styles.root, { backgroundColor: theme.colors.background }]}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.header}>
          <IconButton icon="arrow-left" onPress={() => router.back()} />
          <Text variant="titleLarge" style={{ color: theme.colors.onBackground }}>Editar Cliente</Text>
          <View style={{ width: 48 }} />
        </View>

        <TextInput label="Nome *" value={name} onChangeText={setName} style={styles.input} error={!!error} />
        {!!error && <Text style={styles.error}>{error}</Text>}
        <TextInput label="Telefone" value={phone} onChangeText={setPhone} style={styles.input} keyboardType="phone-pad" />
        <TextInput label="E-mail" value={email} onChangeText={setEmail} style={styles.input} keyboardType="email-address" autoCapitalize="none" />
        <TextInput label="Observações" value={notes} onChangeText={setNotes} style={styles.input} multiline numberOfLines={3} />

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
  input: { marginBottom: 12 },
  error: { color: '#EF4444', marginBottom: 8 },
  btn: { marginTop: 8 },
});
