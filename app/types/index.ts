export interface ISpecificationsItem {
    label: string; 
    value: string;  
}

export interface IReviewFull {
    id: number;
    userId: number;
    rating: number;
    title: string;
    comment: string;
    userName: string;        
    userImage: string;       
}

export interface Iproduct {
    id: number,
    name: string,
    unitMetrics?: string,
    price: number,
    shortDescription: string,
    description: string[],
    image: string,
    technicalSpecifications: ISpecificationsItem[],
    latestReviews?: IReviewFull[],
    category: string,
    isHidden?: boolean;
    createdAt: string,
    updatedAt: string;
}

export interface ICartProduct {
    totalPrice: number,
    product: Iproduct,
    quantity: number,
    id: number
}

export type IProductsAllInfoResponse = Iproduct[]

export interface IUserMock {
    id: number;
    name: string;
    image: string; 
    email: string;
    phone?: string;   
    city?: string;    
    address?: string;
    orders: any[]; 
    password?: string;
}

export type IUsersAllInfoResponse = IUserMock[]

export interface IOrder {
    number: number;
    userId: number;
    date: string;
    status: 'Pending' | 'Shipped' | 'Delivered' | 'Confirmed';
    items: ICartProduct[];
    totalPrice: number, 
    paymentMethod: string 
}


