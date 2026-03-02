import { Outlet, useLocation } from "react-router-dom";
import { Header } from "../Header";
import styles from "./layout.module.css"
import { Footer } from "../Footer";

export function Layout(){
    const location = useLocation();
    const isCheckoutPage = location.pathname === "/successOrder";
    if (isCheckoutPage){
        return (
            <div className={styles.layoutGrey}>
                <Header/>
                <div className = {styles.mainContent}>
                    <Outlet/>
                </div>
                <Footer/>
            </div>   
        )
    }
    return (
        <div className={styles.layout}>
            <Header/>
            <div className = {styles.mainContent}>
                <Outlet/>
            </div>
            <Footer/>
        </div>
    )
}