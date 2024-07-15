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
            <div class="text-right">
                <p>${{ newPrice }}</p>
                <p class="text-xs text-gray-500">{{ `${ sold } * ${price}` }}</p>
            </div>
        </div>
        <!--Bottom Section-->
        <div class="flex justify-between">
            <div class="flex items-center">
                <div class="quantity-tag rounded-lg text-xs p-1 bg-gray-100">
                    <span
                        class="cursor-pointer px-2"
                        @click="increment"
                    >+</span>
                    <b>{{ sold }}</b>
                    <span
                        class="cursor-pointer px-2"
                        @click="decrement"
                    >-</span>
                </div>

                <span
                    class="text-xs pl-2"
                    :class="`${quantity === 0 ? 'text-red-500' : 'text-green-500'}`"
                >{{ `In Stock (${quantity})` }}</span>
            </div>

            <!--Remove Cart-->
            <div
                class="flex items-center gap-2 rounded-xl text-red-800 hover:text-white text-sm px-2 py-1
                bg-gradient-to-l from-red-100 cursor-pointer
                hover:bg-gradient-to-r hover:from-red-300 hover:to-red-500 hover:to-90%"
                @click="emit('button-clicked')"
            >
                Remove from Cart
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 12H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { type CartProduct } from "../types/Cart"
import { useCartStore } from "../store"

const cartStore = useCartStore();

const props = defineProps<CartProduct>()

const emit = defineEmits()

const increment = () => {
    if (props.sold === props.quantity) {
        return;
    }

    cartStore.updateCartProduct(props.id, props.sold + 1)
}

const decrement = () => {
    if (props.sold === 1) {
        return;
    }

    cartStore.updateCartProduct(props.id, props.sold - 1)
}
</script>

<style scoped>
.quantity-tag {
    width:fit-content
}
</style>
