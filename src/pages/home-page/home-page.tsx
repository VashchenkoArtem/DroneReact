import { Link } from "react-router-dom";
import { ICONS, IMAGES, IProduct } from "../../shared";
import styles from "./home-page.module.css"
import { useProductsNew, useProductsPopular } from "../../hooks";
import { useEffect, useState } from "react";


export function HomePage(){
    const { newProducts } = useProductsNew()
    const [ limitOfPosts, setLimitOfPosts ] = useState<number>(4)
    const { popularProducts, fetchPopularProducts } = useProductsPopular(limitOfPosts)
    useEffect(() => {
        fetchPopularProducts()
    }, [limitOfPosts])
    return (
        <main>
            <img src={IMAGES.headerBG} className={styles.headerImage} alt="Header Background" />
            <div className={styles.droneContainer}>
                <h1>ТЕХНОЛОГІЇ</h1>
                <h1>ЯКІ ЗМІНЮЮТЬ РЕАЛЬНІСТЬ</h1>


                <div className={styles.droneActions}>
                    <ICONS.droneImage className={styles.droneImage} />

                    <div className={styles.droneInfo}>
                        <p className={styles.droneDescription}>Передові технології в одному місці. </p>
                        <p className={styles.droneDescription}>Обирай найкраще для найважливішого.</p>

                        <button className={styles.droneButton}>ДО КАТАЛОГУ</button>
                    </div>
                </div>
            </div>


            <div className={styles.aboutUsContainer}>
                <h1>ПРО НАС</h1>
                <p>Ми — команда, що об'єднує технології та надійність.</p>
                <p>Пропонуємо дрони й тепловізори, перевірені у найскладніших умовах.</p>
                <p>Обираємо тільки те, чому довіряємо самі.</p>

                <button className={styles.aboutUsButton}>ЧИТАТИ БІЛЬШЕ <ICONS.buttonArrow /></button>
            </div>

            <div className={styles.newProductsContainer}>
                <h1>НОВЕ НА САЙТІ</h1>

                <div className={styles.newProductsList}>
                    {   newProducts?.map((product: IProduct) => {
                        return (
                            <div key = {product.id} className={styles.newProductCard}>
                                <div className = {styles.droneBG}/>
                                <ICONS.droneImage className = {styles.newProductImage} />
                                <div className={styles.newProductDescription}>
                                    <h2 className={styles.newProductTitle}>{product.name}</h2>
                                    <p className={styles.newProductDescription}>{product.description}</p>
                                </div>

                                <div className={styles.newProductToBuy}>
                                    <p className={styles.newProductPrice}>from {product.price}$</p>
                                    <Link to={`/product/${product.id}`}>
                                        <button className={styles.newProductButton}>КУПИТИ 
                                            <ICONS.newProductsArrow className={styles.newProductButtonArrow} />
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>

            <div className={styles.CatalogContainer}>
                <h1>КАТАЛОГ</h1>

                <div className={styles.productsList}>
                    { popularProducts?.map((product: IProduct) => {
                        return (
                            <div key = {product.id} className={styles.productCard}>
                                <ICONS.newDroneOne className={styles.productImage} />
                                
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
                            </div>)
                        })}
                </div>

                <button
                    className={styles.CatalogButton}
                    onClick={()=>{
                        setLimitOfPosts(limitOfPosts + 4)
                    }}
                    >ДИВИТИСЬ ВСІ <ICONS.newProductsArrow /></button>
            </div>


        </main>
    )
}