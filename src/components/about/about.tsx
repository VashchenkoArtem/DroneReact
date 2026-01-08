import { IMAGES } from "../../shared";
import styles from "./about.module.css"

export function AboutUs(){
    return (
        <div className={styles.aboutUs}>
            <div className={styles.titleBlock}>
                <div className={styles.titleInfoBlock}>
                    <h1 className={styles.titleArticle}>ПРО НАС</h1>
                    <h2 className={styles.titleText}>Ми — команда, яка об'єднана спільною метою: зробити передові технології доступними для кожного, хто потребує точності, безпеки та інновацій. З 2022 року ми спеціалізуємось на постачанні дронів і тепловізорів для професійного, цивільного та волонтерського використання.</h2>
                </div>
                <img src={IMAGES.aboutUsSkyscraper} className={styles.titleImage}/>
            </div>
            <div className={`${styles.block} ${styles.firstBlock}`}>
                <div className={styles.infoBlock}>
                    <h1 className={styles.blockTitle}>НАША МІСІЯ</h1>
                    <h2 className={styles.blockText}>Допомагати тим, хто стоїть на передовій — у прямому й переносному сенсі. Ми обираємо тільки надійну техніку, яку перевіряємо самі. Наша мета — якість, простота, і підтримка на кожному етапі: від покупки до використання.</h2>
                </div>
                <img src={IMAGES.ourMission} className={styles.blockImage}/>
            </div>
            <div className={`${styles.block} ${styles.firstBlock}`}>
                <img src={IMAGES.ourTeam} className={styles.blockImage}/>
                <div className={styles.infoBlock}>
                    <h1 className={styles.blockTitle}>КОМАНДА, ЯКІЙ МОЖНА ДОВІРЯТИ</h1>
                    <h2 className={styles.blockText}>Ми — не просто магазин. Ми — фахівці, які самі працюють із цією технікою й консультують з досвіду. Засновники проєкту — волонтери, військові та IT-спеціалісти, які об'єднали зусилля задля важливої справи.</h2>
                </div>
            </div>
        </div>
    )
}