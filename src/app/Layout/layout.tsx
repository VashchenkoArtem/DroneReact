import { Outlet } from "react-router-dom";
import { Header } from "../Header";
import styles from "./layout.module.css"
import { Footer } from "../Footer";

export function Layout(){
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