<script setup lang="ts">
import { useCartStore } from "./store"
import Navigator from "./components/Navigator.vue"
import Inventory from "./components/Inventory.vue"

const cartStore = useCartStore();

// fetch product list and store
cartStore.fetchProducts()
</script>

<template>
  <Navigator />
  <div class="app-container px-2 md:px-8 bg-gray-100">
    <Inventory
      v-if="cartStore?.getInventoryProducts"
      :products="cartStore.getInventoryProducts"
      :count="cartStore.getInventoryProductsCount"
    />
  </div>
</template>

<style scoped>
.app-container {
  height: calc(100vh - 56px);
  overflow-y: scroll;
}
</style>
