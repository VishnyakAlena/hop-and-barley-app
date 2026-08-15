export interface Iproduct {
    id: number,
    name: string,
    price: number,
    shortDescription: string,
    description: string,
    image: string
}

export type IBarleysResponse = Iproduct[]