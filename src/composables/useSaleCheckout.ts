import { computed } from 'vue';
import { useCartStore } from '@/stores/useCartStore';
import { useSaleHistoryStore } from '@/stores/useSaleHistoryStore';
import type { Sale } from '@/types';

export function useSaleCheckout() {
  const cartStore = useCartStore();
  const saleHistoryStore = useSaleHistoryStore();

  const canConfirmSale = computed(() => {
    return cartStore.activeItems.length > 0 && cartStore.amountPaid >= cartStore.totalAmount;
  });

  function confirmSale(): Sale | null {
    if (!canConfirmSale.value) return null;

    const sale: Sale = {
      id: crypto.randomUUID(),
      items: cartStore.activeItems.map((item) => ({ ...item })),
      total: cartStore.totalAmount,
      amountPaid: cartStore.amountPaid,
      change: cartStore.change,
      paymentMethod: cartStore.paymentMethod,
      createdAt: new Date(),
    };

    saleHistoryStore.registerSale(sale);
    cartStore.clearCart();

    return sale;
  }

  return {
    canConfirmSale,
    confirmSale,
  };
}
