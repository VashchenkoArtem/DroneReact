import { useEffect, useState } from "react"
import type { IProduct } from "../shared";

export function useProductsPopular() {
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState<boolean>(false)
    const [ products, setProducts ] = useState<IProduct | null>(null)

    useEffect(() => {
        const fetchPopularProducts = async () => {
            try {
                setLoading(true)

                const response = await fetch("http://localhost:8000/products/popular")
                const data = await response.json()

                if (response.status === 500) {
                    setError("There is a problem with the server. Please try again later.")
                } else if (response.status === 404) {
                    setError("Product was not found. Please, enter existed product ID.")
                } else if (response.status === 400) {
                    setError("The data stream sent to the server didn't follow the rules. Please check the data and try again.")
                } else {
                    setProducts(data)
                }
            } catch (error) {
                console.error(error);
                if (error instanceof Error) {
                    setError(error.message);
                } else {
                    setError("Unknown error! Try again later.");
                }
            } finally {
                setLoading(false);
            }
        }
        fetchPopularProducts()
    }, [])
    return { products, loading, error }
}