import { useState, useEffect, useContext } from "react";
import { UserContext } from "../context/user-context";
import { IOrder } from "../shared/types/product";

export function useOrders() {
    const userContext = useContext(UserContext);
    const [orders, setOrders] = useState<IOrder[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchOrders = async () => {
            const email = userContext?.user?.email;

            if (!email) {
                setLoading(false);
                return;
            }

            try {
                const response = await fetch(`http://localhost:8000/users/orders/${email}`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });

                if (response.ok) {
                    const data: IOrder[] = await response.json();
                    setOrders(data);
                }
            } catch (err) {
                console.error("Fetch orders error:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, [userContext?.user?.email]);

    return { orders, loading };
}