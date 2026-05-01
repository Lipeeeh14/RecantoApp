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
cd frontend
npm install

# 2. (Opcional) Configurar variável de ambiente
cp .env.example .env
# Edite EXPO_PUBLIC_API_BASE_URL conforme necessário

# 3. Iniciar o app
npm run start
# Depois escaneie o QR code com o Expo Go (iOS/Android) ou rode no emulador
```

## 🔌 Como conectar ao backend real

Os serviços em `src/services/api/` já fazem chamadas HTTP reais para o backend NestJS. Para apontar para o servidor correto, basta definir a URL base no `.env` da raiz:

```
EXPO_PUBLIC_API_BASE_URL=http://<IP_DA_MÁQUINA>:3000
```

> Use o IP da máquina na rede local (não `localhost`) para que o APK/dispositivo físico consiga alcançar o servidor. O prefixo `/api` é adicionado automaticamente pelos serviços.

## 📁 Estrutura

```
frontend/                   # App React Native / Expo
  app/                      # Rotas (Expo Router)
    _layout.tsx             # Root layout (PaperProvider + tema)
    (tabs)/                 # Navegação por abas
      _layout.tsx
      index.tsx             # Dashboard
      clients.tsx           # Lista de clientes
      debts.tsx             # Lista de dívidas
    clients/
      [id].tsx              # Detalhe do cliente
      new.tsx               # Novo cliente
      edit/[id].tsx         # Editar cliente
    debts/
      new.tsx               # Nova dívida
      edit/[id].tsx         # Editar dívida
  src/
    models/index.ts         # Tipos: Client, Debt, DebtStatus
    utils/                  # Helpers: moeda, datas, status
    services/api/           # Serviços HTTP (fetch para o backend)
    store/                  # Zustand stores (clients, debts, theme)
    components/             # Componentes reutilizáveis

backend/                    # API NestJS + PostgreSQL
  src/
    clients/                # Módulo clients (entity, service, controller, DTOs)
    debts/                  # Módulo debts (entity, service, controller, DTOs)
    app.module.ts
    main.ts
  .env.example
```

## 🔮 Melhorias futuras

- Autenticação (PIN/biometria)
- Notificações locais para vencimentos próximos
- Exportação de dados (CSV/PDF)
- Sincronização em tempo real
- Backup em nuvem

---

## 🚀 Fase 2 — Backend (NestJS + PostgreSQL)

O backend está localizado em `backend/` e expõe uma API REST que o app consome via `EXPO_PUBLIC_API_BASE_URL`.

### 🧱 Stack backend

- [NestJS](https://nestjs.com) + TypeScript
- [TypeORM](https://typeorm.io) (ORM)
- [PostgreSQL](https://www.postgresql.org)
- [class-validator](https://github.com/typestack/class-validator) (validação de DTOs)

### 📡 Endpoints

| Método | Rota | Descrição |
|--------|------|-----------|
| GET | `/api/clients` | Lista todos os clientes |
| GET | `/api/clients/:id` | Busca cliente por ID |
| POST | `/api/clients` | Cria novo cliente |
| PUT | `/api/clients/:id` | Atualiza cliente |
| DELETE | `/api/clients/:id` | Remove cliente |
| GET | `/api/debts` | Lista todas as dívidas |
| GET | `/api/debts/:id` | Busca dívida por ID |
| GET | `/api/debts/client/:clientId` | Lista dívidas de um cliente |
| POST | `/api/debts` | Cria nova dívida |
| PUT | `/api/debts/:id` | Atualiza dívida (incluindo `paid: true`) |
| DELETE | `/api/debts/:id` | Remove dívida |

### ▶️ Como rodar o backend

```bash
# 1. Entrar na pasta do backend
cd backend

# 2. Instalar dependências (caso ainda não tenha feito)
npm install

# 3. Configurar variáveis de ambiente
cp .env.example .env
# Edite .env com as credenciais do seu PostgreSQL

# 4. Iniciar em modo desenvolvimento
npm run start:dev
```

> O banco de dados e as tabelas são criados automaticamente pelo TypeORM (`synchronize: true`) em modo desenvolvimento.

### 🔌 Conectar o app ao backend

No arquivo `.env` da raiz do projeto (frontend), defina:

```
EXPO_PUBLIC_API_BASE_URL=http://<IP_DA_MÁQUINA>:3000
```

> Use o IP da sua máquina na rede local (não `localhost`) para que o APK/dispositivo físico consiga alcançar o servidor.

Em seguida, defina `EXPO_PUBLIC_API_BASE_URL` no `.env` da raiz conforme descrito na seção **Como conectar ao backend real** acima.

### 📁 Estrutura do backend

```
backend/
  src/
    clients/
      client.entity.ts       # Entidade TypeORM
      clients.service.ts     # Lógica de negócio
      clients.controller.ts  # Rotas REST
      clients.module.ts
      dto/
        create-client.dto.ts
        update-client.dto.ts
    debts/
      debt.entity.ts
      debts.service.ts
      debts.controller.ts
      debts.module.ts
      dto/
        create-debt.dto.ts
        update-debt.dto.ts
    app.module.ts            # Módulo raiz (TypeORM + Config)
    main.ts                  # Bootstrap (CORS, ValidationPipe)
  .env.example
```

---

Desenvolvido em duas fases: **Fase 1** (frontend React Native/Expo) e **Fase 2** (backend NestJS + PostgreSQL).
