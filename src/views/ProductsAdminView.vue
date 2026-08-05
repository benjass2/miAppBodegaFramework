<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useProductStore } from '@/stores/useProductStore';
import type { Product } from '@/types';
import ProductFormModal from '@/components/admin/ProductFormModal.vue';
import { formatCurrency } from '@/utils/currency';
import {
  Search,
  Plus,
  Pencil,
  Trash2,
  PackagePlus,
} from "lucide-vue-next";

const productStore = useProductStore();

// Control de Modal
const isModalOpen = ref(false);
const editingProduct = ref<Product | null>(null);

// Cargar productos al montar la vista
onMounted(() => {
  if (productStore.fetchProducts) {
    productStore.fetchProducts();
  }
});

function openCreateModal() {
  editingProduct.value = null;
  isModalOpen.value = true;
}

function openEditModal(product: Product) {
  editingProduct.value = product;
  isModalOpen.value = true;
}

async function handleCreateProduct(productData: Omit<Product, 'id'>) {
  await productStore.addProduct(productData);
}

async function handleUpdateProduct(productData: Product) {
  await productStore.updateProduct(productData);
}

async function handleDeleteProduct(product: Product) {
  if (confirm(`¿Estás seguro de eliminar "${product.name}"?`)) {
    await productStore.deleteProduct(product.id);
  }
}
</script>

<template>
  <div class="admin-container">
    <header class="admin-header">
      <h1>Gestión de Productos</h1>
      <button class="btn-add" @click="openCreateModal">
        <PackagePlus :size="18" />
        <span>Nuevo Producto</span>
      </button>
    </header>

    <p v-if="productStore.errorMessage" class="error-banner">
      ⚠️ {{ productStore.errorMessage }}
    </p>

    <!-- Buscador -->
    <div class="search-box">
      <div class="search-wrapper">
        <Search class="search-icon" :size="18" />

        <input v-model="productStore.searchQuery" type="search" placeholder="Buscar producto en el inventario..."
          class="input-search" />
      </div>
    </div>

    <!-- Lista de Productos -->
    <main class="products-list">
      <div v-for="product in productStore.filteredProducts" :key="product.id" class="admin-item">
        <div class="product-details">
          <div class="badges-row">
            <span class="badge category-badge">{{ product.category }}</span>
            <span class="badge unit-badge">{{ product.unit }}</span>
          </div>
          <strong class="name">{{ product.name }}</strong>
          <span class="stock-info" v-if="product.stock !== undefined">
            Stock: <strong>{{ product.stock }}</strong>
          </span>
        </div>

        <div class="action-box">
          <span class="current-price">{{ formatCurrency(product.price) }}</span>
          <div class="button-group">
            <button class="btn-action btn-edit" title="Editar producto" @click="openEditModal(product)">
              <Pencil :size="18" />
            </button>
            <button class="btn-action btn-delete" title="Eliminar producto" @click="handleDeleteProduct(product)">
              <Trash2 :size="18" />
            </button>
          </div>
        </div>
      </div>
    </main>

    <!-- Modal Formulario (Separado en su propio componente) -->
    <ProductFormModal :is-open="isModalOpen" :product-to-edit="editingProduct" @close="isModalOpen = false"
      @create="handleCreateProduct" @update="handleUpdateProduct" />
  </div>
</template>

<style scoped>
.admin-container {
  padding: 16px;
  background: #f8fafc;
  min-height: 100vh;
  box-sizing: border-box;
}

.admin-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.admin-header h1 {
  font-size: 1.2rem;
  color: #0f172a;
  margin: 0;
}

.btn-add {
  display: flex;
  align-items: center;
  gap: 6px;
  background: #2563eb;
  color: white;
  border: none;
  padding: 8px 14px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: background .2s;
}

.btn-add:hover {
  background: #1d4ed8;
}

.search-box {
  margin-bottom: 16px;
}

.error-banner {
  background: #fef2f2;
  border: 1px solid #fecaca;
  color: #b91c1c;
  padding: 10px 12px;
  border-radius: 8px;
  font-size: 0.85rem;
  font-weight: 600;
  margin-bottom: 16px;
}

.search-wrapper {
  position: relative;
}

.search-icon {
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: #94a3b8;
}

.input-search {
  width: 100%;
  padding: 10px 12px 10px 38px;
  border: 1px solid #cbd5e1;
  border-radius: 8px;
  box-sizing: border-box;
  outline: none;
}

.products-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.admin-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: white;
  padding: 12px;
  border-radius: 10px;
  border: 1px solid #e2e8f0;
}

.product-details {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.badges-row {
  display: flex;
  gap: 6px;
}

.badge {
  font-size: 0.7rem;
  padding: 2px 6px;
  border-radius: 4px;
  font-weight: 500;
}

.category-badge {
  background: #f1f5f9;
  color: #475569;
}

.unit-badge {
  background: #e0f2fe;
  color: #0369a1;
}

.name {
  font-size: 0.95rem;
  color: #1e293b;
  margin-top: 2px;
}

.stock-info {
  font-size: 0.8rem;
  color: #64748b;
}

.action-box {
  display: flex;
  align-items: center;
  gap: 12px;
}

.current-price {
  font-weight: bold;
  color: #16a34a;
  font-size: 1rem;
}

.button-group {
  display: flex;
  gap: 4px;
}

.btn-action {
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  width: 36px;
  height: 36px;
  cursor: pointer;
  transition: all .2s;
}

.btn-edit {
  color: #2563eb;
}

.btn-edit:hover {
  background: #dbeafe;
}

.btn-delete {
  color: #dc2626;
}

.btn-delete:hover {
  background: #fee2e2;
  border-color: #fca5a5;
}
</style>