import { create } from 'zustand';
import { Debt } from '../models';
import { debtService } from '../services';

interface DebtState {
  debts: Debt[];
  loading: boolean;
  error: string | null;
  fetchDebts: () => Promise<void>;
  addDebt: (data: Omit<Debt, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  updateDebt: (id: string, data: Partial<Omit<Debt, 'id' | 'createdAt' | 'updatedAt'>>) => Promise<void>;
  removeDebt: (id: string) => Promise<void>;
  markAsPaid: (id: string) => Promise<void>;
}

export const useDebtStore = create<DebtState>((set) => ({
  debts: [],
  loading: false,
  error: null,

  fetchDebts: async () => {
    set({ loading: true, error: null });
    try {
      const debts = await debtService.getAll();
      set({ debts, loading: false });
    } catch (err) {
      set({ error: String(err), loading: false });
    }
  },

  addDebt: async (data) => {
    set({ loading: true, error: null });
    try {
      const newDebt = await debtService.create(data);
      set((state) => ({ debts: [...state.debts, newDebt], loading: false }));
    } catch (err) {
      set({ error: String(err), loading: false });
    }
  },

  updateDebt: async (id, data) => {
    set({ loading: true, error: null });
    try {
      const updated = await debtService.update(id, data);
      set((state) => ({
        debts: state.debts.map((d) => (d.id === id ? updated : d)),
        loading: false,
      }));
    } catch (err) {
      set({ error: String(err), loading: false });
    }
  },

  removeDebt: async (id) => {
    set({ loading: true, error: null });
    try {
      await debtService.remove(id);
      set((state) => ({
        debts: state.debts.filter((d) => d.id !== id),
        loading: false,
      }));
    } catch (err) {
      set({ error: String(err), loading: false });
    }
  },

  markAsPaid: async (id) => {
    set({ loading: true, error: null });
    try {
      const updated = await debtService.markAsPaid(id);
      set((state) => ({
        debts: state.debts.map((d) => (d.id === id ? updated : d)),
        loading: false,
      }));
    } catch (err) {
      set({ error: String(err), loading: false });
    }
  },
}));
