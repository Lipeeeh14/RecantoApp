import { create } from 'zustand';
import { Client } from '../models';
import { clientService } from '../services';

interface ClientState {
  clients: Client[];
  loading: boolean;
  error: string | null;
  fetchClients: () => Promise<void>;
  addClient: (data: Omit<Client, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  updateClient: (id: string, data: Partial<Omit<Client, 'id' | 'createdAt' | 'updatedAt'>>) => Promise<void>;
  removeClient: (id: string) => Promise<void>;
}

export const useClientStore = create<ClientState>((set) => ({
  clients: [],
  loading: false,
  error: null,

  fetchClients: async () => {
    set({ loading: true, error: null });
    try {
      const clients = await clientService.getAll();
      set({ clients, loading: false });
    } catch (err) {
      set({ error: String(err), loading: false });
    }
  },

  addClient: async (data) => {
    set({ loading: true, error: null });
    try {
      const newClient = await clientService.create(data);
      set((state) => ({ clients: [...state.clients, newClient], loading: false }));
    } catch (err) {
      set({ error: String(err), loading: false });
    }
  },

  updateClient: async (id, data) => {
    set({ loading: true, error: null });
    try {
      const updated = await clientService.update(id, data);
      set((state) => ({
        clients: state.clients.map((c) => (c.id === id ? updated : c)),
        loading: false,
      }));
    } catch (err) {
      set({ error: String(err), loading: false });
    }
  },

  removeClient: async (id) => {
    set({ loading: true, error: null });
    try {
      await clientService.remove(id);
      set((state) => ({
        clients: state.clients.filter((c) => c.id !== id),
        loading: false,
      }));
    } catch (err) {
      set({ error: String(err), loading: false });
    }
  },
}));
