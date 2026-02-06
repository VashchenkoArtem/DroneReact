import { useState } from "react"
import { ICategory } from "../shared/types/product"

export function useCategories(){
    const [ categories, setCategories] = useState<ICategory[]>()
    async function getCategories(){
        try{
            const response = await fetch(`http://127.0.0.1:8000/categories`)
            const result = await response.json()
            setCategories(result)
        }catch(error){
            console.log(error)
        }
    }
    getCategories()
    return { categories }
}