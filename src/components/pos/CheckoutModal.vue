<script setup lang="ts">
import { onMounted } from 'vue';
import { useCartStore } from '@/stores/useCartStore';
import { useSaleCheckout } from '@/composables/useSaleCheckout';
import type { PaymentMethod } from '@/types';
import { formatCurrency } from '@/utils/currency';

const cartStore = useCartStore();
const { canConfirmSale, hasStockForAllItems, confirmSale } = useSaleCheckout();

const emit = defineEmits<{
  (e: 'close'): void;
  (e: 'success'): void;
}>();

// Opciones de billetes rápidos en Perú
const quickAmounts = [10, 20, 50, 100];

onMounted(() => {
  cartStore.amountPaid = cartStore.totalAmount;
});

function selectPaymentMethod(method: PaymentMethod) {
  cartStore.paymentMethod = method;
  cartStore.amountPaid = cartStore.totalAmount;
}

function handleConfirmSale() {
  const sale = confirmSale();
  if (!sale) return;

  alert(`✅ Venta registrada con éxito.\nVuelto: ${formatCurrency(sale.change)}`);
  emit('success');
}
</script>

<template>
  <div class="modal-backdrop" @click="emit('close')">
    <div class="modal-card" @click.stop>
      <header class="modal-header">
        <h2>Cobrar Venta</h2>
        <button class="btn-close" @click="emit('close')">✕</button>
      </header>

      <div class="modal-body">
        <!-- Total a pagar -->
        <div class="total-display">
          <span class="label">Total a Cobrar</span>
          <span class="amount">{{ formatCurrency(cartStore.totalAmount) }}</span>
        </div>

        <!-- Método de Pago -->
        <div class="section">
          <label>Método de Pago</label>
          <div class="methods-grid">
            <button class="method-btn" :class="{ active: cartStore.paymentMethod === 'efectivo' }"
              @click="selectPaymentMethod('efectivo')">
              💵 Efectivo
            </button>
            <button class="method-btn" :class="{ active: cartStore.paymentMethod === 'yape' }"
              @click="selectPaymentMethod('yape')">
              📱 Yape
            </button>
            <button class="method-btn" :class="{ active: cartStore.paymentMethod === 'plin' }"
              @click="selectPaymentMethod('plin')">
              📲 Plin
            </button>
            <button class="method-btn" :class="{ active: cartStore.paymentMethod === 'tarjeta' }"
              @click="selectPaymentMethod('tarjeta')">
              💳 Tarjeta
            </button>
          </div>
        </div>

        <!-- Sección de Vuelto (solo si es efectivo) -->
        <div v-if="cartStore.paymentMethod === 'efectivo'" class="section">
          <label>Paga con (S/):</label>
          <input v-model.number="cartStore.amountPaid" type="number" step="0.5" class="input-paid" placeholder="0.00" />

          <!-- Botones de billetes rápidos -->
          <div class="quick-bills">
            <button v-for="bill in quickAmounts" :key="bill" class="bill-chip" @click="cartStore.amountPaid = bill">
              S/ {{ bill }}
            </button>
            <button class="bill-chip exact" @click="cartStore.amountPaid = cartStore.totalAmount">
              Exacto
            </button>
          </div>

          <!-- Display de Vuelto -->
          <div class="change-display" :class="{ 'has-change': cartStore.change > 0 }">
            <span>Vuelto a entregar:</span>
            <strong>{{ formatCurrency(cartStore.change) }}</strong>
          </div>
        </div>
      </div>

      <!-- Acciones finales -->
      <footer class="modal-footer">
        <p v-if="!hasStockForAllItems" class="stock-warning">
          ⚠️ Uno o más productos no tienen stock suficiente.
        </p>
        <button class="btn-confirm" :disabled="!canConfirmSale" @click="handleConfirmSale">
          Confirmar Venta
        </button>
      </footer>
    </div>
  </div>
</template>

<style scoped>
.modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.6);
  backdrop-filter: blur(2px);
  display: flex;
  align-items: flex-end;
  z-index: 100;
}

.modal-card {
  width: 100%;
  background: #ffffff;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  padding: 20px;
  box-sizing: border-box;
  max-height: 90vh;
  overflow-y: auto;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.modal-header h2 {
  margin: 0;
  font-size: 1.2rem;
  color: #0f172a;
}

.btn-close {
  background: none;
  border: none;
  font-size: 1.2rem;
  color: #64748b;
  cursor: pointer;
}

.total-display {
  background: #f0fdf4;
  border: 1px solid #bbf7d0;
  padding: 16px;
  border-radius: 12px;
  text-align: center;
  margin-bottom: 20px;
}

.total-display .label {
  display: block;
  font-size: 0.85rem;
  color: #166534;
}

.total-display .amount {
  font-size: 2rem;
  font-weight: 800;
  color: #15803d;
}

.section {
  margin-bottom: 16px;
}

.section label {
  display: block;
  font-size: 0.85rem;
  font-weight: 600;
  color: #475569;
  margin-bottom: 8px;
}

.methods-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 8px;
}

.method-btn {
  padding: 10px;
  border: 1px solid #cbd5e1;
  background: #f8fafc;
  border-radius: 10px;
  font-weight: 600;
  color: #334155;
  cursor: pointer;
}

.method-btn.active {
  background: #2563eb;
  color: white;
  border-color: #2563eb;
}

.input-paid {
  width: 100%;
  padding: 12px;
  font-size: 1.25rem;
  font-weight: bold;
  border: 2px solid #cbd5e1;
  border-radius: 10px;
  box-sizing: border-box;
}

.quick-bills {
  display: flex;
  gap: 8px;
  margin-top: 10px;
  overflow-x: auto;
}

.bill-chip {
  padding: 8px 12px;
  background: #e2e8f0;
  border: none;
  border-radius: 8px;
  font-weight: bold;
  color: #1e293b;
  cursor: pointer;
  white-space: nowrap;
}

.bill-chip.exact {
  background: #dbeafe;
  color: #1d4ed8;
}

.change-display {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 16px;
  padding: 12px;
  background: #f1f5f9;
  border-radius: 10px;
  font-size: 1rem;
}

.change-display.has-change {
  background: #fef3c7;
  color: #92400e;
}

.stock-warning {
  margin: 0 0 10px;
  color: #b91c1c;
  font-size: 0.85rem;
  font-weight: 600;
  text-align: center;
}

.btn-confirm {
  width: 100%;
  padding: 16px;
  background: #16a34a;
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 1.1rem;
  font-weight: bold;
  cursor: pointer;
}

.btn-confirm:disabled {
  background: #cbd5e1;
  cursor: not-allowed;
}

@media (min-width: 640px) {
  .modal-backdrop {
    align-items: center;
    justify-content: center;
  }

  .modal-card {
    max-width: 450px;
    border-radius: 20px;
  }
}
</style>