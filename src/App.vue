<script setup lang="ts">
import AppNavbar from './components/layout/AppNavbar.vue';
</script>

<template>
  <div class="app-layout">
    <main class="main-content">
      <RouterView />
    </main>
    <AppNavbar />
  </div>
</template>

<style>
* {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
  background-color: #f8fafc;
  color: #0f172a;
  -webkit-tap-highlight-color: transparent;
}

.app-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main-content {
  flex: 1;

  padding-bottom: 70px; 
}
</style>