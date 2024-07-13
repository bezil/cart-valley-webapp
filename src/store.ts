import { defineStore } from 'pinia'
import { computed, ref } from "vue"
import { baseUrl } from "./main.ts"
import { type ProductsData } from "./types/Inventory"

const products = ref<ProductsData>();

export const useCartStore = defineStore('cart', () => {
    const getInventoryProducts = computed(() => products.value?.data);

    const getInventoryProductsCount = computed(() => products.value?.data.length);

    const setInventoryProducts = (products_list: ProductsData) => {
        console.log("💈Storing inventory..", products_list)
        products.value = products_list;
    }

    // Fetch products from the API
    const fetchProducts = async () => {
        let response = await fetch(`${baseUrl}/products`, {
        method: "GET",
        headers: {
        'Content-Type': 'application/json',
        }});

        if (!response.ok) {
        throw new Error('Network response was not ok');
        }

        let responseData: ProductsData = await response.json()
        setInventoryProducts(responseData);
    }

    return {
        fetchProducts,
        getInventoryProducts,
        setInventoryProducts,
        getInventoryProductsCount,
    }
})
