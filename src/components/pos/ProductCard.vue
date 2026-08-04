<script setup lang="ts">
import type { Product } from '@/types/products';
import { categoryColors } from '@/assets/utils/CategoryColor';
defineProps<{ product: Product; }>();

const emit = defineEmits<{
  (e: 'select', product: Product): void;
}>();
</script>

<template>
  <button class="product-card" @click="emit('select', product)">
    <div class="product-info">
      <span class="category" :style="{ color: categoryColors[product.category] }">
        {{ product.category }}
      </span>
      <h3 class="name">{{ product.name }}</h3>
    </div>
    <div class="product-price">
      <span class="currency">S/</span>
      <span class="amount">{{ product.price.toFixed(2) }}</span>
    </div>
  </button>
</template>


<style scoped>
.product-card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 0.75rem;
  width: 100%;
  min-width: 0;
  min-height: 120px;
  padding: 1rem;
  background: #dde2e3;
  border-radius: 16px;
  border: 1px solid #bdcbe8; /* gris elegante */
  cursor: pointer;
  text-align: left;
  transition: transform 0.15s ease, box-shadow 0.15s ease;
  box-sizing: border-box;
}

.product-info {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  min-width: 0;
}

.category {
  font-size: 0.75rem;
  font-weight: 500;
  color: #94a3b8;
  text-transform: capitalize;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.name {
  font-size: 0.95rem;
  font-weight: 700;
  color: #1e293b;
  line-height: 1.3;
  margin: 0;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  word-break: break-word;
}

.product-price {
  display: flex;
  align-items: baseline;
  gap: 0.15rem;
  flex-shrink: 0;
  white-space: nowrap;
}

.currency {
  font-size: 0.85rem;
  font-weight: 600;
  color: #64748b;
}

.amount {
  font-size: 1.35rem;
  font-weight: 700;
  color: #000000;
}
</style>
