import { useForm } from "react-hook-form";
import { Modal } from "../../shared/modal";
import { useState } from "react";
import styles from "./updatePasswordForm.module.css"
import { useSendToEmail } from "../../hooks/use-send-email";

export interface UpdatePasswordForm{
    email: string
}
export function UpdatePasswordForm(props: {isUpdatePasswordFormOpen: boolean; setIsUpdatePasswordFormOpen: () => void}){
    const { handleSubmit, register, getValues, formState: {errors}} = useForm<UpdatePasswordForm>()
    const { isUpdatePasswordFormOpen, setIsUpdatePasswordFormOpen} = props
    const { sendUrlToEmail } = useSendToEmail()
    function onSubmit(content: UpdatePasswordForm){
        sendUrlToEmail(content)
    }
    return (
        <Modal
            isOpen = {isUpdatePasswordFormOpen}
            onClose = { setIsUpdatePasswordFormOpen}
            className = {styles.modalPostCreate}
            doCloseOnOutsideClick
        >
            <div className={styles.updatePasswordModal}>
                <div className={styles.updatePasswordContainer}>
                    <h1 className={styles.updatePasswordTitle}>Відновлення пароля</h1>
                    <button
                        type="button"
                        className={styles.closeModalBtn}
                        onClick={() => setIsUpdatePasswordFormOpen}
                    >✕</button>
                </div>
                <form onSubmit={handleSubmit(onSubmit)} noValidate className={styles.passwordForm}>
                    <label className={styles.emailLabel}>
                        E-mail
                        <input {...register("email")} className={styles.emailInput} type="email" placeholder="Введіть e-mail"/>
                    </label>
                    <div className = {styles.buttons}>
                        <button className={`${styles.modalButton} ${styles.white}`}>
                            СКАСУВАТИ
                        </button>
                        <button className={`${styles.modalButton} ${styles.black}`}
                            type="submit">
                            НАДІСЛАТИ ЛИСТ
                        </button>
                    </div>
                </form>
            </div>
        </Modal>
    )
}