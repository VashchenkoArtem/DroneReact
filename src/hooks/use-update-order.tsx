export function useUpdateOrder(){
    async function UpdateOrder(orderId: number, data: {status: string}){
        try{
            const response = await fetch(`http://127.0.0.1:8000/users/orders/${orderId}`, {
                method: "PATCH",
                headers: {
                  "Content-Type": "application/json",
                  "Authorization": `Bearer ${localStorage.getItem("token")}`  
                },
                body: JSON.stringify(data)
            })
            console.log(response)
        }catch(error){
            console.log(error)
        }
    }
    return { UpdateOrder }
}