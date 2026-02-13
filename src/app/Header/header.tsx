import { useMediaQuery } from "react-responsive";
import { ICONS } from "../../shared";
import styles from "./header.module.css"
import { Link } from "react-router-dom";
import { Modal } from "../../shared/modal";
import { RegistrationForm } from "../../pages/registration";
import { useEffect, useRef, useState } from "react";
import { useUserContext } from "../../context/user-context";
import { AuthModal } from "../../components/authForm";

const Logo = ICONS.headerLogo
const Orders = ICONS.headerOrders
const Profile = ICONS.headerProfile
const BurgerMenu = ICONS.headerBurgerMenu

export function Header(){
    const { user } = useUserContext();
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const isPhone = useMediaQuery({
        query: '(max-width: 767px)'
    })
    const handleProfileClick = () => {
        if (user) {
            setIsDropdownOpen(!isDropdownOpen);
        } else {
            setIsAuthModalOpen(true);
        }
    };
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);
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
                { user ?
                    <Link to="/profileInformation"><Profile className={`${styles.profile} ${styles.hatImageUrl}`} /></Link>
                    :
                    <div>
                        <button className={styles.openTagForm} onClick={() => setisRegistrationFormOpen(true)}> 
                            <Profile className={`${styles.profile} ${styles.hatImageUrl}`} />
                        </button>
    
                        <Modal
                            isOpen={isRegistrationFormOpen}
                            onClose={() => setisRegistrationFormOpen(false)}
                            className={styles.createPostModal}
                            doCloseOnOutsideClick
                        >
                            <RegistrationForm onClose={() => setisRegistrationFormOpen(false)} onOpenAuthForm={() => setIsAuthModalOpen(!isAuthModalOpen)} />
                        </Modal>
                        <AuthModal 
                            isOpen={isAuthModalOpen} 
                            onClose={() => setIsAuthModalOpen(false)} 
                        />
                    </div>
                }

            </div>
        </header>
    )
}