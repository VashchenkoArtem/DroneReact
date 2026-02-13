import { createContext, ReactNode, useEffect, useState } from "react";
import { IProduct } from "../shared";
import { useUserContext } from "./user-context";

interface IOrderContext{
    productInOrder?: IProduct[]
}

const OrderContext = createContext<IOrderContext | null>(null)

interface IOrderProviderContext {
    children: ReactNode
}

export function OrderProviderContext(props: IOrderProviderContext){
    const { children } = props
    const [ productInOrder, setProductInOrder ] = useState<IProduct[]>()
    const {token} = useUserContext()
    useEffect(() => {
        getProductInOrder()
    }, [productInOrder])
    async function getProductInOrder(){
        try{
            const response = await fetch("http://localhost:8000/users/orders", 
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )
            const result = await response.json()
            console.log(result)
        }catch(error){
            console.log(error)
        }
    }
    return (
        <OrderContext value={{productInOrder}}>
            {children}
        </OrderContext>
    )
}