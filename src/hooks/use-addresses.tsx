import { useState, useEffect, useCallback } from 'react';

interface IAddress {
    id: number;
    city: string;
    street: string;
    numberOfHouse: number;
    numberOfFlat: number;
    entrance: number;
    status: string;
    userId: number;
}

export const useAddresses = () => {
    const [addresses, setAddresses] = useState<IAddress[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    // Допоміжна функція для отримання чистого токена
    const getCleanToken = useCallback(() => {
        const rawToken = localStorage.getItem('token');
        return rawToken ? rawToken.replace(/^"(.*)"$/, '$1').trim() : null;
    }, []);

    const fetchAddresses = useCallback(async () => {
        const token = getCleanToken();
        if (!token) return;

        setLoading(true);
        try {
            const meRes = await fetch('http://localhost:8000/users/me', {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (!meRes.ok) throw new Error('Auth failed');
            const userData = await meRes.json();

            const response = await fetch(`http://localhost:8000/users/addresses/${userData.id}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            
            if (response.ok) {
                const data = await response.json();
                setAddresses(data);
            }
        } catch (err) {
            setError('Помилка завантаження адрес');
        } finally {
            setLoading(false);
        }
    }, [getCleanToken]);

    const createAddress = async (data: Omit<IAddress, 'id' | 'userId' | 'status'>) => {
        const token = getCleanToken();
        const response = await fetch('http://localhost:8000/users/addresses', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(data)
        });
        if (!response.ok) throw new Error('Failed to create');
        const newAddress = await response.json();
        setAddresses((prev) => [...prev, newAddress]);
        return newAddress;
    };

    const updateAddress = async (id: number, data: Partial<IAddress>) => {
        const token = getCleanToken();
        const response = await fetch(`http://localhost:8000/users/addresses/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(data)
        });
        if (!response.ok) throw new Error('Failed to update');
        const updated = await response.json();
        setAddresses((prev) => prev.map(addr => addr.id === id ? updated : addr));
        return updated;
    };

    useEffect(() => {
        fetchAddresses();
    }, [fetchAddresses]);

    return { addresses, loading, error, createAddress, updateAddress, refresh: fetchAddresses };
};