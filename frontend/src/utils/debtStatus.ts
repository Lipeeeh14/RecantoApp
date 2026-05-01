import { Debt, DebtStatus, DebtWithStatus } from '../models';
import { isOverdue } from './date';

export function computeDebtStatus(debt: Debt): DebtStatus {
  if (debt.paid) return 'paid';
  if (isOverdue(debt.dueDate)) return 'overdue';
  return 'pending';
}

export function withStatus(debt: Debt): DebtWithStatus {
  return { ...debt, status: computeDebtStatus(debt) };
}

export const STATUS_LABELS: Record<DebtStatus, string> = {
  pending: 'Pendente',
  overdue: 'Em Atraso',
  paid: 'Quitada',
};
