import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type { Sale } from '@/types';
import { SupabaseSaleRepository } from '@/repositories/supabaseSalesRepository';

export const useSaleHistoryStore = defineStore('saleHistory', () => {
  const salesHistory = ref<Sale[]>([]);
  
  // Instanciamos el repositorio
  const saleRepository = new SupabaseSaleRepository();

  const totalSalesToday = computed(() => 
    salesHistory.value.reduce((acc, sale) => acc + sale.total, 0)
  );

  async function registerSale(sale: Sale) {
    try {
      // 1. Guardar en la base de datos (Supabase)
      await saleRepository.create(sale);
      
      // 2. Si se guardó en Supabase sin errores, actualizamos el estado local (UI)
      salesHistory.value.unshift(sale);
      
      console.log('Venta registrada con éxito en la base de datos');
    } catch (error) {
      console.error('Error al registrar la venta:', error);
      // Lanzamos el error por si necesitas atraparlo desde la vista/componente
      throw error; 
    }
  }

  return {
    salesHistory,
    totalSalesToday,
    registerSale,
  };
});