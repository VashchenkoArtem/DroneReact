import { CabinetUrls } from "../../components/cabinet-urls";
import { ProfileInformation } from "../../components/profile-information";
import styles from "./profile.module.css"

export function ProfilePage(){
    return (
        <div className={styles.profileContainer}>
            <CabinetUrls></CabinetUrls>
            <ProfileInformation></ProfileInformation>
        </div>
    )
}