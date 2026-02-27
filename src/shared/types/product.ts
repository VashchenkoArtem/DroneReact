export interface IProductBlock {
    id: number;
    title: string;
    description: string;
    blockAlign: string;
    image: string;
    blockOrder: number;
    productId: number;
}

export interface IProduct {
    id: number;
    name: string;
    price: number;
    discount: number;
    image: string;
    description: string;
    count: number;
    categoryId: number;
    blocks?: IProductBlock[];
    category?: ICategory;
    originalPrice?: number;
}

export interface ICategory {
    id: number;
    title: string;
    image: string;
    products?: IProduct[];
}

export interface IProductOnOrder {
    id: number;
    productId: number;
    blockId: number;
    product: IProduct;
}

export interface IOrder {
    id: number;
    firstName: string;
    patronymic: string;
    phoneNumber: string;
    email: string;
    comment: string;
    cityName: string;
    paymentMethod: string;
    userId: number;
    products: IProductOnOrder[];
}

export interface INPCity {
    Present: string;
    DeliveryCity: string;
    MainDescription: string;
}

export interface INPWarehouse {
    Description: string;
    Ref: string;
    Number: string;
}