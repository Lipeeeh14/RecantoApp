/**
 * Aplica máscara de telefone brasileiro.
 * Celular: (XX) XXXXX-XXXX | Fixo: (XX) XXXX-XXXX
 */
export function maskPhone(value: string): string {
  const digits = value.replace(/\D/g, '').slice(0, 11);
  if (digits.length <= 10) {
    return digits
      .replace(/^(\d{2})(\d)/, '($1) $2')
      .replace(/(\d{4})(\d{1,4})$/, '$1-$2');
  }
  return digits
    .replace(/^(\d{2})(\d)/, '($1) $2')
    .replace(/(\d{5})(\d{1,4})$/, '$1-$2');
}

/** Remove todos os caracteres não numéricos do valor mascarado. */
export function unMaskPhone(value: string): string {
  return value.replace(/\D/g, '');
}

/** Valida se o e-mail tem formato básico válido. */
export function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

/**
 * Aplica máscara de moeda brasileira a partir de dígitos digitados pelo usuário.
 * Exemplo: "1234" → "R$ 12,34" | "123456" → "R$ 1.234,56"
 * Também aceita um valor já mascarado (idempotente).
 */
export function maskCurrency(value: string): string {
  const digits = value.replace(/\D/g, '');
  if (!digits) return '';
  const cents = parseInt(digits, 10);
  const reais = Math.floor(cents / 100);
  const centPart = String(cents % 100).padStart(2, '0');
  const reaisFormatted = String(reais).replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  return `R$ ${reaisFormatted},${centPart}`;
}

/**
 * Converte valor mascarado (ex: "R$ 1.234,56") para número (1234.56).
 * Usado ao salvar o formulário.
 */
export function parseCurrency(masked: string): number {
  const digits = masked.replace(/\D/g, '');
  if (!digits) return 0;
  return parseInt(digits, 10) / 100;
}

/**
 * Converte um número (ex: 1234.56) para string de dígitos usada por maskCurrency.
 * Útil ao carregar um valor existente no formulário de edição.
 */
export function numberToCurrencyDigits(value: number): string {
  return String(Math.round(value * 100));
}

/**
 * Aplica máscara de data no formato brasileiro DD/MM/AAAA.
 * Exemplo: "0304" → "03/04" | "03042026" → "03/04/2026"
 */
export function maskDate(value: string): string {
  const digits = value.replace(/\D/g, '').slice(0, 8);
  return digits
    .replace(/^(\d{2})(\d)/, '$1/$2')
    .replace(/^(\d{2}\/\d{2})(\d)/, '$1/$2');
}

/**
 * Converte data no formato DD/MM/AAAA para ISO AAAA-MM-DD.
 * Retorna null se a entrada for incompleta ou inválida.
 */
export function parseDate(masked: string): string | null {
  const match = masked.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
  if (!match) return null;
  const [, dd, mm, yyyy] = match;
  const date = new Date(`${yyyy}-${mm}-${dd}T12:00:00`);
  if (isNaN(date.getTime())) return null;
  return `${yyyy}-${mm}-${dd}`;
}

/**
 * Converte data ISO AAAA-MM-DD para exibição DD/MM/AAAA.
 * Útil ao carregar uma data existente no formulário de edição.
 */
export function isoToDisplayDate(iso: string): string {
  const match = iso.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!match) return '';
  const [, yyyy, mm, dd] = match;
  return `${dd}/${mm}/${yyyy}`;
}
