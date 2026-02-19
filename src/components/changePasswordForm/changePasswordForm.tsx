import { useState } from "react";
import { Modal } from "../../shared/modal";
import styles from "../updatePasswordForm/updatePasswordForm.module.css"
import { useForm } from "react-hook-form";

export function ChangePasswordForm(){
    const [ isModalClose, setIsCloseModal ] = useState<boolean>(false)
    const [ isSuccessModalClose, setIsSuccessModalClose ] = useState<boolean>(false)
    const { handleSubmit, register, getValues, formState: {errors}} = useForm<{password: string, confirmPassword: string}>()
    return (
        <div>
            <Modal
                isOpen={isModalClose}
                onClose={ () => setIsCloseModal}
                className={styles.changePasswordForm}
                doCloseOnOutsideClick
            >
                <div className={styles.updatePasswordModal}>
                    <div className={styles.updatePasswordContainer}>
                        <h1 className={styles.updatePasswordTitle}>Відновлення пароля</h1>
                        <button
                            type="button"
                            className={styles.closeModalBtn}
                            onClick={() => setIsCloseModal(false)}
                        >✕</button>
                    </div>
                    <form noValidate className={styles.passwordForm}>
                        <label className={styles.emailLabel}>
                            Пароль
                            <input {...register("password")} className={styles.emailInput} type="password" placeholder="Введіть e-mail"/>
                        </label>
                        <label className={styles.emailLabel}>
                            Підтвердження пароля
                            <input {...register("confirmPassword")} className={styles.emailInput} type="password" placeholder="Введіть e-mail"/>
                        </label>
                        <div className = {styles.buttons}>
                            <button className={`${styles.modalButton} ${styles.white}`}>
                                СКАСУВАТИ
                            </button>
                            <button className={`${styles.modalButton} ${styles.black}`}
                                type="submit">
                                ЗБЕРЕГТИ НОВИЙ ПАРОЛЬ
                            </button>
                        </div>
                    </form>
                </div>
            </Modal>
            <Modal
                isOpen = {isSuccessModalClose}
                onClose={() => {setIsSuccessModalClose(false)}}
                className={styles.modalPostCreate}
                doCloseOnOutsideClick
            >
                <div className={styles.successPasswordModal}>
                    <div className={styles.updatePasswordContainer}>
                        <h1 className={styles.updatePasswordTitle}>Новий пароль</h1>
                        <button
                            type="button"
                            className={styles.closeModalBtn}
                            onClick={() => setIsSuccessModalClose(false)}
                        >✕</button>
                    </div>
                    <div className={styles.passwordForm}>
                        <h1 className={styles.passwordSuccessText}>Пароль успішно змінено!<br/>Тепер ви можете увійти з новим паролем.</h1>
                        <div className = {styles.buttons}>
                            <button className={`${styles.modalButton} ${styles.black}`}
                                type="submit">
                                УВІЙТИ
                            </button>
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    )   
}