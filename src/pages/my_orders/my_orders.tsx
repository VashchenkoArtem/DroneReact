import { CabinetUrls } from "../../components/cabinet-urls"
import { MyOrders } from "../../components/orders"
import styles from "../profile/profile.module.css"

export function OrdersPage(){
    return (
        <div className={styles.profileContainer}>
            <CabinetUrls></CabinetUrls>
            <MyOrders/>
        </div>
    )
}