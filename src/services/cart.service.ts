import type { SaleItem, Product } from '@/types';

export class CartService {
  static round(num: number): number {
    return Number(num.toFixed(2));
  }

  static calculateSubtotal(price: number, quantity: number): number {
    return this.round(price * quantity);
  }

  static addOrUpdateItem(items: SaleItem[], product: Product): SaleItem[] {
    const index = items.findIndex((i) => i.product.id === product.id);
    if (index === -1) {
      return [...items, { product, quantity: 1, subtotal: product.price }];
    }

    const updated = [...items];
    const current = updated[index];

    if (!current) {
      return items;
    }

    const newQty = current.quantity + 1;

    updated[index] = {
      ...current,
      quantity: newQty,
      subtotal: this.calculateSubtotal(current.product.price, newQty),
    };
    return updated;
  }
}