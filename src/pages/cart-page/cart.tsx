import styles from "./cart.module.css" 
import { useContext } from "react" 
import { CartContext } from "../../context/cart-context" 
import { ProductInCart } from "../../components/product-in-cart/product-in-cart" 
import { CartPageProps } from "./cart.types"
import { Link, useNavigate } from "react-router-dom"
import { useOrderContext } from "../../context/order-context"

export function CartPage({ onClose }: CartPageProps) {
    const cartContext = useContext(CartContext)
    const { addProduct } = useOrderContext();
    const navigate = useNavigate()
    if (!cartContext) return null

    const {items, getTotalPrice, removeAll, getTotalPriceAfterDiscount} = cartContext

    return (
        <div className= {styles.cartContainer}>
            <div className={styles.formUpperActions}>
                <p className={styles.authLink}>Кошик</p>

                <button
                    type="button"
                    className={styles.closeModalBtn}
                    onClick={onClose}
                >✕</button>
            </div>

            <div className={styles.cartProductList}>
                <div className = {styles.listOfProducts}>
                    {items.length === 0 ? (
                        <div className={styles.emptyCart}>
                            <p>Ваш кошик порожній.</p>
                            <p>Почніть вибирати товари, щоб вони з’явилися тут</p>
                        </div>
                    ) : (
                        items.map((product) => (
                            <ProductInCart key={product.id} productInCart={product}/>
                        ))
                    )}
                </div>
            </div>

            <div className={styles.cartFooter}>
                {/* <h2 className = {styles.cartTotalPrice}>Total price: {getTotalPrice()}</h2>

                <button onClick={removeAll}>Delete All</button>

                <button onClick={() => {}}>Checkout</button>
                <button>Buy all</button> */}


                {items.length === 0 ? (
                    <button onClick={() => {}} className={styles.continueShoppingBtn}>
                        <Link to="/catalog">ПРОДОВЖИТИ ПОКУПКИ</Link>
                    </button>
                        ) : (
                        <div className={styles.cartFooterPriceAndActions}>
                            <div className={styles.cartRow}>
                                <span>Загальна сума</span>
                                <span className={styles.totalPrice}>{getTotalPrice()} ₴</span>
                            </div>
                            <div className={styles.cartRow}>
                                <span>Заощаджено</span>
                                <span className={styles.discountPrice}>- {Math.round(getTotalPrice() - getTotalPriceAfterDiscount())} ₴</span>
                            </div>
                            <div className={styles.cartRow}>
                                <span>Зі знижкою</span>
                                <span className={styles.finalPrice}>{Math.round(getTotalPriceAfterDiscount())} ₴</span>
                            </div>
                        </div>
                    )}
            </div>

            {items.length !== 0 ? (
                <div className={styles.cartSecondFooter}>
                    <button onClick={() => {}} className={styles.toCartBtn}>
                        <Link to="/cart">ПЕРЕЙТИ ДО КОШИКА</Link>
                    </button>

                <button onClick={() => {}} className={styles.orderBtn}>
                    <p onClick={() => {
                        items.forEach(item => {
                            addProduct(item);
                        });
                        navigate('/checkoutOrder')
                    }}>ОФОРМИТИ ЗАМОВЛЕННЯ</p>
                </button>
            </div>
            ) : null}
        </div>
    )
}