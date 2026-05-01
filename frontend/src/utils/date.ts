export function formatDate(dateString: string, locale = 'pt-BR'): string {
  const date = new Date(dateString);
  return date.toLocaleDateString(locale);
}

export function isOverdue(dueDate: string): boolean {
  const due = new Date(dueDate);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  due.setHours(0, 0, 0, 0);
  return due < today;
}

export function toISODateString(date: Date = new Date()): string {
  return date.toISOString().split('T')[0];
}
