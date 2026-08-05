<script setup lang="ts">
import { useProductStore, type SortOption } from '@/stores/useProductStore';
import { PRODUCT_CATEGORY_FILTER_OPTIONS } from '@/domain/categories';

import { Search, Tags, ArrowUp, ArrowDown, ArrowUpDown } from 'lucide-vue-next';

const productStore = useProductStore();

const categories = PRODUCT_CATEGORY_FILTER_OPTIONS;

const sortOptions: { label: string; value: SortOption }[] = [
  { label: 'Nombre', value: 'name' },
  { label: 'Precio', value: 'price' },
  { label: 'Categoría', value: 'category' },
];
</script>

<template>
  <div class="filters-container">

    <div class="search-category-row">

      <div class="search-input-wrapper">
        <Search class="search-icon" :size="20" />

        <input v-model="productStore.searchQuery" type="search" placeholder="Buscar producto..." class="search-input" />
      </div>

      <div class="select-wrapper category-select">
        <Tags class="select-icon" :size="18" />

        <select v-model="productStore.selectedCategory">
          <option v-for="cat in categories" :key="cat" :value="cat">
            {{ cat }}
          </option>
        </select>
      </div>

    </div>

    <div class="sorting-row">

      <div class="select-wrapper sort-select">
        <ArrowUpDown class="select-icon" :size="18" />

        <select v-model="productStore.sortBy">
          <option v-for="option in sortOptions" :key="option.value" :value="option.value">
            Ordenar por {{ option.label }}
          </option>
        </select>
      </div>

      <button class="btn-sort-direction" :title="productStore.sortOrder === 'asc' ? 'Ascendente' : 'Descendente'"
        @click="productStore.toggleSortOrder()">
        <ArrowUp v-if="productStore.sortOrder === 'asc'" :size="18" />

        <ArrowDown v-else :size="18" />
      </button>

    </div>

  </div>
</template>

<style scoped>
.filters-container {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 12px 16px;
  background: #ffffff;
  border-bottom: 1px solid #e2e8f0;
}

.search-category-row,
.sorting-row {
  display: flex;
  gap: 8px;
  align-items: center;
}


.search-input-wrapper {
  position: relative;
  flex: 1;
}

.search-icon {
  position: absolute;
  left: 10px;
  top: 50%;
  transform: translateY(-50%);
  color: #94a3b8;
}

.search-input {
  width: 100%;
  padding: 10px 10px 10px 38px;
  border: 1px solid #cbd5e1;
  border-radius: 8px;
  font-size: 0.9rem;
  box-sizing: border-box;
}


.select-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.select-icon {
  position: absolute;
  left: 10px;
  top: 50%;
  transform: translateY(-50%);
  color: #64748b;
  pointer-events: none;
}

.select-wrapper select {
  width: 100%;
  padding: 10px 12px 10px 36px;
  border: 1px solid #cbd5e1;
  border-radius: 8px;
  background: #f8fafc;
  font-size: 0.85rem;
  font-weight: 600;
  color: #334155;
  cursor: pointer;
}

.category-select select {
  max-width: 130px;
}

.sort-select {
  flex: 1;
}

.btn-sort-direction {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 42px;
  height: 42px;
  background: #eff6ff;
  border: 1px solid #bfdbfe;
  color: #2563eb;
  border-radius: 8px;
  cursor: pointer;
  transition: all .2s ease;
}

.btn-sort-direction:hover {
  background: #dbeafe;
}

.btn-sort-direction:active {
  transform: scale(.97);
}
</style>