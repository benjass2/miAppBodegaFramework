import type { Product } from '@/types/products';
import type { ProductRepository } from './productRepository';
import { getSupabaseClient } from '@/lib/supabaseClient';

/**
 * Fila tal como vive en la tabla `products` de Supabase (snake_case,
 * como es convención en SQL). Esta forma nunca sale de este archivo:
 * todo lo que devuelve este repositorio ya está en forma de `Product`.
 */
interface ProductRow {
  id: string;
  name: string;
  price: number;
  category: Product['category'];
  unit: Product['unit'] | null;
  stock: number | null;
}

function rowToProduct(row: ProductRow): Product {
  return {
    id: row.id,
    name: row.name,
    price: row.price,
    category: row.category,
    unit: row.unit ?? undefined,
    stock: row.stock ?? undefined,
  };
}

const TABLE = 'products';

export class SupabaseProductRepository implements ProductRepository {
  async getAll(): Promise<Product[]> {
    const { data, error } = await getSupabaseClient()
      .from(TABLE)
      .select('*')
      .order('name', { ascending: true });

    if (error) throw new Error(`Error al obtener productos: ${error.message}`);
    return (data as ProductRow[]).map(rowToProduct);
  }

  async create(productData: Omit<Product, 'id'>): Promise<Product> {
    const { data, error } = await getSupabaseClient()
      .from(TABLE)
      .insert({
        name: productData.name,
        price: productData.price,
        category: productData.category,
        unit: productData.unit ?? null,
        stock: productData.stock ?? null,
      })
      .select()
      .single();

    if (error) throw new Error(`Error al crear producto: ${error.message}`);
    return rowToProduct(data as ProductRow);
  }

  async update(updatedProduct: Product): Promise<Product> {
    const { data, error } = await getSupabaseClient()
      .from(TABLE)
      .update({
        name: updatedProduct.name,
        price: updatedProduct.price,
        category: updatedProduct.category,
        unit: updatedProduct.unit ?? null,
        stock: updatedProduct.stock ?? null,
      })
      .eq('id', updatedProduct.id)
      .select()
      .single();

    if (error) throw new Error(`Error al actualizar producto: ${error.message}`);
    return rowToProduct(data as ProductRow);
  }

  async delete(id: string): Promise<void> {
    const { error } = await getSupabaseClient().from(TABLE).delete().eq('id', id);
    if (error) throw new Error(`Error al eliminar producto: ${error.message}`);
  }
}
