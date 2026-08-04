<script setup lang="ts">
import { ref, computed } from 'vue';
import { useSaleHistoryStore } from '@/stores/useSaleHistoryStore';

const saleHistoryStore = useSaleHistoryStore();
const selectedMethod = ref<string>('todos');

const filteredSales = computed(() => {
    if (selectedMethod.value === 'todos') {
        return saleHistoryStore.salesHistory;
    }
    return saleHistoryStore.salesHistory.filter(
        (sale) => sale.paymentMethod === selectedMethod.value
    );
});

function formatTime(date: Date | string) {
    return new Date(date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}
</script>

<template>
    <div class="history-view">
        <h2>Historial de Ventas</h2>

        <div class="summary-bar">
            <div class="stat-card">
                <span>Ventas Totales </span>
                <strong>S/ {{ saleHistoryStore.totalSalesToday.toFixed(2) }}</strong>
            </div>
        </div>

        <div class="filters">
            <button :class="{ active: selectedMethod === 'todos' }" @click="selectedMethod = 'todos'">
                Todos
            </button>
            <button :class="{ active: selectedMethod === 'efectivo' }" @click="selectedMethod = 'efectivo'">
                Efectivo
            </button>
            <button :class="{ active: selectedMethod === 'yape' }" @click="selectedMethod = 'yape'">
                Yape / Plin
            </button>
        </div>

        <div class="sales-list">
            <p v-if="filteredSales.length === 0" class="empty">No hay registros de ventas.</p>

            <div v-for="sale in filteredSales" :key="sale.id" class="sale-item">
                <div class="sale-header">
                    <span>🕒 {{ formatTime(sale.createdAt) }}</span>
                    <span class="badge">{{ sale.paymentMethod }}</span>
                </div>
                <div class="sale-details">
                    <div v-for="item in sale.items" :key="item.product.id" class="item-line">
                        <span>{{ item.quantity }}x {{ item.product.name }}</span>
                        <span>S/ {{ item.subtotal.toFixed(2) }}</span>
                    </div>
                </div>
                <div class="sale-footer">
                    <strong>Total: S/ {{ sale.total.toFixed(2) }}</strong>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.history-view {
    padding: 1rem;
}

.summary-bar {
    display: flex;
    gap: 1rem;
    margin-bottom: 1rem;
}

.stat-card {
    background: #f3f4f6;
    padding: 0.75rem 1rem;
    border-radius: 8px;
}

.filters {
    display: flex;
    gap: 0.5rem;
    margin-bottom: 1rem;
}

.filters button {
    padding: 0.4rem 0.8rem;
    border-radius: 6px;
    border: 1px solid #ccc;
    background: white;
    cursor: pointer;
}

.filters button.active {
    background: #2563eb;
    color: white;
    border-color: #2563eb;
}

.sales-list {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
}

.sale-item {
    background: white;
    border: 1px solid #e5e7eb;
    border-radius: 8px;
    padding: 0.75rem;
}

.sale-header {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px dashed #eee;
    padding-bottom: 0.4rem;
}

.badge {
    font-weight: bold;
    text-transform: uppercase;
    font-size: 0.75rem;
    background: #e0f2fe;
    color: #0369a1;
    padding: 2px 6px;
    border-radius: 4px;
}

.sale-details {
    margin: 0.5rem 0;
    font-size: 0.9rem;
}

.item-line {
    display: flex;
    justify-content: space-between;
}

.sale-footer {
    text-align: right;
    border-top: 1px solid #eee;
    padding-top: 0.4rem;
}

.empty {
    color: #6b7280;
    text-align: center;
    margin-top: 2rem;
}
</style>