import { Debt } from '../../models';
import { mockDebts } from '../mocks/debts';

const BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL ?? 'http://localhost:3000';

export interface DebtService {
  getAll(): Promise<Debt[]>;
  getByClientId(clientId: string): Promise<Debt[]>;
  getById(id: string): Promise<Debt>;
  create(data: Omit<Debt, 'id' | 'createdAt' | 'updatedAt'>): Promise<Debt>;
  update(id: string, data: Partial<Omit<Debt, 'id' | 'createdAt' | 'updatedAt'>>): Promise<Debt>;
  remove(id: string): Promise<void>;
  markAsPaid(id: string): Promise<Debt>;
}

export const debtService: DebtService = {
  async getAll() {
    return [...mockDebts];
  },
  async getByClientId(clientId) {
    return mockDebts.filter((d) => d.clientId === clientId).map((d) => ({ ...d }));
  },
  async getById(id) {
    const debt = mockDebts.find((d) => d.id === id);
    if (!debt) throw new Error(`Debt ${id} not found`);
    return { ...debt };
  },
  async create(data) {
    const newDebt: Debt = {
      ...data,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    mockDebts.push(newDebt);
    return { ...newDebt };
  },
  async update(id, data) {
    const index = mockDebts.findIndex((d) => d.id === id);
    if (index === -1) throw new Error(`Debt ${id} not found`);
    mockDebts[index] = {
      ...mockDebts[index],
      ...data,
      updatedAt: new Date().toISOString(),
    };
    return { ...mockDebts[index] };
  },
  async remove(id) {
    const index = mockDebts.findIndex((d) => d.id === id);
    if (index !== -1) mockDebts.splice(index, 1);
  },
  async markAsPaid(id) {
    return debtService.update(id, { paid: true });
  },
};

void BASE_URL;
