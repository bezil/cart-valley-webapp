 export type Product = {
    id: number
    name: string,
    price: number,
    quantity: number,
    description: string,
  }

 export type ProductsData = {
    data: Product[],
    count?: number
  }
