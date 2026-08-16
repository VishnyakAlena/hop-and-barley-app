export interface ISpecificationsItem {
    label: string;  // Название параметра (например: "Origin")
    value: string;  // Показатель (например: "USA")
}

export interface Iproduct {
    id: number,
    name: string,
    unitMetrics: string,
    price: number,
    shortDescription: string,
    description: string[],
    image: string,
    technicalSpecifications: ISpecificationsItem[];
}

export interface ICartProduct {
    totalPrice: number,
    product: Iproduct,
    quantity: number,
    id: number
}

export type IProductsAllInfoResponse = Iproduct[]