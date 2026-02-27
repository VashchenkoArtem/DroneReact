export function useChangePassword(){
    async function changePassword(password: string, code: string | null){
        try{
            console.log("asdadsd")
            const response = await fetch(`http://127.0.0.1:8000/users/recovery-password?code=${code}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({password})
            })
        }catch(error){
            console.log(error)
        }
    }
    return { changePassword }
}