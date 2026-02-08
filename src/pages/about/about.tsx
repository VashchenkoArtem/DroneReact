import { AboutUs } from "../../components/about";
import { useScrollToStartPage } from "../../hooks";

export function AboutUsPage(){
    useScrollToStartPage()
    return <AboutUs/>
}