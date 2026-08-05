import type { ProductRepository } from './productRepository';
import { SupabaseProductRepository } from './supabaseProductRepository';

// Exportamos directamente la instancia de Supabase
export const productRepository: ProductRepository = new SupabaseProductRepository();

export type { ProductRepository };