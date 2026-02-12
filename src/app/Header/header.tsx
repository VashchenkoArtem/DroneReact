import { useState, useRef, useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import { ICONS } from "../../shared";
import styles from "./header.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useUserContext } from "../../context/AuthRegContext";
import { AuthModal } from "../../components/authForm";
import { Modal } from "../../shared/modal";
import { RegistrationForm } from "../../pages/registration";

const Logo = ICONS.headerLogo;
const Orders = ICONS.headerOrders;
const Profile = ICONS.headerProfile;
const BurgerMenu = ICONS.headerBurgerMenu;

export function Header() {
    const { user, logout } = useUserContext();
    const navigate = useNavigate();
    
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

    // Состояние для управления открытием/закрытием выпадающего меню
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    
    // Референс для отслеживания кликов вне выпадающего меню
    const dropdownRef = useRef<HTMLDivElement>(null);

    const isPhone = useMediaQuery({
        query: '(max-width: 767px)'
    });

    // Закрытие модалки при клике вне её области
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleProfileClick = () => {
        if (user) {
            // Если пользователь авторизован, открываем/закрываем меню
            setIsDropdownOpen(!isDropdownOpen);
            // navigate("/profile"); вставить вместо открытия меню после конца тестирования
        } else {
            setIsAuthModalOpen(true);
        }
    };

    // Фуркция Logout/Выход из аккаунта
    // убрать после тестирования
    const handleLogout = () => {
        logout();
        setIsDropdownOpen(false);
        navigate("/");
    };

    // Функция для перехода в профиль
    // убрать после тестирования
    const handleGoToProfile = () => {
        setIsDropdownOpen(false);
        navigate("/profile");
    };

    const renderButtons = () => (
        <div className={styles.buttons}>
            <Link to="/orders">
                <Orders className={`${styles.orders} ${styles.hatImageUrl}`} />
            </Link>
            
            {/* При конце тестирования заменить на код в комментариях ниже*/}
            {/* 
            <div className={styles.profileWrapper} onClick={handleProfileClick} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
            <Profile className={`${styles.profile} ${styles.hatImageUrl}`} />
            {!isPhone && user && <span className={styles.userName}>{user.firstName}</span>}
            </div> 
            */}
            <div className={styles.profileContainer} ref={dropdownRef}>
                <div 
                    className={styles.profileWrapper} 
                    onClick={handleProfileClick} 
                >
                    <Profile className={`${styles.profile} ${styles.hatImageUrl}`} />
                </div>

                {/* Рендеринг модалки */}
                {isDropdownOpen && user && (
                    <div className={styles.dropdown}>
                        <button onClick={handleGoToProfile} className={styles.dropdownItem}>
                            МІЙ ПРОФІЛЬ
                        </button>
                        <div className={styles.divider}></div>
                        <button onClick={handleLogout} className={`${styles.dropdownItem} ${styles.logoutBtn}`}>
                            ВИЙТИ
                        </button>
                    </div>
                )}
                {/* тут конец */}
            </div>

            {isPhone && <BurgerMenu className={`${styles.burgerMenu} ${styles.hatImageUrl}`} />}
        </div>
    );

    return (
        <>
            <header className={styles.header}>
                {!isPhone && (
                    <div className={styles.urls}>
                        <Link to="/catalog">
                            <h1 className={styles.url}>КАТАЛОГ</h1>
                        </Link>
                        <Link to="/about">
                            <h1 className={styles.url}>ПРО НАС</h1>
                        </Link>
                        <Link to="/contacts">
                             <h1 className={styles.url}>КОНТАКТИ</h1>
                        </Link>
                    </div>
                )}

                <Link to="/">
                    <Logo className={styles.logo} />
                </Link>

                {renderButtons()}
            </header>

            <AuthModal 
                isOpen={isAuthModalOpen} 
                onClose={() => setIsAuthModalOpen(false)} 
            />
        </>
    );
}