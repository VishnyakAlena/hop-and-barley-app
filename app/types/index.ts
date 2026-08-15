export interface Iproduct {
    id: number,
    name: string,
    price: number,
    shortDescription: string,
    description: string,
    image: string
}

export interface ICartProduct {
    totalPrice: number,
    product: Iproduct,
    quantity: number,
    id: number
}

export type IBarleysResponse = Iproduct[]