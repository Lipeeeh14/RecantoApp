import React from 'react';
import { Chip } from 'react-native-paper';
import { DebtStatus } from '../models';
import { STATUS_LABELS } from '../utils';

interface Props {
  status: DebtStatus;
}

const STATUS_COLORS: Record<DebtStatus, string> = {
  pending: '#F59E0B',
  overdue: '#EF4444',
  paid: '#10B981',
};

export function DebtStatusBadge({ status }: Props) {
  return (
    <Chip
      style={{ backgroundColor: STATUS_COLORS[status], alignSelf: 'flex-start' }}
      textStyle={{ color: '#fff', fontSize: 12 }}
      compact
    >
      {STATUS_LABELS[status]}
    </Chip>
  );
}
