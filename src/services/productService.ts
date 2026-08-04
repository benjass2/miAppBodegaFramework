import type { Product } from "@/types/products";
import {MOCK_PRODUCTS} from './mockProducts';

export const productService={
    async getProducts(): Promise<Product[]> {
    return new Promise((resolve) => {
      setTimeout(() => resolve(MOCK_PRODUCTS), 200); // Pequeña simulación de red
    });
  }
}