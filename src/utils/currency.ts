/**
 * Antes: cada componente hacía `S/ {{ valor.toFixed(2) }}` a mano
 * (ProductCard, CartDrawer, CheckoutModal, ProductsAdminView, SalesHistoryView...).
 * Duplicado 6+ veces y sin soporte real de locale.
 *
 * Ahora: un solo punto de formato. Cambiar de moneda o locale es un
 * cambio de una línea, no una búsqueda-y-reemplazo en toda la app.
 */
const formatter = new Intl.NumberFormat('es-PE', {
  style: 'currency',
  currency: 'PEN',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export function formatCurrency(amount: number): string {
  return formatter.format(amount);
}

/**
 * Redondeo monetario centralizado (antes duplicado entre
 * CartService.round() y useProductStore.updateProductPrice()).
 */
export function roundCurrency(amount: number): number {
  return Number(amount.toFixed(2));
}
