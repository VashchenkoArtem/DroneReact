import { useForm } from "react-hook-form"
import styles from "./registration.module.css"
import { ICONS } from "../../shared"
import { Link } from "react-router-dom"
import { useUserContext } from "../../context/user-context"
import { IRegForm, RegistrationFormProps } from "./registration.types"

export function RegistrationForm({ onClose, onOpenAuthForm }: RegistrationFormProps) {
    const { handleSubmit, register, getValues, formState: {errors}} = useForm<IRegForm>()
    const { registration } = useUserContext()

    const usernameError = errors.firstName?.message
    const emailError = errors.email?.message
    const passwordError = errors.password?.message
    const passwordConfirmationError = errors.passwordConfirmation?.message

    const rootError = errors.root?.message

    function onSubmit(data: IRegForm){
        registration({
            firstName: data.firstName,
            email: data.email,
            password: data.password,
            lastName: "",
            patronymic: "",
            birthDate: new Date().toISOString(),
            phoneNumber: ""
        })
    }



    return (
        <div className={styles.registerContainer}>
            <div className={styles.formUpperActions}>
                <div className={styles.formLinks}>
                    <Link to='/login' className={styles.authLink} onClick={()=>{
                        onOpenAuthForm()
                        onClose()
                    }
                    }>Авторизація</Link>
                    <p>/</p>
                    <Link to='/registration' className={styles.regLink}>Реєстрація</Link>
                </div>

                <button
                    type="button"
                    className={styles.closeModalBtn}
                    onClick={onClose}
                >✕</button>
            </div>
            


            <form  noValidate className={styles.registerForm} onSubmit={ handleSubmit(onSubmit) }>
                <label htmlFor="name" className={styles.inputLabel}>
                    Ім'я
                    <input 
                        type="text" 
                        placeholder="Введіть ім’я" 
                        className={`${styles.inputForm} ${usernameError ? styles.inputError : ''}`}
                        {...register('firstName', {
                        required: {
                            value: true,
                            message: "Це поле обов'язкове."
                        },

                        minLength: {
                            value: 5,
                            message: "Ім'я користувача повинно складатись принаймні з 5 символів."
                        },

                        validate: (value) => {
                            if (value.includes("!") && value.includes(".")){
                                return "Ім'я користувача не може складатись зі спец. символів."
                            }
                        }
                    })}
                    />
                    {usernameError && <p className={styles.error}>{usernameError}</p>}
                </label>

                <label htmlFor="email" className={styles.inputLabel}>
                    Email
                    <input 
                        type="email" 
                        placeholder="Введіть email" 
                        className={`${styles.inputForm} ${emailError ? styles.inputError : ''}`}
                        {...register('email', {

                        required: {
                            value: true,
                            message: "Це поле обов'язкове."
                        },

                        minLength: {
                            value: 5,
                            message: "Ел. пошта повинна складатись принаймні з 5 символів."
                        },

                        validate: (value) => {
                            if (!value.includes(".") && !value.includes("@")){
                                return "Ел. пошта повинна мати символи '.' та '@'"
                            }
                        }
                    })}
                    />
                    {emailError && <p className={styles.error}>{emailError}</p>}
                </label>
    
                
                <label htmlFor="password" className={styles.inputLabel}>
                    Пароль
                    <input 
                        type="password" 
                        placeholder="Введіть пароль" 
                        className={`${styles.inputForm} ${passwordError ? styles.inputError : ''}`} 
                        {...register('password', {

                        required: {
                            value: true,
                            message: "Це поле обов'язкове."
                        },

                        minLength: {
                            value: 5,
                            message: "Пароль повинен складатись принаймні з 5 символів."
                        },

                        validate: (value) => {
                            if (/\s/.test(value)) {
                                return "Пароль не може містити пробілів."
                            }

                            if (!/[a-z]/.test(value)) {
                                return "Пароль повинен містити принаймні 1 малу літеру."
                            }

                            if (!/[A-Z]/.test(value)) {
                                return "Пароль повинен містити принаймні 1 велику літеру."
                            }

                            if (!/[0-9]/.test(value)) {
                                return "Пароль повинен містити принаймні 1 цифру."
                            }

                            if (!/^[A-Za-z0-9]+$/.test(value)) {
                                return "Пароль може містити лише букви та цифри."
                            }

                        }
                    })}
                    />
                    {passwordError && <p className={styles.error}>{passwordError}</p>}
                </label>
    
                <label htmlFor="password" className={styles.inputLabel}>
                    Підтвердження пароля
                    <input 
                        type="password" 
                        placeholder="Повторіть пароль" 
                        className={`${styles.inputForm} ${passwordConfirmationError ? styles.inputError : ''}`}
                        {...register('passwordConfirmation', {
                        required: {
                            value: true,
                            message: "Це поле обов'язкове."
                        },

                        minLength: {
                            value: 5,
                            message: "Пароль повинен складатись принаймні з 5 символів."
                        },

                        validate: (value) => {
                            if (value !== getValues('password')) {
                                return "Паролі не співпадають. Повторіть спробу";
                            }

                            if (/\s/.test(value)) {
                                return "Пароль не може містити пробілів."
                            }

                            if (!/[a-z]/.test(value)) {
                                return "Пароль повинен містити принаймні 1 малу літеру."
                            }

                            if (!/[A-Z]/.test(value)) {
                                return "Пароль повинен містити принаймні 1 велику літеру."
                            }

                            if (!/[0-9]/.test(value)) {
                                return "Пароль повинен містити принаймні 1 цифру."
                            }

                            if (!/^[A-Za-z0-9]+$/.test(value)) {
                                return "Пароль може містити лише букви та цифри."
                            }
                        }
                    })}
                    />
                    {passwordConfirmationError && <p className={styles.error}>{passwordConfirmationError}</p>}
                </label>
    
                <p className={styles.authInfoLink}>Вже є акаунт? 
                    <span>
                        <Link to='/login' className={styles.signUpInfoLink}> Увійти</Link>
                    </span>
                </p>
    
                <div className={styles.formButtonActions}>
                    <button className={styles.cancelRegisterButton} type="button" onClick={onClose}>СКАСУВАТИ</button>
                    <button className={styles.registerButton} type="submit">ЗАРЕЄСТРУВАТИСЯ</button>
                    {rootError && <p className={styles.error}>{rootError}</p>}
                </div>

                <p className={styles.regPiblicInfo}>При вході або реєстрації, я підтверджую згоду з умовами <span>публічного договору</span> </p>
            </form>
        </div>
    )
}