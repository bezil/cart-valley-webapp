<script setup lang="ts">
import { useCartStore } from "./store"

const cartStore = useCartStore();

// fetch product list and store
cartStore.fetchProducts()
</script>

<template>
  <div>

  </div>
</template>

<style scoped>

</style>
