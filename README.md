# RecantoApp

Aplicativo mobile para gerenciamento de dívidas, feito com **React Native + Expo**, **TypeScript**, **Zustand** e **React Native Paper**. Preparado para integração com backend PostgreSQL via API REST, com mocks locais por enquanto.

## ✅ Funcionalidades

- CRUD completo de clientes (devedores)
- CRUD completo de dívidas associadas a clientes
- Status automático de dívida: **Pendente** (dentro do prazo), **Em Atraso** (vencida e não paga), **Quitada**
- Marcar dívida como quitada
- Dashboard com resumo (total a receber, em atraso, recebido) + gráfico simples
- Filtro por status e busca por cliente/dívida
- Tela de detalhe do cliente com suas dívidas
- Tema claro/escuro (toggle no Dashboard)

## 🧱 Stack

- [Expo](https://expo.dev) + React Native + TypeScript
- [Expo Router](https://expo.github.io/router) (navegação baseada em arquivos)
- [Zustand](https://zustand-demo.pmnd.rs) (estado global)
- [React Native Paper](https://callstack.github.io/react-native-paper) (UI — Material Design 3)

## ▶️ Como rodar

```bash
# 1. Instalar dependências
npm install

# 2. (Opcional) Configurar variável de ambiente
cp .env.example .env
# Edite EXPO_PUBLIC_API_BASE_URL conforme necessário

# 3. Iniciar o app
npm run start
# Depois escaneie o QR code com o Expo Go (iOS/Android) ou rode no emulador
```

## 🔌 Como trocar de mock para API real

Hoje os serviços em `src/services/api/` usam os mocks de `src/services/mocks/` simulando chamadas HTTP. Para conectar ao backend real:

1. Defina a URL base no `.env`:
   ```
   EXPO_PUBLIC_API_BASE_URL=https://seu-backend.com
   ```
2. Em `src/services/api/clients.ts` e `src/services/api/debts.ts`, substitua os métodos mock por chamadas `fetch` para os endpoints correspondentes, ex.:
   ```ts
   async getAll() {
     const res = await fetch(`${BASE_URL}/clients`);
     return res.json();
   }
   ```
3. O resto do app (Zustand stores, telas) não precisa mudar.

## 📁 Estrutura

```
app/                        # Rotas (Expo Router)
  _layout.tsx               # Root layout (PaperProvider + tema)
  (tabs)/                   # Navegação por abas
    _layout.tsx
    index.tsx               # Dashboard
    clients.tsx             # Lista de clientes
    debts.tsx               # Lista de dívidas
  clients/
    [id].tsx                # Detalhe do cliente
    new.tsx                 # Novo cliente
    edit/[id].tsx           # Editar cliente
  debts/
    new.tsx                 # Nova dívida
    edit/[id].tsx           # Editar dívida

src/
  models/index.ts           # Tipos: Client, Debt, DebtStatus
  utils/                    # Helpers: moeda, datas, status
  services/
    api/                    # Serviços (prontos para HTTP real)
    mocks/                  # Dados mock locais
  store/                    # Zustand stores (clients, debts, theme)
  components/               # Componentes reutilizáveis
```

## 🔮 Melhorias futuras

- Autenticação (PIN/biometria)
- Notificações locais para vencimentos próximos
- Exportação de dados (CSV/PDF)
- Sincronização em tempo real
- Backup em nuvem

---

Desenvolvido para a fase 1 (frontend). Backend será integrado na fase 2.

Aplicativo mobile para gerenciamento de dívidas pessoais, feito com **React Native + Expo**, **TypeScript**, **Zustand** e **React Native Paper**. O app está preparado para integrar com backend em PostgreSQL via API REST.

## ✅ Funcionalidades
- CRUD de clientes (devedores)
- CRUD de dívidas associadas a clientes
- Status automático da dívida (Pendente, Em Atraso, Quitada)
- Marcar dívida como quitada
- Dashboard com resumo geral e gráfico
- Filtro e busca
- Tema claro/escuro

## 🧱 Stack
- Expo + React Native + TypeScript
- Expo Router
- Zustand (estado global)
- React Native Paper (UI)

## ▶️ Como rodar
```bash
npm install
npm run start
```

## 🔌 Configuração da API
Por padrão, o app usa a base URL `http://localhost:3000`. Para alterar:
- Edite o arquivo `.env.example` e salve como `.env`, ou
- Ajuste o campo `extra.apiBaseUrl` no `app.json`

## 📁 Estrutura
```
app/                 # telas (Expo Router)
src/components       # componentes reutilizáveis
src/models           # modelos
src/services         # serviços / API
src/store            # estado global (Zustand)
src/utils            # utilitários
```

## 🔮 Melhorias futuras
- Autenticação (PIN/biometria)
- Notificações locais
- Exportação de dados (CSV/PDF)
- Sincronização em tempo real
- Backup em nuvem

---

Desenvolvido para a fase 1 (frontend). Backend será integrado posteriormente.
