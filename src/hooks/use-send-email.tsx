import { UpdatePasswordForm } from "../components/updatePasswordForm"

export function useSendToEmail(){
    
    async function sendUrlToEmail(content: UpdatePasswordForm){
        try{
            console.log(JSON.stringify(content.email))
            const response = await fetch("http://127.0.0.1:8000/users/send-code",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(content)
                }
            )
        }catch(error){
            console.log(error)
        }
    }
    return { sendUrlToEmail}
}