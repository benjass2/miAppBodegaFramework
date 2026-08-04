<script setup lang="ts">
import { ref } from 'vue';
import { useCartStore } from '@/stores/useCartStore';
import CheckoutModal from './CheckoutModal.vue';
import { Trash } from 'lucide-vue-next';

const cartStore = useCartStore();
const isExpanded = ref(false);
const showCheckout = ref(false);
</script>

<template>
  <div v-if="cartStore.totalItemsCount > 0" class="active-cart-card">
    <!-- Fila Resumen Principal -->
    <div class="cart-summary-header">
      <div class="cart-badge-info" @click="isExpanded = !isExpanded">
        <span class="badge">{{ cartStore.totalItemsCount }}</span>
        <div class="text-group">
          <span class="title">Carrito Actual</span>
          <span class="toggle-text">{{ isExpanded ? 'Ocultar detalle ▲' : 'Ver detalle ▼' }}</span>
        </div>
      </div>

      <div class="cart-total-action">
        <span class="total-price">S/ {{ cartStore.totalAmount.toFixed(2) }}</span>
        <button class="btn-checkout" @click="showCheckout = true">
          Cobrar
        </button>
      </div>
    </div>

    <!-- Detalle Desplegable (Desliza hacia abajo dentro del mismo componente) -->
    <div v-if="isExpanded" class="cart-details-list">
      <div v-for="item in cartStore.activeItems" :key="item.product.id" class="detail-row">
        <div class="product-info">
          <span class="p-name">{{ item.product.name }}</span>
          <span class="p-unit">S/ {{ item.product.price.toFixed(2) }} c/u</span>
        </div>

        <div class="controls-and-subtotal">
          <div class="qty-buttons">
            <button @click="cartStore.updateQuantity(item.product.id, item.quantity - 1)">-</button>
            <span>{{ item.quantity }}</span>
            <button @click="cartStore.addProduct(item.product)">+</button>
          </div>
          <span class="subtotal">S/ {{ item.subtotal.toFixed(2) }}</span>
        </div>
      </div>

      <div class="details-footer">
        <button class="btn-clear" @click="cartStore.clearCart(); isExpanded = false">
          <Trash :size="20"/>
        </button>
      </div>
    </div>

    <!-- Modal de Cobro -->
    <CheckoutModal v-if="showCheckout" @close="showCheckout = false"
      @success="showCheckout = false; isExpanded = false" />
  </div>
</template>

<style scoped>
.active-cart-card {
  margin: 12px 16px;
  background: #ffffff;
  border: 2px solid #2563eb;
  border-radius: 14px;
  box-shadow: 0 4px 12px rgba(37, 99, 235, 0.12);
  overflow: hidden;
}

.cart-summary-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 14px;
  background: #f0f6ff;
}

.cart-badge-info {
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
}

.badge {
  background: #2563eb;
  color: white;
  font-weight: 800;
  font-size: 0.95rem;
  padding: 6px 12px;
  border-radius: 20px;
}

.text-group {
  display: flex;
  flex-direction: column;
}

.title {
  font-weight: 700;
  color: #1e293b;
  font-size: 0.9rem;
}

.toggle-text {
  font-size: 0.75rem;
  color: #2563eb;
  font-weight: 600;
}

.cart-total-action {
  display: flex;
  align-items: center;
  gap: 10px;
}

.total-price {
  font-size: 1.2rem;
  font-weight: 800;
  color: #16a34a;
}

.btn-checkout {
  background: #16a34a;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 8px;
  font-weight: 700;
  font-size: 0.95rem;
  cursor: pointer;
}

.cart-details-list {
  padding: 12px 14px;
  background: #ffffff;
  border-top: 1px solid #e2e8f0;
  max-height: 250px;
  overflow-y: auto;
}

.detail-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
  border-bottom: 1px solid #f1f5f9;
}

.p-name {
  display: block;
  font-weight: 600;
  font-size: 0.85rem;
  color: #0f172a;
}

.p-unit {
  font-size: 0.75rem;
  color: #64748b;
}

.controls-and-subtotal {
  display: flex;
  align-items: center;
  gap: 12px;
}

.qty-buttons {
  display: flex;
  align-items: center;
  border: 1px solid #cbd5e1;
  border-radius: 6px;
}

.qty-buttons button {
  width: 26px;
  height: 26px;
  border: none;
  background: #f8fafc;
  font-weight: bold;
  cursor: pointer;
}

.qty-buttons span {
  padding: 0 8px;
  font-weight: bold;
  font-size: 0.85rem;
}

.subtotal {
  font-weight: 700;
  font-size: 0.9rem;
  color: #0f172a;
  min-width: 55px;
  text-align: right;
}

.details-footer {
  margin-top: 10px;
  text-align: right;
}

.btn-clear {
  background: none;
  border: none;
  color: #ef4444;
  font-size: 0.8rem;
  font-weight: 600;
  cursor: pointer;
}
</style>