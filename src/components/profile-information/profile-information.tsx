import styles from "./profile-information.module.css"

export function ProfileInformation(){
    return (
        <div className={styles.informationContainer}>
            <h1 className={styles.informationTitle}>Контактні дані</h1>
            <div className={styles.inputs}> 
                <label className={styles.inputLabel}>
                    Прізвище
                    <input type="text" className={styles.input} placeholder="Ваше прізвище"/>
                </label>
                <label className={styles.inputLabel}>
                    Ім'я
                    <input type="text" className={styles.input} placeholder="Ваше ім'я"/>
                </label>
                <label className={styles.inputLabel}>
                    По батькові
                    <input type="text" className={styles.input} placeholder="По батькові"/>
                </label>
                <label className={styles.inputLabel}>
                    Дата народження
                    <input type="date" className={styles.input}/>
                </label>
                <label className={styles.inputLabel}>
                    Телефон
                    <input type="tel" className={styles.input} placeholder="+38 0"/>
                </label>
                <label className={styles.inputLabel}>
                    E-mail
                    <input type="text" className={styles.input} placeholder="Ваш E-mail"/>
                </label>
            </div>
            <button className={styles.buttonSave}>ЗБЕРЕГТИ ЗМІНИ</button>
        </div>
    )
}