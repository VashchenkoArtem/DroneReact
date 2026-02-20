import { useOrders } from "../../hooks/use-orders";
import styles from "./orders.module.css";

export function MyOrders() {
    const { orders, loading } = useOrders();

    if (loading) return <div>Завантаження замовлень...</div>;
    if (orders.length === 0) return <div>У вас ще немає замовлень.</div>;

    return (
        <div className={styles.ordersContainer}>
            <h1 className={styles.mainTitle}>МОЇ ЗАМОВЛЕННЯ</h1>
            
            {orders.map((order) => (
                <div key={order.id} className={styles.orderCard}>
                    <div className={styles.orderHeader}>
                        <div className={styles.orderMainInfo}>
                            <span className={styles.orderId}>№{order.id} від 20.04.2023</span>
                            <span className={styles.orderStatus}>Оформлено</span>
                        </div>
                        <div className={styles.orderTotal}>
                            Сума замовлення: <strong>{calculateTotal(order.products)} ₴</strong>
                        </div>
                    </div>

                    <div className={styles.progressSection}>
                        <div className={styles.progressLine}>
                            <div className={`${styles.point} ${styles.active}`}>Оформлено</div>
                            <div className={styles.point}>Збирається</div>
                            <div className={styles.point}>У дорозі</div>
                            <div className={styles.point}>Доставлено</div>
                        </div>
                    </div>

                    <div className={styles.orderContent}>
                        <div className={styles.deliveryInfo}>
                            <h3>Адреса доставки</h3>
                            <p>{order.cityName}</p>
                            <p>{order.firstName} {order.patronymic}</p>
                            <p>{order.phoneNumber}</p>
                        </div>
                        <button className={styles.cancelBtn}>СКАСУВАТИ</button>
                    </div>
                </div>
            ))}
        </div>
    );
}

function calculateTotal(products: any[]) {
    return products.reduce((sum, p) => sum + p.product.price, 0);
}