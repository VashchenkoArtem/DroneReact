import { useContext } from "react"
import styles from "./profile-information.module.css"
import { useUserContext } from "../../context/user-context"
import { useForm } from "react-hook-form"
import { IUpdateUser } from "../../shared/types/user"
import { useUpdateUser } from "../../hooks/use-update-user"

export function ProfileInformation(){
    const { user } = useUserContext()
    const { updateUser } = useUpdateUser()
    const { handleSubmit, register, formState: { errors } } = useForm<IUpdateUser>({
        defaultValues: {
            firstName: user?.firstName,
            lastName: user?.lastName,
            patronymic: user?.patronymic,
            birthDate: user?.birthDate,
            phoneNumber: user?.phoneNumber,
            email: user?.email
        }
    })

    function onSubmit(data: IUpdateUser) {
        console.log(data.email)
        updateUser({
            ...data,
            birthDate: data.birthDate
                ? new Date(data.birthDate)
                : undefined
        })
    }

    return (
        <form className={styles.informationContainer} onSubmit={handleSubmit(onSubmit)}>
            <h1 className={styles.informationTitle}>Контактні дані</h1>
            <div className={styles.inputs}> 
                <label className={styles.inputLabel}>
                    Прізвище
                    <input type="text" {...register("lastName")} className={styles.input} defaultValue={user?.lastName} placeholder="Ваше прізвище"/>
                </label>
                <label className={styles.inputLabel}>
                    Ім'я
                    <input type="text" {...register("firstName")} className={styles.input} defaultValue={user?.firstName}  placeholder="Ваше ім'я"/>
                </label>
                <label className={styles.inputLabel}>
                    По батькові
                    <input type="text" {...register("patronymic")} className={styles.input} defaultValue={user?.patronymic} placeholder="По батькові"/>
                </label>
                <label className={styles.inputLabel}>
                    Дата народження
                    <input type="date" {...register("birthDate")} className={styles.input}/>
                </label>
                <label className={styles.inputLabel}>
                    Телефон
                    <input type="tel" {...register("phoneNumber")} className={styles.input} defaultValue={user?.phoneNumber} placeholder="+38 0"/>
                </label>
                <label className={styles.inputLabel}>
                    E-mail
                    <input type="text" {...register("email")} className={styles.input} placeholder="Ваш E-mail" defaultValue={user?.email}/>
                </label>
            </div>
            <button className={styles.buttonSave}>ЗБЕРЕГТИ ЗМІНИ</button>
        </form>
    )
}