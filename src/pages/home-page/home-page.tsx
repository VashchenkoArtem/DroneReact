import { Link } from "react-router-dom";
import { ICONS, IMAGES, IProduct } from "../../shared";
import styles from "./home-page.module.css"

// export interface ProductProps {
// 	product: IProduct;
// }

export function HomePage(){
    // const { product } = props;


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
                    <div className={styles.newProductCard}>
                        <ICONS.newDroneOne className={styles.newProductImage} />
                        
                        {/* <img src={IMAGES.droneBG} className={styles.newProductBG} /> */}

                        <div className={styles.newProductDescription}>
                            <h2 className={styles.newProductTitle}>DJI Mini 4K</h2>
                            <p className={styles.newProductDescription}>Easy-To-Use Mini Camera Drone</p>
                        </div>

                        <div className={styles.newProductToBuy}>
                            <p className={styles.newProductPrice}>from $299</p>
                            <button className={styles.newProductButton} >КУПИТИ <ICONS.newProductsArrow className={styles.newProductButtonArrow} /></button>

                            {/* <button className={styles.newProductMore}>
                                <Link to={`/product/${product.id}`}>Читати далі</Link>
                            </button> */}

                        </div>
                    </div>

                    <div className={styles.newProductCard}>
                        <ICONS.newDroneTwo className={styles.newProductImage} />

                        <div className={styles.newProductDescription}>
                            <h2 className={styles.newProductTitle}>DJI Mini 4Pro</h2>
                            <p className={styles.newProductDescription}>Easy-To-Use Mini Camera Drone</p>
                        </div>

                        <div className={styles.newProductToBuy}>
                            <p className={styles.newProductPrice}>from $299</p>
                            <button className={styles.newProductButton}>КУПИТИ <ICONS.newProductsArrow /></button>
                        </div>
                    </div>

                    <div className={styles.newProductCard}>
                        <ICONS.newDroneOne className={styles.newProductImage} />
                        
                        <div className={styles.newProductDescription}>
                            <h2 className={styles.newProductTitle}>DJI Mini 4K</h2>
                            <p className={styles.newProductDescription}>Easy-To-Use Mini Camera Drone</p>
                        </div>

                        <div className={styles.newProductToBuy}>
                            <p className={styles.newProductPrice}>from $299</p>
                            <button className={styles.newProductButton}>КУПИТИ <ICONS.newProductsArrow /></button>
                        </div>
                    </div>
                </div>
            </div>

            <div className={styles.CatalogContainer}>
                <h1>КАТАЛОГ</h1>

                <div className={styles.productsList}>
                    <div className={styles.productCard}>
                        <ICONS.newDroneOne className={styles.productImage} />
                        
                        <h2 className={styles.productTitle}>DJI Mini 4K</h2>
                        <p className={styles.newProductPrice}>from $299</p>
                    </div>

                    <div className={styles.productCard}>
                        <ICONS.newDroneTwo className={styles.productImage} />

                        <h2 className={styles.productTitle}>DJI Mini 4Pro</h2>
                        <p className={styles.newProductPrice}>from $299</p>
                    </div>

                    <div className={styles.productCard}>
                        <ICONS.newDroneThree className={styles.productImage} />
                        
                        <h2 className={styles.productTitle}>DJI Mini 4K</h2>
                        <p className={styles.productPrice}>from $299</p>
                    </div>

                    <div className={styles.productCard}>
                        <ICONS.newDroneOne className={styles.productImage} />
                        
                        <h2 className={styles.productTitle}>DJI Mini 4K</h2>
                        <p className={styles.productPrice}>from $299</p>
                    </div>
                </div>

                <button className={styles.CatalogButton}>ДИВИТИСЬ ВСІ <ICONS.newProductsArrow /></button>
            </div>


        </main>
    )
}