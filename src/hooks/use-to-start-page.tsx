import { useEffect } from "react";

export function useScrollToStartPage(){
    function scrollToTop(){
        window.scrollTo(0, 0);
    }
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])
    return {scrollToTop}
}