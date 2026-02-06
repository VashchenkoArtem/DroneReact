export interface IProduct {
    id: number;
    name: string;
    price: number;
    discount: number;
    image: string;
    description: string;
    count: number;
}
export interface ICategory {
    id: number;
    title: string;
    image: string;
}