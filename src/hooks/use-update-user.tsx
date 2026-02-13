import { IUpdateUser } from "../shared/types/user"


export function useUpdateUser(){
    const token = localStorage.getItem("Token")
    console.log(token)
    async function updateUser(content: IUpdateUser){
        try{
            const response = await fetch("http://127.0.0.1:8000/users/update", {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }, body: JSON.stringify(content)
            })
        }catch(error){
            console.log(error)
        }
    }
    return { updateUser }
}