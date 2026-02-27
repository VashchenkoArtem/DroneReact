import { useState, useEffect, useMemo } from 'react';

export const NP_TYPE_BRANCH = '841339c7-591a-42e2-8233-7a0a00f0ed6f'; 
export const NP_TYPE_POSTOMAT = 'f9316480-5f2d-425d-bc2c-ac7cd29decf0';

export interface Warehouse {
    Ref: string;
    Description: string;
    TypeOfWarehouse: string;
    TotalMaxWeightAllowed: string;
    WarehouseStatus: string;
    POSTerminal: string;
    PostalCodeUA: string;
    Schedule: {
        Monday: string;
        Tuesday: string;
        Wednesday: string;
        Thursday: string;
        Friday: string;
        Saturday: string;
        Sunday: string;
    };
}

export function useNewPost(cityRef: string, deliveryType: 'branch' | 'postomat' | 'all') {
    const [allWarehouses, setAllWarehouses] = useState<Warehouse[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    useEffect(() => {
        if (!cityRef) {
            setAllWarehouses([]);
            return;
        }
        const fetchWarehouses = async () => {
            setLoading(true);
            try {
                const response = await fetch(`/api/warehouses?cityRef=${encodeURIComponent(cityRef)}`);
                if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
                const result = await response.json();
                const data = result.data?.data || result.data || [];
                setAllWarehouses(Array.isArray(data) ? data : []);
                console.log("Дані успішно завантажені:", data);
            } catch (error) {
                console.error("Помилка при запиті до API відділень:", error);
                setAllWarehouses([]);
            } finally {
                setLoading(false);
            }
        };

        fetchWarehouses();
    }, [cityRef]);

    const warehouses = useMemo(() => {
        if (deliveryType === 'all') return allWarehouses;
        const targetType = deliveryType === 'branch' ? NP_TYPE_BRANCH : NP_TYPE_POSTOMAT;
        
        return allWarehouses.filter(w => w.TypeOfWarehouse === targetType);
    }, [allWarehouses, deliveryType]);

    return { warehouses, loading };
}