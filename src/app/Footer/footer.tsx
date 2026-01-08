import { IMAGES } from "../../shared";
import styles from "./footer.module.css";

export function Footer(){
    return (
        <footer className={styles.footer}>
            <img src={IMAGES.footerBG} className = {styles.footerBG} />
            <div className={styles.ourAchivements}>
                <div className={styles.achivement}>
                    <h1 className={styles.titleAchivement}>1K+</h1>
                    <h2 className={styles.textAchivement}>Успішних відправок</h2>
                </div>
                <div className={styles.achivement}>
                    <h1 className={styles.titleAchivement}>1.5K+</h1>
                    <h2 className={styles.textAchivement}>Задоволених клієнтів</h2>
                </div>
                <div className={styles.achivement}>
                    <h1 className={styles.titleAchivement}>24/7</h1>
                    <h2 className={styles.textAchivement}>Підтримка клієнтів</h2>
                </div>
            </div>
            <div className={styles.urls}>
                <h1 className={styles.url}>КАТАЛОГ</h1>
                <h1 className={styles.url}>ПРО НАС</h1>
                <h1 className={styles.url}>КОНТАКТИ</h1>
                <h1 className={styles.url}>КОШИК</h1>
                <h1 className={styles.url}>КАБІНЕТ</h1>
            </div>
        </footer>
    )
}