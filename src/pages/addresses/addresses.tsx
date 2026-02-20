import { CabinetUrls } from "../../components/cabinet-urls"
import { DeliveryAddress } from "../../components/delivery-address"
import styles from "../profile/profile.module.css"

export function AddressesPage(){
    return (
        <div className={styles.profileContainer}>
            <CabinetUrls></CabinetUrls>
            <DeliveryAddress></DeliveryAddress>
        </div>
    )
}

