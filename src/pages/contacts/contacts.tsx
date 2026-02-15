import { ICONS } from "../../shared"
import styles from "./contacts.module.css"

const NumberIcon = ICONS.numberIcon
const EmailIcon = ICONS.emailIcon
const PlaceIcon = ICONS.placeIcon
const TimelabelIcon = ICONS.timelabelIcon
const FacebookIcon = ICONS.facebookIcon
const InstagramIcon = ICONS.instagramIcon
const TelegramIcon = ICONS.telegramIcon

export function ContactsPage(){
    return (
        <div className={styles.pageWrapper}>
            <div className={styles.wrapper}>
                <h1 className={styles.title}>КОНТАКТИ</h1>

                <div className={styles.container}>

                    <div className={styles.contactsBlock}>
                        <h2 className={styles.subtitle}>Наші контакти</h2>
                        <div className={styles.contactsItems}>
                            <div className={styles.contactItem}>
                                <NumberIcon className={styles.icon}/>
                                <h3 className={styles.contactText}>+38 (067) 123-45-67</h3>
                            </div>
                            <div className={styles.contactItem}>
                                <EmailIcon className={styles.icon}/>
                                <h3 className={styles.contactText}>info@dronex.com.ua</h3>
                            </div>
                            <div className={styles.contactItem}>
                                <PlaceIcon className={styles.icon}/>
                                <h3 className={styles.contactText}>вул. Університетська, 22, м. Дніпро, 49000, Україна</h3>
                            </div>
                            <div className={styles.contactItem}>
                                <TimelabelIcon className={styles.icon}/>
                                <h3 className={styles.contactText}>Пн–Пт: 10:00 — 18:00, Сб–Нд: вихідні</h3>
                            </div>
                        </div>
                        <div className={styles.socialBlock}>
                            <h3 className={styles.socialTitle}>Ми в соцмережах:</h3>
                            <div className={styles.socialIcons}>
                                <FacebookIcon className={styles.socialIcon}/>
                                <TelegramIcon className={styles.socialIcon}/>
                                <InstagramIcon className={styles.socialIcon}/>
                            </div>
                        </div>
                    </div>

                    <div className={styles.formBlock}>
                        <h2 className={styles.subtitle}>Зв'язатися з нами</h2>

                        <div className={styles.formGroup}>
                            <label className={styles.label}>
                                Ім'я
                                <input 
                                    type="text" 
                                    placeholder="Ваше ім'я"
                                    className={styles.input}
                                />
                            </label>
                            <label className={styles.label}>
                                Телефон
                                <input 
                                    type="tel" 
                                    placeholder="+38 0"
                                    defaultValue={"+38 0"}
                                    className={styles.input}
                                />
                            </label>
                            <label className={styles.label}>
                                E-mail
                                <input 
                                    type="text" 
                                    placeholder="Ваше E-mail"
                                    className={styles.input}
                                />
                            </label>

                            <label className={styles.label}>
                                Повідомлення
                                <textarea 
                                    placeholder="Ваше повідомлення"
                                    className={styles.textarea}
                                />
                            </label>
                        </div>

                        <button className={styles.button}>
                            НАДІСЛАТИ
                        </button>
                    </div>

                </div>
            </div>
        </div>
    )
}
