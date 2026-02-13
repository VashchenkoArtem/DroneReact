import { ICONS, IMAGES } from "../../shared"
import styles from "./orders.module.css"

export function MyOrders(){
    return (
        <div className={styles.ordersPage}>
            <h1 className={styles.ordersTitle}>Мої замовлення</h1>
            <div className={styles.ordersContainer}>
                <div className={styles.orderCard}>
                    <img className={styles.cardIcon} src={IMAGES.droneTestIcon} alt="" />
                    <ICONS.arrowOrder className={styles.cardMiniIcon}></ICONS.arrowOrder>
                </div>
                <div className={styles.orderDescription}>
                    <h1 className={styles.orderDescriptionTitle}>Інформація про замовлення</h1>
                    <div className={styles.orderInfo}>
                        <div className={styles.orderMyInfo}>
                            <div className={styles.orderDelivery}>
                                <h1 className={styles.orderDescriptionTitle}>Адреса доставки</h1>
                                <h1 className={styles.orderDeliveryDescription}>Нова пошта до відділення</h1>
                                <h1 className={styles.orderDeliveryDescription}>Дніпро, Відділення №1: вул. Маршала Малиновського, 114</h1>
                            </div>
                            <div className={styles.orderDelivery}>
                                <h1 className={styles.orderDescriptionTitle}>Отримувач</h1>
                                <h1 className={styles.orderDeliveryDescription}>Анастасія Павленко</h1>
                                <h1 className={styles.orderDeliveryDescription}>+380 12 345 78 90</h1>
                            </div>
                        </div>
                        <div className={styles.orderLine}></div>
                        <div className={styles.orderInfoProduct}>
                            <div className={styles.orderInfoProductCard}>
                                <div className={styles.orderProductCardPart}>
                                    <h1 className={styles.orderProductCardPartTitle}>Фото</h1>
                                    <img className={styles.orderProductCardPhoto} src="" alt="" />
                                </div>
                                <div className={styles.orderProductCardPart}>
                                    <h1 className={styles.orderProductCardPartTitle}>Назва</h1>
                                    <h1 className={styles.orderProductCardPartDescription}>DJI Mini 4K</h1>
                                </div >
                                <div className={styles.orderProductCardPart}>
                                    <h1 className={styles.orderProductCardPartTitle}>Ціна</h1>
                                    <h1 className={styles.orderProductCardPartDescription}>29 990</h1>
                                </div>
                                <div className={styles.orderProductCardPart}>
                                    <h1 className={styles.orderProductCardPartTitle}>Кількість</h1>
                                    <h1 className={styles.orderProductCardPartDescription}>1</h1>
                                </div>
                                <div className={styles.orderProductCardPart}>
                                    <h1 className={styles.orderProductCardPartTitle}>Сума</h1>
                                    <h1 className={styles.orderProductCardPartDescription}>29 990</h1>
                                </div>
                            </div>
                            <div className={styles.resultInfoOrder}>
                                <div className={styles.resultInfoContainer}>
                                    <h1 className={styles.resultInfoTitle}>Оплата</h1>
                                    <h1 className={styles.resultInfoDescription}>Накладений платіж</h1>
                                </div>
                                <div className={styles.resultInfoContainer}>
                                    <h1 className={styles.resultInfoTitle}>Доставка</h1>
                                    <h1 className={styles.resultInfoDescription}>За тарифами перевізника</h1>
                                </div>
                                <div className={styles.resultInfoContainer}>
                                    <h1 className={styles.resultInfoTitle}>Загальна сума</h1>
                                    <h1 className={styles.resultInfoDescription}>29 990</h1>
                                </div>
                                <div className={styles.resultInfoContainer}>
                                    <h1 className={styles.resultInfoTitle}>Заощаджено</h1>
                                    <h1 className={styles.resultInfoDescription}>0</h1>
                                </div>
                                <div className={styles.resultInfoContainer}>
                                    <h1 className={styles.resultInfoTitle}>Разом</h1>
                                    <h1 className={styles.resultInfoDescription}>29 990</h1>
                                </div>
                            </div>
                            <button className={styles.cancelButton}>
                                СКАСУВАТИ
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}