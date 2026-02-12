import { Link } from "react-router-dom";
import styles from "./cabinet-urls.module.css"

export function CabinetUrls(){
    return (
        <div className={styles.urlsContainer}>
            <h1 className={styles.urlsTitle}>ОСОБИСТИЙ КАБІНЕТ</h1>
            <Link to = "/"><h2 className={styles.url}>КОНТАКТНІ ДАНІ</h2></Link>
            <Link to = "/"><h2 className={styles.url}>МОЇ ЗАМОВЛЕННЯ</h2></Link>
            <Link to = "/"><h2 className={styles.url}>АДРЕСА ДОСТАВКИ</h2></Link>
            <div className={styles.urlLine}></div>
            <Link to = "/" ><h2 className={styles.url}>ВИЙТИ</h2></Link>
        </div>
    )
}