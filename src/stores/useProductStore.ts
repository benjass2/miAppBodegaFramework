import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type { Product, ProductCategory } from '@/types/products';
import { productService } from '@/services/productService';

export type SortOption = 'name' | 'price' | 'category';
export type SortOrder = 'asc' | 'desc';

export const useProductStore = defineStore('product', () => {
  const products = ref<Product[]>([]);
  const searchQuery = ref('');
  const selectedCategory = ref<ProductCategory | 'Todas'>('Todas');
  const isLoading = ref(false);

  // --- Nuevos estados para el ordenamiento ---
  const sortBy = ref<SortOption>('name');
  const sortOrder = ref<SortOrder>('asc');

  async function fetchProducts() {
    isLoading.value = true;
    try {
      products.value = await productService.getProducts();
    } finally {
      isLoading.value = false;
    }
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

  function addProduct(newProduct: Omit<Product, 'id'>) {
    const product: Product = {
      ...newProduct,
      id: Date.now().toString(),
    };
    products.value.push(product);
  }

  function updateProductPrice(productId: string, newPrice: number) {
    const product = products.value.find((p) => p.id === productId);
    if (product && newPrice > 0) {
      product.price = Number(newPrice.toFixed(2));
    }
  }

  function deleteProduct(productID: string) {
    products.value = products.value.filter((p) => p.id !== productID);
  }


  function updateProduct(updatedProduct: Product) {
    const index = products.value.findIndex((p) => p.id === updatedProduct.id);
    if (index !== -1) {
      products.value[index] = { ...updatedProduct };
    }
  }

  return {
    products,
    searchQuery,
    selectedCategory,
    isLoading,
    sortBy,
    sortOrder,
    filteredProducts,
    fetchProducts,
    toggleSortOrder,
    addProduct,
    updateProductPrice,
    deleteProduct,
    updateProduct,
  };
});