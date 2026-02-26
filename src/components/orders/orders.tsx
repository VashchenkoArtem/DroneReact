import { useOrders } from "../../hooks/use-orders";
import { ICONS, IMAGES } from "../../shared";
import styles from "./orders.module.css";

export function MyOrders() {
    const { orders, loading } = useOrders();

    if (loading) return <div>Завантаження замовлень...</div>;
    if (orders.length === 0) return <div>У вас ще немає замовлень.</div>;

    return (
        <div className={styles.ordersPage}>
            <h1 className={styles.ordersTitle}>Мої замовлення</h1>
            <div className={styles.ordersContainer}>
                {orders.map((order) => (
                    <div className={styles.order}>
                        <div className={styles.orderCard}>
                            <div className={styles.orderInfoHeader}>
                                <div>
                                    <h1 className={styles.orderDescriptionTitle}>№30349 від 20.04.2023</h1>
                                    <h1 className={styles.orderDeliveryDescription}>Оформлення</h1>
                                </div>
                                <div>
                                    <h1 className={styles.orderDescriptionTitle}>Номер відправлення</h1>
                                    <h1 className={styles.orderDeliveryDescription}>{order.ttnNumber}</h1>
                                </div>
                                <div>
                                    <h1 className={styles.orderDescriptionTitle}>Сума замовлення</h1>
                                    <h1 className={styles.orderDeliveryDescription}>25 830.00</h1>
                                </div>
                            </div>
                            <div className={styles.orderInfoHeader}>
                                <img className={styles.cardIcon} src={IMAGES.droneTestIcon} alt="" />
                                <ICONS.arrowOrder className={styles.cardMiniIcon}></ICONS.arrowOrder>
                            </div>
                        </div>
                        <div className={styles.orderDescription}>
                            <h1 className={styles.orderDescriptionTitle}>Інформація про замовлення</h1>
                            <div className={styles.orderInfo}>
                                <div className={styles.orderMyInfo}>
                                    <div className={styles.orderDelivery}>
                                        <h1 className={styles.orderDescriptionTitle}>Адреса доставки</h1>
                                        <h1 className={styles.orderDeliveryDescription}>Доставка кур'єром</h1>
                                        <h1 className={styles.orderDeliveryDescription}>{order.address.city}, вулиця {order.address.street} {order.address.numberOfHouse}, {order.address.entrance} під'їзд, квартира {order.address.numberOfFlat}</h1>
                                    </div>
                                    <div className={styles.orderDelivery}>
                                        <h1 className={styles.orderDescriptionTitle}>Отримувач</h1>
                                        <h1 className={styles.orderDeliveryDescription}>{order.firstName}</h1>
                                        <h1 className={styles.orderDeliveryDescription}>{order.phoneNumber}</h1>
                                    </div>
                                </div>
                                <div className={styles.orderLine}></div>
                                <div className={styles.orderInfoProduct}>
                                    { order.products.map((product) => {
                                        return (
                                            <div key={product.id} className={styles.orderInfoProductCard}>
                                                <div className={styles.orderProductCardPart}>
                                                    <h1 className={styles.orderProductCardPartTitle}>Фото</h1>
                                                    <img className={styles.orderProductCardPhoto} src={product.product.image} alt="" />
                                                </div>
                                                <div className={styles.orderProductCardPart}>
                                                    <h1 className={styles.orderProductCardPartTitle}>Назва</h1>
                                                    <h1 className={styles.orderProductCardPartDescription}>{product.product.name}</h1>
                                                </div >
                                                <div className={styles.orderProductCardPart}>
                                                    <h1 className={styles.orderProductCardPartTitle}>Ціна</h1>
                                                    <h1 className={styles.orderProductCardPartDescription}>{product.product.price}</h1>
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
                                        )
                                    })}
                                    <div className={styles.resultInfoOrder}>
                                        <div className={styles.resultInfoContainer}>
                                            <h1 className={styles.resultInfoTitle}>Оплата</h1>
                                            <h1 className={styles.resultInfoDescription}>{order.paymentMethod}</h1>
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
                ))}
            </div>
        </div>
    );
}

function calculateTotal(products: any[]) {
    return products.reduce((sum, p) => sum + p.product.price, 0);
}