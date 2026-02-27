import { createContext, ReactNode, useEffect, useState, useContext, useCallback } from "react";
import { useUserContext } from "./user-context";


export interface IProduct {
    id: number;
    name: string;
    price: number;
    image: string;
    discount?: number;
}

export interface IOrderProduct {
    productId: number;
    product: IProduct;
}

export interface IOrder {
    id: number;
    createdAt: string;
    totalPrice: number;
    status: string;
    cityName: string;
    warehouseName: string;
    products: IOrderProduct[];
    
}

interface IOrderContext {
    orders: IOrder[];
    productInOrder: IProduct[];
    isLoading: boolean;
    refreshOrders: () => void;
    setProductInOrder: (products: IProduct[]) => void;
    addProduct: (product: IProduct) => void;
}

const OrderContext = createContext<IOrderContext | null>(null);

export const useOrderContext = () => {
    const context = useContext(OrderContext);
    if (!context) throw new Error("useOrderContext must be used within OrderProvider");
    return context;
};

export function OrderProviderContext({ children }: { children: ReactNode }) {
    const [orders, setOrders] = useState<IOrder[]>([]);
    const [productInOrder, setProductInOrder] = useState<IProduct[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const { token, user } = useUserContext();

    const fetchUserOrders = useCallback(async (email: string) => {
        try {
            setIsLoading(true);
            const cleanToken = token?.replace(/"/g, '');
            
            const response = await fetch(`http://localhost:8000/users/orders/${email}`, {
                method: 'GET',
                headers: { 
                    'Authorization': `Bearer ${cleanToken}`,
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) throw new Error(`Server error: ${response.status}`);

            const result = await response.json();
            setOrders(Array.isArray(result) ? result : []);
        } catch (error) {
            console.error("Помилка завантаження історії замовлень:", error);
            setOrders([]);
        } finally {
            setIsLoading(false);
        }
    }, [token]);

    useEffect(() => {
        if (token && user?.email) {
            fetchUserOrders(user.email);
        } else {
            setIsLoading(false);
            setOrders([]);
        }
    }, [token, user?.email, fetchUserOrders]);

    const refreshOrders = () => {
        if (user?.email) fetchUserOrders(user.email);
    };

    const addProduct = useCallback((product: IProduct) => {
        setProductInOrder((prev) => [...prev, product]);
    }, []);

    return (
        <OrderContext.Provider value={{ 
            orders, 
            productInOrder, 
            setProductInOrder,
            addProduct,
            isLoading, 
            refreshOrders 
        }}>
            {children}
        </OrderContext.Provider>
    );
}