export type CartProduct = {
    id: number
    name: string,
    price: number,
    quantity: number,
    description: string,
    sold: number,
    newPrice: number,
  }

export type CheckoutPayload = {
    id: number
    sold: number,
  }
