import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { useUserContext } from '../../context/AuthRegContext';
import { ICONS } from '../../shared';
import styles from './authForm.module.css';

const PasswordEye = ICONS.passwordEye;

interface AuthModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
    const { login } = useUserContext();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    // Стан для помилок валідації
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [serverError, setServerError] = useState<string | null>(null);

    const [showPassword, setShowPassword] = useState(false);

    if (!isOpen) return null;

    const validate = () => {
        let isValid = true;

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setEmailError('Введіть коректний email (наприклад, example@mail.com)');
            isValid = false;
        } else {
            setEmailError('');
        }

        if (password.length < 6) {
            setPasswordError('Пароль має містити не менше 6 символів');
            isValid = false;
        } else {
            setPasswordError('');
        }

        return isValid;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setServerError(null);

        if (validate()) {
            const result = await login({ email, password });
            
            if (typeof result === 'string') {
                setServerError(result);
            } else {
                onClose();
            }
        }
    };

    return createPortal(
        <div className={styles.overlay} onClick={onClose}>
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                <button className={styles.closeBtn} onClick={onClose}>&times;</button>
                
                <h2 className={styles.title}>
                    <span className={styles.active}>Авторизація</span> 
                    <span className={styles.separator}>/</span> 
                    <span className={styles.inactive}>Реєстрація</span>
                </h2>

                <form onSubmit={handleSubmit} className={styles.form} noValidate>
                    <div className={styles.inputGroup}>
                        <label>Email</label>
                        <input 
                            type="email" 
                            className={emailError ? styles.inputError : ''}
                            placeholder="Введіть email" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        {emailError && <span className={styles.errorLabel}>{emailError}</span>}
                    </div>

                    <div className={styles.inputGroup}>
                        <label>Пароль</label>
                        <div className={styles.passwordWrapper}>
                            <input 
                                type={showPassword ? "text" : "password"}
                                className={passwordError ? styles.inputError : ''}
                                placeholder="Введіть пароль" 
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <span className={styles.eyeIcon} onClick={() => setShowPassword(!showPassword)}>
                                <PasswordEye />
                            </span>
                        </div>
                        {passwordError && <span className={styles.errorLabel}>{passwordError}</span>}
                    </div>

                    <button type="button" className={styles.forgotPass}>Забули пароль?</button>

                    {serverError && <p className={styles.errorText}>{serverError}</p>}

                    <div className={styles.actions}>
                        <button type="button" className={styles.cancelBtn} onClick={onClose}>СКАСУВАТИ</button>
                        <button type="submit" className={styles.submitBtn}>УВІЙТИ</button>
                    </div>
                </form>
            </div>
        </div>,
        document.body
    );
};