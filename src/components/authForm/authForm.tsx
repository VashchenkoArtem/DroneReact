import React, { useState } from 'react';
import { useUserContext } from '../../context/user-context';
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
    const [error, setError] = useState<string | null>(null);

    const [showPassword, setShowPassword] = useState(false);

    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        
        const result = await login({ email, password });
        
        if (typeof result === 'string') {
            setError(result);
        } else {
            onClose();
        }
    };

    return (
        <div className={styles.overlay} onClick={onClose}>
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                <button className={styles.closeBtn} onClick={onClose}>&times;</button>
                
                <h2 className={styles.title}>
                    <span className={styles.active}>Авторизація</span> 
                    <span className={styles.separator}>/</span> 
                    <span className={styles.inactive}>Реєстрація</span>
                </h2>

                <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.inputGroup}>
                        <label>Email</label>
                        <input 
                            type="email" 
                            placeholder="Введіть email" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className={styles.inputGroup}>
                        <label>Пароль</label>
                        <div className={styles.passwordWrapper}>
                            <input 
                                type={showPassword ? "text" : "password"}
                                placeholder="Введіть пароль" 
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <span 
                                className={styles.eyeIcon} 
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                <PasswordEye />
                            </span>
                        </div>
                    </div>

                    <a href="#" className={styles.forgotPass}>Забули пароль?</a>

                    {error && <p className={styles.errorText}>{error}</p>}

                    <div className={styles.actions}>
                        <button type="button" className={styles.cancelBtn} onClick={onClose}>
                            СКАСУВАТИ
                        </button>
                        <button type="submit" className={styles.submitBtn}>
                            УВІЙТИ
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};