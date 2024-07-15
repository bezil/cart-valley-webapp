# Cart Valley Web App - Vue 3 + TypeScript + Vite + Tailwind CSS
## NOTES
  - Vite for faster compilation
  - Pinia for State management

## Installation Guide ⚙️
  * npm create vite@latest  cart-valley-webapp -- --template vue-ts
  * cd cart-valley-webapp
  * npm install
  * npm install -D tailwindcss autoprefixer
  * npx tailwindcss init -p
  * npm install pinia
  * npm run dev

.env
```
export NODE_ENV=development
```

Client will be running on http://localhost:5173/

BE is assumed to be running on http://localhost:4000/api
if not change baseUrl in `main.ts`
