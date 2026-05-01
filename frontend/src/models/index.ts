export type DebtStatus = 'pending' | 'overdue' | 'paid';

export interface Client {
  id: string;
  name: string;
  phone?: string;
  email?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Debt {
  id: string;
  clientId: string;
  description: string;
  amount: number;
  dueDate: string;
  createdAt: string;
  updatedAt: string;
  paid: boolean;
}

export interface DebtWithStatus extends Debt {
  status: DebtStatus;
}

export interface DashboardSummary {
  totalPending: number;
  totalOverdue: number;
  totalPaid: number;
  countPending: number;
  countOverdue: number;
  countPaid: number;
}
