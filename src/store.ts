import { defineStore } from 'pinia'
import { computed, ref } from "vue"
import { baseUrl } from "./main.ts"
import { type Product, type ProductsData } from "./types/Inventory"

export enum Page {
    INVENTORY_PAGE = "inventory",
    CART_PAGE = "cart"
}

const currentState = ref(Page.INVENTORY_PAGE);
const productsData = ref<ProductsData>();
const cartProducts = ref<Product[]>([]);
const inventoryProducts = ref<Product[]>([]);

export const useCartStore = defineStore('cart', () => {
    // Get a read-only array of products in the inventory
    const getInventoryProducts = computed(() => inventoryProducts.value);

    // Get a read-only array of products in the cart
    const getCartProducts = computed(() => cartProducts.value);


    // Get the number of products in the inventory
    const getInventoryProductsCount = computed(() => inventoryProducts.value?.length);

    // Get the number of products in the cart
    const getCartProductsCount = computed(() => cartProducts.value?.length);

    // Store the products data in the store
    const setInventoryProducts = (products_data: ProductsData) => {
        console.log("💈Storing inventory..", products_data)
        productsData.value = products_data;
        // Store the products in the inventory
        inventoryProducts.value = productsData.value.data;
    }

    const setCartProducts = (product: Product) => {
        // Check if the product is already in the cart
        if (cartProducts.value.includes(product)) {
            return
        }

        // Add the product to the cart
        cartProducts.value.push(product);
        // Remove the product from the inventory
        inventoryProducts.value = inventoryProducts.value?.filter(
            (this_product) => this_product.id !== product.id
        ) ?? []
    }

    const removeCartProducts = (product: Product) => {
        cartProducts.value = cartProducts.value.filter(
            (this_product) => this_product.id !== product.id
        )

        // Check if the product is already in the inventory
        if (cartProducts.value.includes(product)) {
            return
        }

        inventoryProducts.value.push(product)
    }

    // Set the current page
    const setCurrentPage = (page: Page) => {
        // Set the current state to the provided page
        currentState.value = page
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
        currentState,
        fetchProducts,
        setCurrentPage,
        setCartProducts,
        getCartProducts,
        removeCartProducts,
        getInventoryProducts,
        setInventoryProducts,
        getCartProductsCount,
        getInventoryProductsCount,
    }
})
