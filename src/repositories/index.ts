import type { ProductRepository } from './productRepository';
import { MockProductRepository } from './mockProductRepository';
import { SupabaseProductRepository } from './supabaseProductRepository';

/**
 * ÚNICO lugar de la app donde se elige la implementación real.
 *
 * VITE_DATA_SOURCE=mock      -> datos en memoria, se reinician al recargar
 * VITE_DATA_SOURCE=supabase  -> persistente y en tiempo real (requiere
 *                                 VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY
 *                                 en tu .env, ver .env.example)
 *
 * Ningún store, componente o vista sabe cuál de las dos está activa:
 * todos hablan contra el tipo ProductRepository.
 */
function createProductRepository(): ProductRepository {
  const source = import.meta.env.VITE_DATA_SOURCE ?? 'mock';
  return source === 'supabase' ? new SupabaseProductRepository() : new MockProductRepository();
}

export const productRepository: ProductRepository = createProductRepository();

export type { ProductRepository };
