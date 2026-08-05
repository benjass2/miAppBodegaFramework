/**
 * Fuente única de verdad para las categorías de producto.
 * Antes esta lista vivía duplicada (y desincronizada) en:
 *  - types/products.ts
 *  - components/pos/ProductFilters.vue
 *  - components/admin/ProductFormModal.vue
 *  - assets/utils/CategoryColor.ts (incompleto: faltaban 'Lácteos' y 'Otros')
 *
 * Cualquier categoría nueva se agrega SOLO aquí.
 */
export const PRODUCT_CATEGORIES = [
  'Abarrotes',
  'Bebidas',
  'Lácteos',
  'Snacks',
  'Limpieza',
  'Otros',
] as const;

export type ProductCategory = (typeof PRODUCT_CATEGORIES)[number];

/**
 * Al tipar con Record<ProductCategory, string>, TypeScript obliga a
 * cubrir TODAS las categorías. Si se agrega una categoría nueva en
 * PRODUCT_CATEGORIES y se olvida su color aquí, el build falla en
 * lugar de mostrar un color `undefined` en producción.
 */
export const categoryColors: Record<ProductCategory, string> = {
  Abarrotes: '#f59e0b',
  Bebidas: '#0ea5e9',
  Lácteos: '#ec4899',
  Snacks: '#a855f7',
  Limpieza: '#10b981',
  Otros: '#64748b',
};

/** Opciones para selects de filtro que incluyen la opción "Todas". */
export const PRODUCT_CATEGORY_FILTER_OPTIONS = ['Todas', ...PRODUCT_CATEGORIES] as const;
