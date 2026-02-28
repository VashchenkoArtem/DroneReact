import  { createContext, useState, type ReactNode } from "react"
import type { IProduct } from "../shared"
import { CartItem } from "../shared/types/product"


interface ICartContext {
    items: CartItem[]

    addItemToCart: (item: CartItem) => void
    removeItemFromCart: (id: number) => void
    getTotalPrice: () => number
    incrementCount: (id: number) => void
    decrementCount: (id: number) => void
    removeAll: () => void
    getTotalPriceAfterDiscount: () => number
}

export const CartContext = createContext<ICartContext | null>(null)

interface CartContextProviderProps {
    children: ReactNode
}

export function CartContextProvider({ children }: CartContextProviderProps) {
    const [items, setItems] = useState<CartItem[]>([])

    function addItemToCart(item: CartItem) {
        const isInCart = items.findIndex(
            (cartItem) => cartItem.id === item.id
        )

        if (isInCart !== -1) {
            const itemInCart = items.at(isInCart)
            if (!itemInCart) return
            incrementCount(itemInCart.id)
        } else {
            const newItemInCart = [...items, item]
            setItems(newItemInCart)
        }
    }

    function removeItemFromCart(id: number) {
        const newItem = items.filter((item) => {
            return item.id !== id
        })
        setItems(newItem)
    }

    function getTotalPrice(): number {
        const totalPrice = items.reduce((sum, currentItem) => {
            const itemTotalPrice = currentItem.price * currentItem.count
            return sum + itemTotalPrice
        }, 0)

        return Math.round(totalPrice)
    }

    function incrementCount(id: number) {
        const newItem = items.map((item) => {
            if (item.id === id) {
                return { ...item, count: item.count + 1 }
            }
            return item
        })

        setItems(newItem)
    }
    
    function decrementCount(id: number) {
        const item = items.find(item => item.id === id)
        if (item && item.count - 1 === 0) {
            removeItemFromCart(id)
            return
        }

        const newItems = items.map((item) => {
            if (item.id === id) {
                return { ...item, count: item.count - 1 }
            }
            return item
        })

        setItems(newItems)
    }
    
    function removeAll() {
        setItems([])
    }

    function getTotalPriceAfterDiscount(): number {
        const totalPrice = items.reduce((sum, currentItem) => {
            const discountedPrice =
                currentItem.price - (currentItem.price * currentItem.discount / 100)

            const itemTotalPrice = discountedPrice * currentItem.count
            return sum + itemTotalPrice
        }, 0)

        return Math.round(totalPrice)
    }

    return (
        <CartContext
            value={{
                items,
                addItemToCart,
                removeItemFromCart,
                getTotalPrice,
                incrementCount,
                decrementCount,
                removeAll,
                getTotalPriceAfterDiscount
            }}
        >
            {children}
        </CartContext>
    )
}
