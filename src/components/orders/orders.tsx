import { useEffect, useState } from "react";
import { useOrders } from "../../hooks/use-orders";
import { ICONS, IMAGES } from "../../shared";
import styles from "./orders.module.css";
import { IOrder, IProductOnOrder } from "../../shared/types/product";
import { useTrackingDelivery } from "../../hooks/tracking";

export function MyOrders() {
  const { orders, loading } = useOrders();
  const { trackDelivery } = useTrackingDelivery();

  // объект, где ключ = ttnNumber, значение = URL картинки
  const [images, setImages] = useState<Record<string, string>>({});

  useEffect(() => {
    async function fetchAllImages() {
      const promises = orders.map(async (order) => {
        const url = await trackDelivery(order.ttnNumber);
        return { ttnNumber: order.ttnNumber, url: url ?? "" };
      });

      const results = await Promise.all(promises);
      const newImages: Record<string, string> = {};
      results.forEach((res) => {
        newImages[res.ttnNumber] = res.url;
      });
      setImages(newImages);
    }

    if (orders.length > 0) {
      fetchAllImages();
    }
  }, [orders, trackDelivery]);

  if (loading) return <div>Завантаження замовлень...</div>;
  if (orders.length === 0) return <div>У вас ще немає замовлень.</div>;

  function getSumOrder(order: IOrder) {
    return order.products.reduce((sum, p) => sum + p.product.price * p.product.count, 0);
  }

  function getSumProduct(product: IProductOnOrder) {
    return product.product.price * product.product.count;
  }

  return (
    <div className={styles.ordersPage}>
      <h1 className={styles.ordersTitle}>Мої замовлення</h1>
      <div className={styles.ordersContainer}>
        {orders.map((order) => (
          <div key={order.id} className={styles.order}>
            <div className={styles.orderCard}>
              <div className={styles.orderInfoHeader}>
                <div>
                  <h1 className={styles.orderDescriptionTitle}>№{order.id} від 26.02.2026</h1>
                  <h1 className={styles.orderDeliveryDescription}>Оформлення</h1>
                </div>
                <div>
                  <h1 className={styles.orderDescriptionTitle}>Номер відправлення</h1>
                  <h1 className={styles.orderDeliveryDescription}>{order.ttnNumber}</h1>
                </div>
                <div>
                  <h1 className={styles.orderDescriptionTitle}>Сума замовлення</h1>
                  <h1 className={styles.orderDeliveryDescription}>{getSumOrder(order)} $</h1>
                </div>
              </div>
              <div className={styles.orderInfoHeader}>
                <img className={styles.cardIcon} src={IMAGES.droneTestIcon} alt="" />
                <ICONS.arrowOrder className={styles.cardMiniIcon}></ICONS.arrowOrder>
              </div>
            </div>

            <div className={styles.orderDeliveryInfo}>
              <h1 className={styles.orderTtnNumber}>
                Номер відправлення: <span className={styles.numberTtn}>{order.ttnNumber}</span>
              </h1>
              <div className={styles.orderDeliveryStatus}>
                {images[order.ttnNumber] ? (
                  <img
                    className={styles.orderDeliveryImage}
                    src={images[order.ttnNumber]}
                    alt="Tracking"
                  />
                ) : (
                  <p>Завантаження зображення...</p>
                )}
                <div className={styles.orderStatuses}>
                  <h1 className={`${styles.orderStatus} ${styles.activeStatus}`}>Оформлено</h1>
                  <h1 className={styles.orderStatus}>Збирається</h1>
                  <h1 className={styles.orderStatus}>У дорозі</h1>
                  <h1 className={styles.orderStatus}>Доставлено</h1>
                  <h1 className={styles.orderStatus}>Отримано</h1>
                </div>
              </div>
            </div>

            <div className={styles.orderDescription}>
              <h1 className={styles.orderDescriptionTitle}>Інформація про замовлення</h1>
              <div className={styles.orderInfo}>
                <div className={styles.orderMyInfo}>
                  <div className={styles.orderDelivery}>
                    <h1 className={styles.orderDescriptionTitle}>Адреса доставки</h1>
                    <h1 className={styles.orderDeliveryDescription}>Нова Пошта до відділення</h1>
                    <h1 className={styles.orderDeliveryDescription}>
                      Відділення №3 (до 30 кг на одне місце): вул. Слобоожанська,13
                    </h1>
                  </div>
                  <div className={styles.orderDelivery}>
                    <h1 className={styles.orderDescriptionTitle}>Отримувач</h1>
                    <h1 className={styles.orderDeliveryDescription}>{order.firstName}</h1>
                    <h1 className={styles.orderDeliveryDescription}>{order.phoneNumber}</h1>
                  </div>
                </div>

                <div className={styles.orderLine}></div>

                <div className={styles.orderInfoProduct}>
                  {order.products.map((product) => (
                    <div key={product.id} className={styles.orderInfoProductCard}>
                      <div className={styles.orderProductCardPart}>
                        <h1 className={styles.orderProductCardPartTitle}>Фото</h1>
                        <img className={styles.orderProductCardPhoto} src={product.product.image} alt="" />
                      </div>
                      <div className={styles.orderProductCardPart}>
                        <h1 className={styles.orderProductCardPartTitle}>Назва</h1>
                        <h1 className={styles.orderProductCardPartDescription}>{product.product.name}</h1>
                      </div>
                      <div className={styles.orderProductCardPart}>
                        <h1 className={styles.orderProductCardPartTitle}>Ціна</h1>
                        <h1 className={styles.orderProductCardPartDescription}>{product.product.price}</h1>
                      </div>
                      <div className={styles.orderProductCardPart}>
                        <h1 className={styles.orderProductCardPartTitle}>Кількість</h1>
                        <h1 className={styles.orderProductCardPartDescription}>{product.product.count}</h1>
                      </div>
                      <div className={styles.orderProductCardPart}>
                        <h1 className={styles.orderProductCardPartTitle}>Сума</h1>
                        <h1 className={styles.orderProductCardPartDescription}>{getSumProduct(product)} $</h1>
                      </div>
                    </div>
                  ))}

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
                      <h1 className={styles.resultInfoDescription}>{getSumOrder(order)} $</h1>
                    </div>
                    <div className={styles.resultInfoContainer}>
                      <h1 className={styles.resultInfoTitle}>Заощаджено</h1>
                      <h1 className={styles.resultInfoDescription}>0</h1>
                    </div>
                    <div className={styles.resultInfoContainer}>
                      <h1 className={styles.resultInfoTitle}>Разом</h1>
                      <h1 className={styles.orderDeliveryDescription}>{getSumOrder(order)} $</h1>
                    </div>
                  </div>

                  <button className={styles.cancelButton}>СКАСУВАТИ</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}