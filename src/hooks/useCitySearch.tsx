import { useState, useEffect } from 'react';

export interface City {
    Ref: string;
    Description: string;
}

export function useCitySearch(searchQuery: string) {
    const [cities, setCities] = useState<City[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (searchQuery.length < 2) {
            setCities([]);
            return;
        }

        const handler = setTimeout(async () => {
            setIsLoading(true);
            try {
                const res = await fetch(`/api/cities?search=${encodeURIComponent(searchQuery)}`);
                const result = await res.json();
                setCities(result.data || []);
            } catch (e) {
                console.error("Search failed:", e);
                setCities([]);
            } finally {
                setIsLoading(false);
            }
        }, 500);

        return () => clearTimeout(handler);
    }, [searchQuery]);

    return { cities, isLoading };
}