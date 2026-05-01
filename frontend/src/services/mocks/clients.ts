import { Client } from '../../models';

export const mockClients: Client[] = [
  {
    id: '1',
    name: 'João Silva',
    phone: '(11) 99999-0001',
    email: 'joao@email.com',
    notes: 'Cliente antigo',
    createdAt: '2024-01-10T10:00:00.000Z',
    updatedAt: '2024-01-10T10:00:00.000Z',
  },
  {
    id: '2',
    name: 'Maria Souza',
    phone: '(11) 99999-0002',
    email: 'maria@email.com',
    notes: '',
    createdAt: '2024-02-15T10:00:00.000Z',
    updatedAt: '2024-02-15T10:00:00.000Z',
  },
  {
    id: '3',
    name: 'Carlos Oliveira',
    phone: '(11) 99999-0003',
    email: '',
    notes: 'Paga sempre atrasado',
    createdAt: '2024-03-20T10:00:00.000Z',
    updatedAt: '2024-03-20T10:00:00.000Z',
  },
];
