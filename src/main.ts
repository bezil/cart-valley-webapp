import { createApp } from 'vue'
import { createPinia } from 'pinia'

import './style.css'
import App from './App.vue'

// Configure base url
export const baseUrl = process.env.NODE_ENV == "development"
    ? "http://localhost:4000/api"
    : ""

// pinia for state management
const pinia = createPinia()
const app = createApp(App)

app.use(pinia)
app.mount('#app')
