import { useContext } from "react"
import { UserContext } from "../context/user-context"
import { ContactForm } from "../shared/types/user"

export function useSendMessage(){
    const context = useContext(UserContext)
    async function sendMessage(message: ContactForm){
        if (!message) return null
        try{
            const response = await fetch("http://127.0.0.1:8000/users/contacts", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(message)
            })
            console.log("sent")
        }catch(error){
            console.log(error)
        }
    }
    return { sendMessage }
}