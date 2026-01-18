/**
 * Formata um número como moeda brasileira (R$)
 * @param value - Valor numérico a ser formatado
 * @returns String formatada como "R$ X.XXX,XX"
 */
export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value)
}
