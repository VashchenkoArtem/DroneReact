import { useEffect, useState } from "react"
import type { IProduct } from "../shared";

export function useProductsToPage() {
    const [error, setError] = useState<string | null>(null)
    const [ products, setProducts ] = useState<IProduct[] | null>(null)
    const [loading, setLoading] = useState<boolean>(false)

    async function fetchProductsToPage (offset: number, categoryId?: number) {
        try {
            setLoading(true)
            const response = await fetch(`http://127.0.0.1:8000/products/suggestions?limit=8&offset=${offset}&categoryId=${categoryId}`)
            const data = await response.json()
            console.log(data)
            console.log(categoryId)
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
    return { products, loading, error, fetchProductsToPage }
}