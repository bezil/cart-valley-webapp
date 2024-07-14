<template>
    <div class="p-8">
        <div class="text-gray-500 pb-4">
        Inventory
        <span class="bg-gray-400 text-white text-sm rounded-xl p-1 px-2">
            Total: <b>{{ count ?? 0 }}</b>
        </span>
    </div>
    <div class="flex flex-col flex-wrap gap-2
        md:flex-row md:justify-around">
        <div
            v-for="product in products"
            :key="product.id"
            class="md:flex-grow"
        >
            <ProductCard
                :id="product.id"
                :name="product.name"
                :description="product.description"
                :quantity="Number(product.quantity)"
                :price="Number(product.price)"
                @button-clicked="emit('add-to-cart-requested', product)"
            />
        </div>
    </div>
    </div>
</template>

<script setup lang="ts">
import ProductCard from "./ProductCard.vue"
import { type Product } from "../types/Inventory"

interface Props {
  products: Product[];
  count?: Number
}

defineProps<Props>()

const emit = defineEmits()
</script>
