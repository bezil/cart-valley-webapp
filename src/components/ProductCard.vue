<template>
    <!--Card-->
    <div class="bg-white hover:shadow-lg hover:shadow-purple-500/10 text-zinc-900 p-4 rounded-md
        min-w-[300px] md:w-full md:h-full">
        <!--Top Section-->
        <div class="flex gap-2 justify-between">
            <div class="flex-col">
                <p class="text-md text-gray-700">{{ name }}</p>
                <p class="text-sm text-gray-500 mb-2">{{ description }}</p>
            </div>
            <p>${{ price }}</p>
        </div>
        <!--Bottom Section-->
        <div class="flex justify-between">
            <div class="flex items-center">
                <div class="quantity-tag rounded-lg text-xs p-1 bg-gray-100">
                    Qty: <b>{{ quantity }}</b>
                </div>

                <span
                    class="text-sm pl-2"
                    :class="`${quantity === 0 ? 'text-red-500' : 'text-green-500'}`"
                >{{ quantity === 0 ? "Out of Stock" : "In Stock" }}</span>
            </div>

            <!--Add to Cart-->
            <div class="flex items-center gap-2 rounded-xl text-purple-800 hover:text-white text-sm px-2 py-1
                bg-gradient-to-l from-purple-100 cursor-pointer
                hover:bg-gradient-to-r hover:from-indigo-500 hover:from-10% hover:to-purple-500 hover:to-90%">
                Add to Cart
                <span>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                </span>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { type Product } from "../types/Inventory"

defineProps<Product>()
</script>

<style scoped>
.quantity-tag {
    width:fit-content
}
</style>
