import React, { useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Text, TextInput, Button, Surface, useTheme, IconButton } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { useClientStore } from '../../src/store';
import { maskPhone, isValidEmail } from '../../src/utils';

export default function NewClientScreen() {
  const theme = useTheme();
  const router = useRouter();
  const { addClient, loading } = useClientStore();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [notes, setNotes] = useState('');
  const [error, setError] = useState('');
  const [emailError, setEmailError] = useState('');

  async function handleSave() {
    let hasError = false;
    if (!name.trim()) {
      setError('Nome é obrigatório.');
      hasError = true;
    } else {
      setError('');
    }
    if (email.trim() && !isValidEmail(email.trim())) {
      setEmailError('E-mail inválido.');
      hasError = true;
    } else {
      setEmailError('');
    }
    if (hasError) return;
    await addClient({ name: name.trim(), phone: phone.trim() || undefined, email: email.trim() || undefined, notes: notes.trim() || undefined });
    router.back();
  }

  return (
    <Surface style={[styles.root, { backgroundColor: theme.colors.background }]}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.header}>
          <IconButton icon="arrow-left" onPress={() => router.back()} />
          <Text variant="titleLarge" style={{ color: theme.colors.onBackground }}>Novo Cliente</Text>
          <View style={{ width: 48 }} />
        </View>

        <TextInput label="Nome *" value={name} onChangeText={setName} style={styles.input} error={!!error} />
        {!!error && <Text style={styles.error}>{error}</Text>}
        <TextInput label="Telefone" value={phone} onChangeText={(v) => setPhone(maskPhone(v))} style={styles.input} keyboardType="phone-pad" />
        <TextInput label="E-mail" value={email} onChangeText={(v) => { setEmail(v); setEmailError(''); }} style={styles.input} keyboardType="email-address" autoCapitalize="none" error={!!emailError} />
        {!!emailError && <Text style={styles.error}>{emailError}</Text>}
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
