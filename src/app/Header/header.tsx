import { useMediaQuery } from "react-responsive";
import { ICONS } from "../../shared";
import styles from "./header.module.css"
import { Link } from "react-router-dom";
import { Modal } from "../../shared/modal";
import { RegistrationForm } from "../../pages/registration";
import { useState } from "react";

const Logo = ICONS.headerLogo
const Orders = ICONS.headerOrders
const Profile = ICONS.headerProfile
const BurgerMenu = ICONS.headerBurgerMenu

export function Header(){
    const isPhone = useMediaQuery({
        query: '(max-width: 767px)'
    })

    const [isRegistrationFormOpen, setisRegistrationFormOpen] = useState(false)

    if (isPhone){
        return (
            <header className={styles.header}>
                <Logo className={styles.logo} />
                <div className={styles.buttons}>
                    <Orders className={`${styles.orders} ${styles.hatImageUrl}`} />
                    <Profile className={`${styles.profile} ${styles.hatImageUrl}`} />
                    <BurgerMenu className={`${styles.burgerMenu} ${styles.hatImageUrl}`} />
                </div>
            </header>            
        )        
    }
    return (
        <header className={styles.header}>
            <div className={styles.urls}>
                <Link to = "/catalog">
                    <h1 className={styles.url}>КАТАЛОГ</h1>
                </Link>
                <Link to = "/about">
                    <h1 className={styles.url}>ПРО НАС</h1>
                </Link>
                <h1 className={styles.url}>КОНТАКТИ</h1>
            </div>
            <Logo className={styles.logo} />
            <div className={styles.buttons}>
                <Orders className={`${styles.orders} ${styles.hatImageUrl}`} />
                
                {/* <Link to="/profileInformation"><Profile className={`${styles.profile} ${styles.hatImageUrl}`} /></Link> */}

                <button className={styles.openTagForm} onClick={() => setisRegistrationFormOpen(true)}> 
                    <Profile className={`${styles.profile} ${styles.hatImageUrl}`} />
                </button>

                <Modal
                    isOpen={isRegistrationFormOpen}
                    onClose={() => setisRegistrationFormOpen(false)}
                    className={styles.createPostModal}
                    doCloseOnOutsideClick
                >
                    <RegistrationForm onClose={() => setisRegistrationFormOpen(false)} />
                </Modal>
            </div>
        </header>
    )
}