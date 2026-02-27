import { Link, useLocation } from "react-router-dom";
import styles from "./cabinet-urls.module.css";

export function CabinetUrls() {
    const location = useLocation();

    const handleLogout = () => {
        localStorage.removeItem('token');
        window.location.href = '/'; 
    };

    const isActive = (path: string) => location.pathname === path;

    return (
        <div className={styles.urlsContainer}>
            <h1 className={styles.urlsTitle}>ОСОБИСТИЙ КАБІНЕТ</h1>
            
            <Link to="/profileInformation" className={styles.linkWrapper}>
                <div className={`${styles.url} ${isActive("/profileInformation") ? styles.active : ""}`}>
                    <h2>Контактні дані</h2>
                </div>
            </Link>

            <Link to="/orders" className={styles.linkWrapper}>
                <div className={`${styles.url} ${isActive("/orders") ? styles.active : ""}`}>
                    <h2>Мої замовлення</h2>
                </div>
            </Link>

            <Link to="/addresses" className={styles.linkWrapper}>
                <div className={`${styles.url} ${isActive("/addresses") ? styles.active : ""}`}>
                    <h2>Адреса доставки</h2>
                </div>
            </Link>

            <div className={styles.urlLine}></div>
            
            <div className={styles.linkWrapper} onClick={handleLogout}>
                <div className={styles.url}>
                    <h2>Вийти</h2>
                </div>
            </div>
        </div>
    );
}