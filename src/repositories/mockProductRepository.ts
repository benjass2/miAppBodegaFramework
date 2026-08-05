import type { Product } from '@/types/products';
import type { ProductRepository } from './productRepository';
import { MOCK_PRODUCTS } from '@/services/mockProducts';

const SIMULATED_LATENCY_MS = 200;

function delay<T>(value: T): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), SIMULATED_LATENCY_MS));
}

/**
 * Implementación "de mentira": vive en memoria del navegador y se
 * reinicia con MOCK_PRODUCTS cada vez que recargas la página.
 *
 * Cumple exactamente el mismo contrato que cumplirá
 * SupabaseProductRepository en la Fase 3 — por eso el resto de la
 * app no necesita saber que esto es un mock.
 */
export class MockProductRepository implements ProductRepository {
  private products: Product[] = [...MOCK_PRODUCTS];

  async getAll(): Promise<Product[]> {
    return delay([...this.products]);
  }

  async create(productData: Omit<Product, 'id'>): Promise<Product> {
    const product: Product = { ...productData, id: crypto.randomUUID() };
    this.products.push(product);
    return delay(product);
  }

  async update(updatedProduct: Product): Promise<Product> {
    const index = this.products.findIndex((p) => p.id === updatedProduct.id);
    if (index === -1) {
      throw new Error(`Producto con id "${updatedProduct.id}" no existe.`);
    }
    this.products[index] = { ...updatedProduct };
    return delay(this.products[index]);
  }

  async delete(id: string): Promise<void> {
    this.products = this.products.filter((p) => p.id !== id);
    return delay(undefined);
  }
}
