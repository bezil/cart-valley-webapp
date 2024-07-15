<template>
    <div class="p-8 w-full h-full">
        <div class="text-gray-500 pb-4">
            Cart
            <span class="bg-gray-400 text-white text-sm rounded-xl p-1 px-2">
                <b>{{ count ?? 0 }}</b> added
            </span>
        </div>
        <div class="flex w-full">
            <div class="flex flex-col w-full md:max-w-[70%] mb-32 md:mb-8">
                <p v-if="count === 0" class="text-sm text-gray-500 py-14 rounded-md text-center bg-gray-200">
                    No products added yet
                </p>
                <div
                    v-for="product in products"
                    :key="product.id"
                    class="md:flex-grow border-b-2 border-gray-100"
                >
                    <ProductPriceCard
                        :id="product.id"
                        :name="product.name"
                        :description="product.description"
                        :quantity="Number(product.quantity)"
                        :price="Number(product.price)"
                        :sold="Number(product.sold ?? 1)"
                        :new-price="Number(product.newPrice ?? product.price)"
                        @button-clicked="emit('remove-cart-requested', product)"
                    />
                </div>
            </div>
            <div class="hidden md:flex flex-col bg-white justify-between p-4 ml-4 flex-grow h-32 rounded-md
                md:absolute md:right-[70px] md:top-[128px] md:w-[25vw]">
                <div class="text-sm text-gray-500">
                    Total Price:
                    <p class="text-lg text-gray-700">$ {{ totalPrice }}</p>
                </div>
                <div
                    class="bg-gradient-to-r from-indigo-500 from-10% to-purple-500 to-90% shadow-md
                    hover:to-purple-600 text-white rounded-2xl p-1 px-4 text-center"
                    :class="products && products.length == 0 ? 'cursor-not-allowed' : 'cursor-pointer'"
                    @click="checkoutHandler"
                >
                    Checkout
                </div>
            </div>
        </div>

        <!-- Checkout footer -->
        <div class="footer md:hidden fixed bottom-0 px-4 py-4 mb-8 bg-white flex justify-between items-center rounded-lg shadow-lg">
            <div class="text-sm text-gray-500">
                Total Price: <b class="text-gray-700">$ {{ totalPrice }}</b>
            </div>
            <div class="bg-gradient-to-r from-indigo-500 from-10% to-purple-500 to-90% shadow-md
                hover:to-purple-600 text-white rounded-2xl p-1 px-4"
                :class="products && products.length == 0 ? 'cursor-not-allowed' : 'cursor-pointer'"
                @click="checkoutHandler"
            >Checkout</div>
        </div>
    </div>
</template>

<script setup lang="ts">
import ProductPriceCard from "./ProductPriceCard.vue"
import { type CartProduct } from "../types/Cart"

interface Props {
  products?: CartProduct[];
  count?: Number
  totalPrice?: Number
}

const props = defineProps<Props>()

const emit = defineEmits()

const checkoutHandler = () => {
    if (props.products && props.products.length === 0) {
        return
    }
    emit('checkout-requested')
}
</script>

<style scoped>
.footer {
    width: calc(100vw - 96px)
}
</style>
