import { getSupabaseClient } from '@/lib/supabaseClient';
import type { Sale } from '@/types'; 

export class SupabaseSaleRepository {
  async create(sale: Sale): Promise<void> {
    const supabase = getSupabaseClient();

    // 1. Insertar el encabezado de la venta (Mapeo a snake_case)
    const { error: saleError } = await supabase
      .from('sales')
      .insert({
        id: sale.id,
        total: sale.total,
        amount_paid: sale.amountPaid,      // Mapeo correcto para Supabase
        change: sale.change,
        payment_method: sale.paymentMethod, // Mapeo correcto para Supabase
        created_at: sale.createdAt.toISOString() // Formatear fecha si es necesario
      });

    if (saleError) {
      throw new Error(`Error al registrar la venta: ${saleError.message}`);
    }

    // 2. Preparar y mapear los ítems de la venta a snake_case
    const saleItemsPayload = sale.items.map(item => ({
      sale_id: sale.id,
      product_id: item.product.id,
      quantity: item.quantity,
      // Si en tu tipo SaleItem tienes un 'subtotal', úsalo aquí. 
      // Si no, lo calculas multiplicando precio por cantidad:
      subtotal: item.product.price * item.quantity 
    }));

    // 3. Insertar los ítems en 'sale_items'
    const { error: itemsError } = await supabase
      .from('sale_items')
      .insert(saleItemsPayload);

    if (itemsError) {
      throw new Error(`Error al registrar los ítems de la venta: ${itemsError.message}`);
    }
  }
}