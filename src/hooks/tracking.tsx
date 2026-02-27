import { useEffect } from "react";
import { IMAGES } from "../shared";

export function useTrackingDelivery(){
    async function trackDelivery(ttnNumber: string){
        try{
            const response = await fetch(`https://api-stage.novapost.com/v.1.0/shipments/tracking/history/?numbers[]=${ttnNumber}`, {
                headers: {
                    "Authorization": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJucCIsImlhdCI6MTc3MjEzNjM4OCwiZXhwIjoxNzcyMTM5OTg4LCJjaWQiOiI5ZGQ3NTg5Ny00ZjAyLTRmZWEtYTYxNC1jMmIzZDk1ZjdmNGUiLCJyZWYiOiI2OTljOTZjODI3YzJkMWU5OGIwY2NhZjYiLCJzcmMiOiJsb2NhbCIsInN1YiI6ImV5SnBkaUk2SWpKamVIZGFNSFEwTVVsVWJXODVPV3BhTVdWMVUzYzlQU0lzSW5aaGJIVmxJam9pY0ZRdlVXWmtkR0ZYTXpGb2VWUkhZV1J4UTBvclRscEVNa012ZUdGd05sVTViRzlWYTBGNlkxbE5XVlUzTkZOVE5EVTBhbVJLWWpoT1dFaHplbFoxVWlJc0ltMWhZeUk2SW1NeU9HTmhaVGd3WW1ReVptSTFPR1UxTjJFek5HSTVNR0V4TWpCbU9UQmpOekZtTmpOalpXTmlaRGhqWWprMFlqSTNabVF6WkRBNVpqRXdNemRtT0RJaUxDSjBZV2NpT2lJaWZRPT0ifQ.AmlhS4SVBIftyAuAwQPB7mKrG-KCnFliNMT1xfD8bQg",
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "Accept-Language": "ua"}
            })
            const result = await response.json()
            const trackingStatus = result.items[0].history_tracking[0].code_name
            let deliveryImageStatus = IMAGES.deliveryCreating
            console.log(trackingStatus)
            return deliveryImageStatus
            // if (trackingStatus === )
        }catch(error){
            console.log(error)
        }
    }
    return { trackDelivery }
}