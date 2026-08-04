<script setup lang="ts">
import { useRoute } from 'vue-router';
import {
  Store,
  Package,
  ChartColumn,
} from 'lucide-vue-next';

const route = useRoute();
</script>

<template>
  <nav class="bottom-navbar">
    <RouterLink to="/" class="nav-item" :class="{ active: route.path === '/' }">
      <span class="icon">
        <Store :size="22" />
      </span>
      <span class="label">Caja</span>
    </RouterLink>

    <RouterLink to="/productos" class="nav-item" :class="{ active: route.path === '/productos' }">
      <span class="icon">
        <Package :size="22" />
      </span>
      <span class="label">Productos</span>
    </RouterLink>

    <RouterLink to="/historial" class="nav-item" :class="{ active: route.path === '/historial' }">
      <span class="icon">
        <ChartColumn :size="22" />
      </span>
      <span class="label">Historial</span>
    </RouterLink>
  </nav>
</template>

<style scoped>
.bottom-navbar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 64px;
  background: #3e4e72;
  border-top: 1px solid #e2e8f0;
  display: flex;
  justify-content: space-around;
  align-items: center;
  z-index: 30;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.05);
}

.nav-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2px;
  text-decoration: none;
  color: #94a3b8;
  font-size: 0.75rem;
  font-weight: 600;
  flex: 1;
  height: 100%;
  transition: color 0.15s ease;
}

.nav-item .icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: transparent;
  transition: background-color 0.2s ease, transform 0.15s ease;
}

.nav-item.active {
  color: #ffffff;
}

.nav-item.active .icon {
  background: #2563eb;
  transform: scale(1.05);
}

.label {
  color: inherit;
  transition: color 0.15s ease;
}
</style>