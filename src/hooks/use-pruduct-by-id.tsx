import { useEffect, useState } from "react"
import type { IProduct } from "../shared";

export function useProductById(productId: number) {
    const [error, setError] = useState<string | null>(null)
    const [product, setProduct] = useState<IProduct | null>(null)
    const [loading, setLoading] = useState<boolean>(false)

    useEffect(() => {
        if (!productId || isNaN(productId)) return;

        async function getProductById() {
            try {
                setLoading(true)
                setError(null)

                const response = await fetch(`http://127.0.0.1:8000/products/${productId}`)
                
                if (!response.ok) {
                    if (response.status === 500) {
                        throw new Error("There is a problem with the server. Please try again later.")
                    } else if (response.status === 404) {
                        throw new Error("Product was not found. Please, enter existed product ID.")
                    } else if (response.status === 400) {
                        throw new Error("The data stream sent to the server didn't follow the rules.")
                    } else {
                        throw new Error("Something went wrong.")
                    }
                }

                const data: IProduct = await response.json()

                if (data.blocks && data.blocks.length > 0) {
                    data.blocks.sort((a, b) => a.blockOrder - b.blockOrder)
                }

                setProduct(data)
            } catch (err) {
                console.error(err);
                if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError("Unknown error! Try again later.");
                }
            } finally {
                setLoading(false);
            }
        }

        getProductById()
    }, [productId])

    return { product, loading, error }
}