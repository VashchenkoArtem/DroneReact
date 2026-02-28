import { Link, useNavigate, useParams } from "react-router-dom";
import styles from "./successful-order-page.module.css";

export function SuccessfulOrderPage() {
    return (
        <div className={styles.wrapperContainer}>
            <h2>УСПІХ!</h2>
            <p>Ваше замовлення № прийнято та відправлено на обробку. </p><br />

            <div className={styles.containerText}>
                <p>Ми сповістимо Вас щойно замовлення буде відправлено.</p>
                <p>Дякуємо за довіру! </p>
            </div>
            <button className={styles.toHomeBtn}>
                <Link to="/">НА ГОЛОВНУ</Link>
            </button>
        </div>
    )
}