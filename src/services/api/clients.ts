import { Client } from '../../models';
import { mockClients } from '../mocks/clients';

// BASE_URL will replace mock calls when the real backend is ready, e.g. fetch(`${BASE_URL}/clients`)
export const BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL ?? 'http://localhost:3000';

export interface ClientService {
  getAll(): Promise<Client[]>;
  getById(id: string): Promise<Client>;
  create(data: Omit<Client, 'id' | 'createdAt' | 'updatedAt'>): Promise<Client>;
  update(id: string, data: Partial<Omit<Client, 'id' | 'createdAt' | 'updatedAt'>>): Promise<Client>;
  remove(id: string): Promise<void>;
}

// Mock implementation — replace with real HTTP calls when backend is ready
export const clientService: ClientService = {
  async getAll() {
    // TODO: replace with fetch(`${BASE_URL}/clients`)
    return [...mockClients];
  },
  async getById(id) {
    const client = mockClients.find((c) => c.id === id);
    if (!client) throw new Error(`Client ${id} not found`);
    return { ...client };
  },
  async create(data) {
    const newClient: Client = {
      ...data,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    mockClients.push(newClient);
    return { ...newClient };
  },
  async update(id, data) {
    const index = mockClients.findIndex((c) => c.id === id);
    if (index === -1) throw new Error(`Client ${id} not found`);
    mockClients[index] = {
      ...mockClients[index],
      ...data,
      updatedAt: new Date().toISOString(),
    };
    return { ...mockClients[index] };
  },
  async remove(id) {
    const index = mockClients.findIndex((c) => c.id === id);
    if (index !== -1) mockClients.splice(index, 1);
  },
};
