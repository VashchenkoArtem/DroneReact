import { useNavigate } from "react-router-dom" 
import { CartContext } from "../../context/cart-context" 
import { ICONS, IMAGES } from "../../shared" 
import styles from './product-in-cart.module.css'
import { useContext } from "react" 
import { IProductInCart } from "../../shared/types/product"


export function ProductInCart(props: IProductInCart) {
	const { productInCart } = props 

    const context = useContext(CartContext)
	const navigate = useNavigate()

    if (!context) return null
    
    const {incrementCount, decrementCount, removeItemFromCart} = context
    
    function incrementCountFunc() {
		incrementCount(productInCart.id)
	}

	function decrementCountFunc() {
		decrementCount(productInCart.id)
	}

    function removeFromCartFunc() {
		removeItemFromCart(productInCart.id)
	}
    
	return (
        <div className={styles.productInCart}>
            {/* <img 
                src={productInCart.image} 
                alt={productInCart.name} 
                className={styles.productImage} 
            /> */}
            <ICONS.newDroneOne className={styles.productImage} />

            <div className={styles.infoAndPrice}>
                <h3 className={styles.productName}>{productInCart.name}</h3>
                <div className={styles.priceBlock}>
                    {productInCart.discount ? (
                        <>
                            <span className={styles.oldPrice}>{productInCart.price} ₴</span>
                            <span className={styles.newPrice}>
                                {productInCart.price - productInCart.price * productInCart.discount / 100} ₴
                            </span>
                        </>
                    ) : (
                        <span className={styles.newPrice}>{productInCart.price} ₴</span>
                    )}
                </div>
            </div>

            <div className={styles.controls}>
                <button onClick={decrementCountFunc} className={styles.countBtn}>−</button>
                <span className={styles.count}>{productInCart.count}</span>
                <button onClick={incrementCountFunc} className={styles.countBtn}>+</button>

                <button onClick={removeFromCartFunc} className={styles.deleteBtn}>
                    <ICONS.cartBtn width={20} height={20} />
                </button>
            </div>
        </div>
    )
}