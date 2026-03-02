import { Link } from "react-router-dom"
import styles from "./successOrder.module.css"

export function SuccessOrder(){
    return(
        <div className={styles.successContainer}>
            <h1 className={styles.successTitle}>УСПІХ!</h1>
            <p className={styles.successText}>Ваше замовлення №21718 прийнято та відправлено на обробку. <br />
                                                 <br />
                    Ми сповістимо Вас щойно замовлення буде відправлено. <br />
                                    Дякуємо за довіру! </p>
            <Link to = "/">
                <button className={styles.successButton}>НА ГОЛОВНУ</button>
            </Link>
        </div>
    )
}