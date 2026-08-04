import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type { Sale } from '@/types';

export const useSaleHistoryStore = defineStore('saleHistory', () => {
  const salesHistory = ref<Sale[]>([]);

  const totalSalesToday = computed(() => 
    salesHistory.value.reduce((acc, sale) => acc + sale.total, 0)
  );

  function registerSale(sale: Sale) {
    salesHistory.value.unshift(sale);
  }

  return {
    salesHistory,
    totalSalesToday,
    registerSale,
  };
});