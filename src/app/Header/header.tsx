import { ICONS } from "../../shared";
import styles from "./header.module.css"

const Logo = ICONS.headerLogo
const Orders = ICONS.headerOrders
const Profile = ICONS.headerProfile

export function Header(){
    return (
        <header className={styles.header}>
            <div className={styles.urls}>
                <h1 className={styles.url}>КАТАЛОГ</h1>
                <h1 className={styles.url}>ПРО НАС</h1>
                <h1 className={styles.url}>КОНТАКТИ</h1>
            </div>
            <Logo className={styles.logo} />
            <div className={styles.buttons}>
                <Orders className={`${styles.orders} ${styles.hatImageUrl}`} />
                <Profile className={`${styles.profile} ${styles.hatImageUrl}`} />
            </div>
        </header>
    )
}