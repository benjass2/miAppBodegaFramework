<script setup lang="ts">
import { onMounted } from 'vue';
import { useProductStore } from '@/stores/useProductStore';
import { useCartStore } from '@/stores/useCartStore';
import ProductCard from '@/components/pos/ProductCard.vue';
import CartDrawer from '@/components/pos/CartDrawer.vue';
import ProductFilters from '@/components/pos/ProductFilters.vue';

const productStore = useProductStore();
const cartStore = useCartStore();

onMounted(() => {
  productStore.fetchProducts();
});
</script>

<template>
  <div class="pos-container">

    <header class="pos-header">
      <h1 class="store-title">Bodega</h1>
    </header>

    <ProductFilters />
    <CartDrawer />
    <main class="products-grid">
      <div v-if="productStore.isLoading" class="state-msg">
        Cargando catálogo...
      </div>

      <div v-else-if="productStore.filteredProducts.length === 0" class="state-msg">
        No se encontraron productos
      </div>


      <ProductCard v-else v-for="product in productStore.filteredProducts" :key="product.id" :product="product"
        @select="cartStore.addProduct" />
    </main>
  </div>
</template>

<style scoped>
.pos-container {
  min-height: 100vh;
  background-color: #f8fafc;
  padding-bottom: 90px;
}

.pos-header {
  padding: 14px 16px;
  background: #ffffff;
  border-bottom: 1px solid #e2e8f0;
  position: sticky;
  top: 0;
  z-index: 10;
}

.store-title {
  font-size: 1.9rem;
  font-weight: 700;
  color: #3e4e72;
  margin: 0;
  text-align: center;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
  padding: 16px;
}

.state-msg {
  grid-column: 1 / -1;
  text-align: center;
  color: #64748b;
  padding: 40px 0;
}

/* Responsivo para Tablets y Laptops */
@media (min-width: 640px) {
  .products-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (min-width: 1024px) {
  .products-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}
</style>