import { defineStore } from 'pinia'
import { computed, ref } from "vue"
import { baseUrl } from "./main.ts"
import { type Product, type ProductsData } from "./types/Inventory"
import { type CartProduct, type CheckoutPayload } from "./types/Cart"

export enum Page {
    INVENTORY_PAGE = "inventory",
    CART_PAGE = "cart"
}

// Global variables
const currentState = ref(Page.INVENTORY_PAGE);
const productsData = ref<ProductsData>();
const cartProducts = ref<CartProduct[]>([]);
const inventoryProducts = ref<Product[]>([]);
const checkoutPayload = ref<CheckoutPayload[]>([]);

export const useCartStore = defineStore('cart', () => {
    // Get a read-only array of products in the inventory
    const getInventoryProducts = computed(() => inventoryProducts.value);

    // Get a read-only array of products in the cart
    const getCartProducts = computed(() => cartProducts.value);

    // Get the number of products in the inventory
    const getInventoryProductsCount = computed(() => inventoryProducts.value?.length);

    // Get the number of products in the cart
    const getCartProductsCount = computed(() => cartProducts.value?.length);

    // Get Total Price of products in the cart
    const getCartProductsTotalPrice = computed(() => cartProducts.value.reduce(
        (acc, product) => acc + Number(product.newPrice ?? product.price), 0));

    // Set the current page
    const setCurrentPage = (page: Page) => {
        // Set the current state to the provided page
        currentState.value = page
    }

    // Store the products data in the store
    const setInventoryProducts = (products_data: ProductsData) => {
        console.log("💈Storing inventory..", products_data)
        productsData.value = products_data;
        // Store the products in the inventory
        inventoryProducts.value = productsData.value.data;
    }

    const setCartProducts = (product: CartProduct) => {
        // Check if the product is already in the cart
        if (cartProducts.value.includes(product)) {
            return
        }

        // Add the product to the cart
        cartProducts.value.push({
            ...product,
            sold: 1,
            newPrice: product.price
        });
        // Remove the product from the inventory
        inventoryProducts.value = inventoryProducts.value?.filter(
            (this_product) => this_product.id !== product.id
        ) ?? []
    }

    const removeCartProducts = (product: CartProduct) => {
        cartProducts.value = cartProducts.value.filter(
            (this_product) => this_product.id !== product.id
        )

        // Check if the product is already in the inventory
        if (cartProducts.value.includes(product)) {
            return
        }

        inventoryProducts.value.push(product)
    }

    // Update cart product sold quantity
    const updateCartProduct = (id: number, sold: number) => {
        // Get the existing cart product
        const existingCartProduct = cartProducts.value.find(product => product.id === id);

        // If the product already exists in the cart, update its sold quantity
        cartProducts.value.forEach((this_product) => {
            if (this_product.id === id && existingCartProduct) {
                this_product.sold = sold
                this_product.newPrice = sold * existingCartProduct.price
            }
        })
    }

    // Set the checkout products payload
    const setCheckoutPayload = async () => {
        console.log('++', cartProducts.value)
        checkoutPayload.value = cartProducts.value.map(
            (product) => ({
                id: product.id,
                sold: product.sold
            })
        )

        try {
            let response = await fetch(`${baseUrl}/products/update-quantity`, {
                method: "POST",
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify(checkoutPayload.value)
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            let responseData = await response.json()
            console.log('🚀', responseData.message)
            alert(responseData.message)

            cartProducts.value = []
            await fetchProducts();
        } catch (error) {
            console.error('Error', error);
        }
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
        setCheckoutPayload,
        updateCartProduct,
        getInventoryProductsCount,
        getCartProductsTotalPrice,
    }
})
