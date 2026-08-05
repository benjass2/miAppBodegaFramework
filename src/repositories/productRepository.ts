import type { Product } from '@/types/products';

/**
 * Contrato que debe cumplir CUALQUIER fuente de datos de productos:
 * el mock actual, Supabase mañana, o cualquier otra API en el futuro.
 *
 * El store (useProductStore.ts) solo conoce esta interfaz, nunca la
 * implementación concreta. Por eso cambiar de mock -> Supabase no
 * requiere tocar el store: solo se cambia QUÉ implementación se
 * inyecta (ver repositories/index.ts).
 */
export interface ProductRepository {
  /** Trae el catálogo completo. */
  getAll(): Promise<Product[]>;

  /** Crea un producto nuevo. El repositorio decide cómo generar el id. */
  create(product: Omit<Product, 'id'>): Promise<Product>;

  /** Actualiza un producto existente y devuelve la versión guardada. */
  update(product: Product): Promise<Product>;

  /** Elimina un producto por id. */
  delete(id: string): Promise<void>;
}
