import { Debt } from '../../models';

export const mockDebts: Debt[] = [
  {
    id: '1',
    clientId: '1',
    description: 'Empréstimo pessoal',
    amount: 500.0,
    dueDate: '2025-06-01',
    createdAt: '2024-01-10T10:00:00.000Z',
    updatedAt: '2024-01-10T10:00:00.000Z',
    paid: false,
  },
  {
    id: '2',
    clientId: '1',
    description: 'Material de construção',
    amount: 1200.0,
    dueDate: '2024-12-01',
    createdAt: '2024-03-01T10:00:00.000Z',
    updatedAt: '2024-03-01T10:00:00.000Z',
    paid: false,
  },
  {
    id: '3',
    clientId: '2',
    description: 'Conserto do carro',
    amount: 800.0,
    dueDate: '2025-07-15',
    createdAt: '2024-02-15T10:00:00.000Z',
    updatedAt: '2024-02-15T10:00:00.000Z',
    paid: true,
  },
  {
    id: '4',
    clientId: '3',
    description: 'Compras do mês',
    amount: 350.0,
    dueDate: '2024-11-30',
    createdAt: '2024-03-20T10:00:00.000Z',
    updatedAt: '2024-03-20T10:00:00.000Z',
    paid: false,
  },
];
