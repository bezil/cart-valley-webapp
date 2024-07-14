<script setup lang="ts">
import { Page, useCartStore } from "./store"
import Navigator from "./components/Navigator.vue"
import Inventory from "./components/Inventory.vue"
import Cart from "./components/Cart.vue"

const cartStore = useCartStore();

// fetch product list and store
cartStore.fetchProducts()
</script>

<template>
  <Navigator
    :is-inventory="cartStore.currentState === Page.INVENTORY_PAGE"
    :cart-count="cartStore.getCartProductsCount"
    @cart-requested="cartStore.setCurrentPage(Page.CART_PAGE)"
    @inventory-requested="cartStore.setCurrentPage(Page.INVENTORY_PAGE)"
  />
  <div class="app-container px-2 md:px-8 bg-gray-100">
    <Inventory
      v-if="cartStore.currentState == Page.INVENTORY_PAGE
        && cartStore?.getInventoryProducts"
      :products="cartStore.getInventoryProducts"
      :count="cartStore.getInventoryProductsCount"
      @add-to-cart-requested="cartStore.setCartProducts($event)"
    />
    <Cart
      v-else-if="cartStore.currentState == Page.CART_PAGE"
      :products="cartStore.getCartProducts"
      :count="cartStore.getCartProductsCount"
      @remove-cart-requested="cartStore.removeCartProducts($event)"
    />
  </div>
</template>

<style scoped>
.app-container {
  height: calc(100vh - 56px);
  overflow-y: scroll;
}
</style>
