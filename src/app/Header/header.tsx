import { useMediaQuery } from "react-responsive";
import { ICONS } from "../../shared";
import styles from "./header.module.css"
import { Link, useLocation } from "react-router-dom";
import { Modal } from "../../shared/modal";
import { RegistrationForm } from "../../pages/registration";
import { useEffect, useRef, useState } from "react";
import { useUserContext } from "../../context/user-context";
import { AuthModal } from "../../components/authForm";
import { ChangePasswordForm } from "../../components/changePasswordForm";
import { CartPage } from "../../pages/cart-page";



const Logo = ICONS.headerLogo
const Orders = ICONS.headerOrders
const Profile = ICONS.headerProfile
const BurgerMenu = ICONS.headerBurgerMenu

export function Header(){
    const { user } = useUserContext();
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isCartOpen, setIsCartOpen] = useState(false)
    const dropdownRef = useRef<HTMLDivElement>(null);

    const location = useLocation();
    const isCheckoutPage = location.pathname === '/checkoutOrder';



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

    if (isCheckoutPage) {
        return (
            <header className={styles.header}>
                <div className={styles.topNav} onClick={() => window.history.back()}>
                    ПРОДОВЖИТИ ПОКУПКИ
                </div>
                <Link to = "/" ><Logo className={styles.logo} /></Link>
            </header>
        );
    }

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
                    <h1 className={styles.url} >КАТАЛОГ</h1>
                </Link>
                <Link to = "/about">
                    <h1 className={styles.url}>ПРО НАС</h1>
                </Link>
                <Link to = "/contacts" >
                    <h1 className={styles.url}>КОНТАКТИ</h1>
                </Link>
            </div>
            <Link to = "/" ><Logo className={styles.logo} /></Link>
            <div className={styles.buttons}>
                <Orders 
                    className={`${styles.orders} ${styles.hatImageUrl}`} 
                    onClick={() => setIsCartOpen(true)}
                />                

                { user ?
                    <Link to="/profileInformation"><Profile className={`${styles.profile} ${styles.hatImageUrl}`} /></Link>
                    :
                    <div>
                        <button className={styles.openTagForm} onClick={() => setisRegistrationFormOpen(true)}> 
                            <Profile className={`${styles.profile} ${styles.hatImageUrl}`} />
                        </button>
                    </div>
                }
                
                <Modal
                    isOpen={isRegistrationFormOpen}
                    onClose={() => setisRegistrationFormOpen(false)}
                    className={styles.createPostModal}
                    doCloseOnOutsideClick
                >
                    <RegistrationForm onClose={() => setisRegistrationFormOpen(false)} onOpenAuthForm={() => setIsAuthModalOpen(!isAuthModalOpen)} />
                </Modal>


                
                <AuthModal 
                    onOpenRegistrationForm ={() => setisRegistrationFormOpen(!isRegistrationFormOpen)}
                    isOpen={isAuthModalOpen} 
                    onClose={() => setIsAuthModalOpen(false)} 
                />

                    <Modal
                        variant="dropdown"
                        className={styles.cartModal}
                        isOpen={isCartOpen}
                        onClose={() => setIsCartOpen(false)}
                    >
                        <CartPage onClose={() => setIsCartOpen(false)} />
                    </Modal>

                <ChangePasswordForm></ChangePasswordForm>

            </div>
        </header>
    )
}
// const Logo = ICONS.headerLogo;
// const Orders = ICONS.headerOrders;
// const Profile = ICONS.headerProfile;
// const BurgerMenu = ICONS.headerBurgerMenu;


// export function Header() {
//     const { user } = useUserContext();
//     const navigate = useNavigate();
//     const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

//     const isPhone = useMediaQuery({ query: '(max-width: 767px)' });

//     const handleProfileClick = () => {
//         if (user) {
//             navigate("/profile");
//         } else {
//             setIsAuthModalOpen(true);
//         }
//     };

//     return (
//         <div>
//             <header className={styles.header}>
//                 {!isPhone && (
//                     <div className={styles.urls}>
//                         <Link to="/catalog"><h1 className={styles.url}>КАТАЛОГ</h1></Link>
//                         <Link to="/about"><h1 className={styles.url}>ПРО НАС</h1></Link>
//                         <Link to="/contacts"><h1 className={styles.url}>КОНТАКТИ</h1></Link>
//                     </div>
//                 )}

//                 <Link to="/"><Logo className={styles.logo} /></Link>

//                 <div className={styles.buttons}>
//                     <Link to="/orders">
//                         <Orders className={`${styles.orders} ${styles.hatImageUrl}`} />
//                     </Link>
                    
//                     <div className={styles.profileWrapper} onClick={handleProfileClick} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
//                         <Profile className={`${styles.profile} ${styles.hatImageUrl}`} />
//                     </div>

//                     {isPhone && <BurgerMenu className={`${styles.burgerMenu} ${styles.hatImageUrl}`} />}
//                 </div>
//             </header>

//             <AuthModal 
//                 isOpen={isAuthModalOpen} 
//                 onClose={() => setIsAuthModalOpen(false)} 
//             />
//         </div>
//     );
// }