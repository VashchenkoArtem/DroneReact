import { useParams } from "react-router-dom";
import { useProductById, useProductsSimilar, useScrollToStartPage } from "../../hooks";
import { useState } from "react";
import styles from "./one-product-page.module.css";
import { ICONS, IMAGES, IProduct } from "../../shared";

export function OneProductPage() {
    const { id } = useParams();
    const { product, error, loading } = useProductById(Number(id));
    const [limitOfPosts, setLimitOfPosts] = useState<number>(4);
    const { similarProducts } = useProductsSimilar(Number(id));
    
    useScrollToStartPage();

    if (loading) return <h1>Завантаження...</h1>;
    if (error) return <h1>{error}</h1>;
    if (!product) return null;

    return (
        <div className={styles.productCart}>
            <img src={IMAGES.headerBG} className={styles.headerImage} alt="Header Background" />

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
                        <button className={styles.droneButtonOne}>
                            <ICONS.cartImage className={styles.newProductButtonArrow} />
                        </button>
                        <button className={styles.droneButton}>
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
                            <div key={item.id} className={styles.productCard}>
                                <img src={item.image} className={styles.productImage} alt={item.name} />
                                <h2 className={styles.productTitle}>{item.name}</h2>
                                <div className={styles.productPrices}>
                                    {item.discount ? (
                                        <>
                                            <p className={styles.productPriceWithoutDiscount}>${item.price}</p>
                                            <p className={`${styles.productPriceWithDiscount} ${styles.productDiscount}`}>
                                                ${item.price - (item.price * item.discount) / 100}
                                            </p>
                                        </>
                                    ) : (
                                        <p className={styles.productPrice}>${item.price}</p>
                                    )}
                                </div>
                            </div>
                        );
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