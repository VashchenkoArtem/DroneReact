import { useState } from "react";
import { useMediaQuery } from "react-responsive";
import { ICONS } from "../../shared";
import styles from "./header.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useUserContext } from "../../context/AuthRegContext";
import { AuthModal } from "../../components/authForm";


const Logo = ICONS.headerLogo;
const Orders = ICONS.headerOrders;
const Profile = ICONS.headerProfile;
const BurgerMenu = ICONS.headerBurgerMenu;


export function Header() {
    const { user } = useUserContext();
    const navigate = useNavigate();
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

    const isPhone = useMediaQuery({ query: '(max-width: 767px)' });

    const handleProfileClick = () => {
        if (user) {
            navigate("/profile");
        } else {
            setIsAuthModalOpen(true);
        }
    };

    return (
        <div>
            <header className={styles.header}>
                {!isPhone && (
                    <div className={styles.urls}>
                        <Link to="/catalog"><h1 className={styles.url}>КАТАЛОГ</h1></Link>
                        <Link to="/about"><h1 className={styles.url}>ПРО НАС</h1></Link>
                        <Link to="/contacts"><h1 className={styles.url}>КОНТАКТИ</h1></Link>
                    </div>
                )}

                <Link to="/"><Logo className={styles.logo} /></Link>

                <div className={styles.buttons}>
                    <Link to="/orders">
                        <Orders className={`${styles.orders} ${styles.hatImageUrl}`} />
                    </Link>
                    
                    <div className={styles.profileWrapper} onClick={handleProfileClick} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Profile className={`${styles.profile} ${styles.hatImageUrl}`} />
                    </div>

                    {isPhone && <BurgerMenu className={`${styles.burgerMenu} ${styles.hatImageUrl}`} />}
                </div>
            </header>

            <AuthModal 
                isOpen={isAuthModalOpen} 
                onClose={() => setIsAuthModalOpen(false)} 
            />
        </div>
    );
}