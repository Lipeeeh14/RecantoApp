import { Client } from '../../models';

const BASE_URL = `${process.env.EXPO_PUBLIC_API_BASE_URL ?? 'http://localhost:3000'}/api`;

async function handleResponse<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const body = await res.text();
    throw new Error(body || `HTTP ${res.status}`);
  }
  return res.json() as Promise<T>;
}

export interface ClientService {
  getAll(): Promise<Client[]>;
  getById(id: string): Promise<Client>;
  create(data: Omit<Client, 'id' | 'createdAt' | 'updatedAt'>): Promise<Client>;
  update(id: string, data: Partial<Omit<Client, 'id' | 'createdAt' | 'updatedAt'>>): Promise<Client>;
  remove(id: string): Promise<void>;
}

export const clientService: ClientService = {
  async getAll() {
    const res = await fetch(`${BASE_URL}/clients`);
    return handleResponse<Client[]>(res);
  },
  async getById(id) {
    const res = await fetch(`${BASE_URL}/clients/${id}`);
    return handleResponse<Client>(res);
  },
  async create(data) {
    const res = await fetch(`${BASE_URL}/clients`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return handleResponse<Client>(res);
  },
  async update(id, data) {
    const res = await fetch(`${BASE_URL}/clients/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return handleResponse<Client>(res);
  },
  async remove(id) {
    const res = await fetch(`${BASE_URL}/clients/${id}`, { method: 'DELETE' });
    if (!res.ok) {
      const body = await res.text();
      throw new Error(body || `HTTP ${res.status}`);
    }
  },
};
