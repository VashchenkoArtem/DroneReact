import { Link, useNavigate, useParams } from "react-router-dom";
import { useProductById, useProductsSimilar } from "../../hooks";
import { useContext, useEffect, useState } from "react";
import styles from "./one-product-page.module.css";
import { ICONS, IMAGES, IProduct } from "../../shared";
import { CartContext } from "../../context/cart-context";



export function OneProductPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { product, error, loading } = useProductById(Number(id));
    const [limitOfPosts, setLimitOfPosts] = useState<number>(4);
    const { similarProducts } = useProductsSimilar(Number(id));
    const context = useContext(CartContext);

    if (loading) return <h1>Завантаження...</h1>;
    if (error) return <h1>{error}</h1>;
    if (!product) return null;
	
	// useEffect(() => {
	// 	if (Number.isNaN(Number(id))) {
	// 		navigate("/")
	// 	}
	// }, [id, navigate])

	if (!product) {
		return null
	}

	const productInCart = {
		...product,
		count: 1
	}
	
	function addToCartFunc() {
		if (!productInCart) {
			return null
		}
		context?.addItemToCart(productInCart)
	}

    return (
        <div className={styles.productCart}>
            <img src={IMAGES.headerBG} className={styles.headerImage} alt="Header Background" />
            <div id="topMarker"></div>

            <div className={styles.droneContainer}>
                <div className={styles.droneActions}>
                    <div className={styles.droneInfoWithImage}>
                        <h1>{product.name}</h1>
                        <p className={styles.productDescription}>{product.description}</p>
                    </div>
                    <img src={product.image} className={styles.droneImage} alt={product.name} />
                </div>
                
                <div className={styles.droneInfo}>
                    <div className={styles.droneNameAndImage}>
                        <img className={styles.imageInfo} src={product.image} alt="" />
                        <div className={styles.dronePriceAndName}>
                            <p className={styles.droneDescription}>{product.name}</p>
                            <div className={styles.productPrices}>
                                {product.discount ? (
                                    <>
                                        <p className={styles.productPriceWithoutDiscount}>${product.price}</p>
                                        <p className={`${styles.productPriceWithDiscount} ${styles.productDiscount}`}>
                                            ${product.price - (product.price * product.discount) / 100}
                                        </p>
                                    </>
                                ) : (
                                    <p className={styles.productPrice}>${product.price}</p>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className={styles.buttonsDrone}>
                        <button className={styles.droneButtonOne} onClick={addToCartFunc}>
                            <ICONS.cartImage className={styles.newProductButtonArrow} />
                        </button>
                        <button className={styles.droneButton} onClick={addToCartFunc}>
                            ЗАМОВИТИ
                            <ICONS.newProductsArrow className={styles.newProductButtonArrow} />
                        </button>
                    </div>
                </div>
            </div>


            <div className={styles.blocksContainer}>
                {product.blocks?.map((block) => (
                    <div 
                        key={block.id} 
                        className={`
                            ${styles.blockWrapper} 
                            ${block.blockAlign === 'center' ? styles.centerAlign : ''} 
                            ${block.blockAlign === 'right' ? styles.reverseAlign : ''}
                        `}
                    >
                        <div className={styles.blockText}>
                            <h2>{block.title}</h2>
                            <p>{block.description}</p>
                        </div>
                        <div className={styles.blockImageWrapper}>
                            <img src={block.image} alt={block.title} />
                        </div>
                    </div>
                ))}
            </div>


            <div className={styles.similarProductContainer}>
                <h1 className={styles.similarProductTxt}>СХОЖІ ТОВАРИ</h1>
                <div className={styles.productsList}>
                    {similarProducts?.slice(0, limitOfPosts).map((item: IProduct) => {
                        return (
                            <Link to ={`/product/${product.id}`} key = {product.id} className={styles.productCard}>
                                <img src={product.image} className={styles.productImage} />
                                
                                <h2 className={styles.productTitle}>{product.name}</h2>
                                {product.discount ?
                                    <div className={styles.productPrices}>
                                        <p className={styles.productPriceWithoutDiscount}>${product.price}</p>
                                        <p className={`${styles.productPriceWithDiscount} ${styles.productDiscount}`}>${product.price - product.price * product.discount / 100}</p>
                                    </div>
                                :
                                <div className = {styles.productPrices}>
                                    <p className={styles.productPrice}>${product.price}</p>
                                </div>
                                }

                                <button className={styles.productHoverBtn}>
                                    <ICONS.productHoverCart />
                                </button>
                            </Link>)
                        })}
                </div>
                
                {similarProducts && similarProducts.length > limitOfPosts && (
                    <button
                        className={styles.CatalogButton}
                        onClick={() => setLimitOfPosts(limitOfPosts + 4)}
                    >
                        ДИВИТИСЬ ВСІ <ICONS.newProductsArrow />
                    </button>
                )}
            </div>
        </div>
    );
}