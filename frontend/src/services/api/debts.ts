import { Debt } from '../../models';

const BASE_URL = `${process.env.EXPO_PUBLIC_API_BASE_URL ?? 'http://localhost:3000'}/api`;

async function handleResponse<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const body = await res.text();
    throw new Error(body || `HTTP ${res.status}`);
  }
  return res.json() as Promise<T>;
}

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
    const res = await fetch(`${BASE_URL}/debts`);
    return handleResponse<Debt[]>(res);
  },
  async getByClientId(clientId) {
    const res = await fetch(`${BASE_URL}/debts/client/${clientId}`);
    return handleResponse<Debt[]>(res);
  },
  async getById(id) {
    const res = await fetch(`${BASE_URL}/debts/${id}`);
    return handleResponse<Debt>(res);
  },
  async create(data) {
    const res = await fetch(`${BASE_URL}/debts`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return handleResponse<Debt>(res);
  },
  async update(id, data) {
    const res = await fetch(`${BASE_URL}/debts/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return handleResponse<Debt>(res);
  },
  async remove(id) {
    const res = await fetch(`${BASE_URL}/debts/${id}`, { method: 'DELETE' });
    if (!res.ok) {
      const body = await res.text();
      throw new Error(body || `HTTP ${res.status}`);
    }
  },
  async markAsPaid(id) {
    return debtService.update(id, { paid: true });
  },
};
