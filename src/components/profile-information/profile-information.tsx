import { useEffect } from "react"
import styles from "./profile-information.module.css"
import { useUserContext } from "../../context/user-context"
import { useForm } from "react-hook-form"
import { IUpdateUser } from "../../shared/types/user"
import { useUpdateUser } from "../../hooks/use-update-user"

export function ProfileInformation(){
    const { user } = useUserContext()
    const { updateUser } = useUpdateUser()
    
    const { handleSubmit, register, reset, formState: { errors } } = useForm<IUpdateUser>()

    useEffect(() => {
        if (user) {
            reset({
                firstName: user.firstName,
                lastName: user.lastName,
                patronymic: user.patronymic,
                birthDate: user.birthDate ? new Date(user.birthDate).toISOString().split('T')[0] : undefined,
                phoneNumber: user.phoneNumber,
                email: user.email
            });
        }
    }, [user, reset]);
    useEffect(() => {
        if (!user) {
            const fetchUserData = async () => {
                const token = localStorage.getItem('Token') || localStorage.getItem('token');
                if (!token) return;

                const cleanToken = token.replace(/^"(.*)"$/, '$1');

                try {
                    const response = await fetch('http://localhost:8000/users/me', {
                        headers: {
                            'Authorization': `Bearer ${cleanToken}`
                        }
                    });

                    if (response.ok) {
                        const userData = await response.json();
                        reset({
                            ...userData,
                            birthDate: userData.birthDate ? new Date(userData.birthDate).toISOString().split('T')[0] : undefined,
                        });
                    }
                } catch (error) {
                    console.error("Manual fetch error:", error);
                }
            };

            fetchUserData();
        }
    }, [user, reset]);

    function onSubmit(data: IUpdateUser) {
        updateUser({
            ...data,
            birthDate: data.birthDate ? new Date(data.birthDate) : undefined
        });
    }

    return (
        <form className={styles.informationContainer} onSubmit={handleSubmit(onSubmit)}>
            <h1 className={styles.informationTitle}>Контактні дані</h1>
            <div className={styles.inputs}> 
                <label className={styles.inputLabel}>
                    Прізвище
                    <input type="text" {...register("lastName")} className={styles.input} placeholder="Ваше прізвище"/>
                </label>
                <label className={styles.inputLabel}>
                    Ім'я
                    <input type="text" {...register("firstName")} className={styles.input} placeholder="Ваше ім'я"/>
                </label>
                <label className={styles.inputLabel}>
                    По батькові
                    <input type="text" {...register("patronymic")} className={styles.input} placeholder="По батькові"/>
                </label>
                <label className={styles.inputLabel}>
                    Дата народження
                    <input type="date" {...register("birthDate")} className={styles.input}/>
                </label>
                <label className={styles.inputLabel}>
                    Телефон
                    <input type="tel" {...register("phoneNumber")} className={styles.input} placeholder="Номер телефону"/>
                </label>
                <label className={styles.inputLabel}>
                    E-mail
                    <input type="text" {...register("email")} className={styles.input} placeholder="Ваш E-mail"/>
                </label>
            </div>
            <button className={styles.buttonSave}>ЗБЕРЕГТИ ЗМІНИ</button>
        </form>
    )
}