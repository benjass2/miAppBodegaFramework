import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type { Product, ProductCategory } from '@/types/products';
import type { SaleItem } from '@/types/sale';
import { productRepository } from '@/repositories';
import { roundCurrency } from '@/utils/currency';

export type SortOption = 'name' | 'price' | 'category';
export type SortOrder = 'asc' | 'desc';

export const useProductStore = defineStore('product', () => {
  const products = ref<Product[]>([]);
  const searchQuery = ref('');
  const selectedCategory = ref<ProductCategory | 'Todas'>('Todas');
  const isLoading = ref(false);
  /** Mensaje legible para mostrar en la UI si una operación falla. */
  const errorMessage = ref<string | null>(null);

  // --- Nuevos estados para el ordenamiento ---
  const sortBy = ref<SortOption>('name');
  const sortOrder = ref<SortOrder>('asc');

  /**
   * Envuelve cualquier operación contra el repositorio para que todas
   * reporten errores de la misma forma, sin repetir try/catch 4 veces.
   */
  async function withErrorHandling<T>(
    operation: () => Promise<T>,
    errorFallbackMessage: string
  ): Promise<T | null> {
    errorMessage.value = null;
    try {
      return await operation();
    } catch {
      errorMessage.value = errorFallbackMessage;
      return null;
    }
  }

  async function fetchProducts() {
    isLoading.value = true;
    const result = await withErrorHandling(
      () => productRepository.getAll(),
      'No se pudo cargar el catálogo. Intenta de nuevo.'
    );
    if (result) products.value = result;
    isLoading.value = false;
  }

  // Filtrado + Ordenamiento ultrarrápido para el mostrador
  const filteredProducts = computed(() => {
    return products.value
      .filter((product) => {
        const matchesSearch = product.name
          .toLowerCase()
          .includes(searchQuery.value.toLowerCase());

        const matchesCategory =
          selectedCategory.value === 'Todas' ||
          product.category === selectedCategory.value;

        return matchesSearch && matchesCategory;
      })
      .sort((a, b) => {
        let result = 0;

        if (sortBy.value === 'name') {
          result = a.name.localeCompare(b.name);
        } else if (sortBy.value === 'price') {
          result = a.price - b.price;
        } else if (sortBy.value === 'category') {
          result = a.category.localeCompare(b.category);
        }

        return sortOrder.value === 'asc' ? result : -result;
      });
  });

  // Alternar entre Ascendente y Descendente
  function toggleSortOrder() {
    sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc';
  }

  async function addProduct(newProduct: Omit<Product, 'id'>): Promise<Product | null> {
    const created = await withErrorHandling(
      () => productRepository.create(newProduct),
      'No se pudo crear el producto. Intenta de nuevo.'
    );
    if (created) products.value.push(created);
    return created;
  }

  async function updateProductPrice(productId: string, newPrice: number): Promise<void> {
    const product = products.value.find((p) => p.id === productId);
    if (!product || newPrice <= 0) return;
    await updateProduct({ ...product, price: roundCurrency(newPrice) });
  }

  async function deleteProduct(productID: string): Promise<void> {
    const result = await withErrorHandling(
      () => productRepository.delete(productID),
      'No se pudo eliminar el producto. Intenta de nuevo.'
    );
    if (result !== null) {
      products.value = products.value.filter((p) => p.id !== productID);
    }
  }


  /**
   * Un producto sin `stock` definido se considera de stock ilimitado
   * (útil para bodegas que aún no llevan control de inventario por ítem).
   */
  function hasSufficientStock(productId: string, quantity: number): boolean {
    const product = products.value.find((p) => p.id === productId);
    if (!product || product.stock === undefined) return true;
    return product.stock >= quantity;
  }

  /**
   * Descuenta stock tras confirmar una venta. Debe llamarse SOLO después
   * de validar hasSufficientStock() para cada ítem (ver useSaleCheckout).
   */
  function decrementStock(items: SaleItem[]) {
    for (const { product, quantity } of items) {
      const target = products.value.find((p) => p.id === product.id);
      if (target?.stock !== undefined) {
        target.stock = Math.max(0, target.stock - quantity);
      }
    }
  }

  async function updateProduct(updatedProduct: Product): Promise<void> {
    const saved = await withErrorHandling(
      () => productRepository.update(updatedProduct),
      'No se pudo guardar el cambio. Intenta de nuevo.'
    );
    if (!saved) return;
    const index = products.value.findIndex((p) => p.id === saved.id);
    if (index !== -1) {
      products.value[index] = saved;
    }
  }

  return {
    products,
    searchQuery,
    selectedCategory,
    isLoading,
    errorMessage,
    sortBy,
    sortOrder,
    filteredProducts,
    fetchProducts,
    toggleSortOrder,
    addProduct,
    updateProductPrice,
    deleteProduct,
    updateProduct,
    hasSufficientStock,
    decrementStock,
  };
});