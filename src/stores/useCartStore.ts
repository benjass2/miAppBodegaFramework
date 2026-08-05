import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type { Product, SaleItem, PaymentMethod } from '@/types';
import { CartService } from '@/services/cart.service';

export const useCartStore = defineStore('cart', () => {
  const activeItems = ref<SaleItem[]>([]);
  const amountPaid = ref<number>(0);
  const paymentMethod = ref<PaymentMethod>('efectivo');

  const totalAmount = computed(() => 
    CartService.round(activeItems.value.reduce((sum, item) => sum + item.subtotal, 0))
  );

  const change = computed(() => {
    if (amountPaid.value < totalAmount.value) return 0;
    return CartService.round(amountPaid.value - totalAmount.value);
  });

  const totalItemsCount = computed(() => 
    activeItems.value.reduce((sum, item) => sum + item.quantity, 0)
  );

  function addProduct(product: Product) {
    activeItems.value = CartService.addOrUpdateItem(activeItems.value, product);
  }

  function updateQuantity(productId: string, quantity: number) {
    if (quantity <= 0) return removeProduct(productId);

    activeItems.value = activeItems.value.map((item) =>
      item.product.id === productId
        ? {
            ...item,
            quantity,
            subtotal: CartService.calculateSubtotal(item.product.price, quantity),
          }
        : item
    );
  }

  function removeProduct(productId: string) {
    activeItems.value = activeItems.value.filter((i) => i.product.id !== productId);
  }

  function clearCart() {
    activeItems.value = [];
    amountPaid.value = 0;
    paymentMethod.value = 'efectivo';
  }

  return {
    activeItems,
    amountPaid,
    paymentMethod,
    totalAmount,
    change,
    totalItemsCount,
    addProduct,
    updateQuantity,
    removeProduct,
    clearCart,
  };
});