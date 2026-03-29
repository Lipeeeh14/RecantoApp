# RecantoApp

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
