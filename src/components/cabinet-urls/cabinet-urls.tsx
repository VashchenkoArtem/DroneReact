import { Link, useNavigate } from "react-router-dom";
import styles from "./cabinet-urls.module.css"
import { useContext } from "react";
import { UserContext } from "../../context/user-context";


export function CabinetUrls(){
    const navigate = useNavigate()
    const userContext = useContext(UserContext)
    
    if (!userContext) return null
    const { setUserFunction } = userContext
    
    return (
        <div className={styles.urlsContainer}>
            <h1 className={styles.urlsTitle}>ОСОБИСТИЙ КАБІНЕТ</h1>
            <Link to = "/"><h2 className={styles.url}>КОНТАКТНІ ДАНІ</h2></Link>
            <Link to = "/"><h2 className={styles.url}>МОЇ ЗАМОВЛЕННЯ</h2></Link>
            <Link to = "/"><h2 className={styles.url}>АДРЕСА ДОСТАВКИ</h2></Link>
            <div className={styles.urlLine}></div>
            <Link to = "/" ><h2 className={styles.url} onClick={() => {
                localStorage.removeItem("Token"); 
                navigate("/")
                setUserFunction(null)
            }   
            }>ВИЙТИ</h2></Link>
        </div>
    )
}