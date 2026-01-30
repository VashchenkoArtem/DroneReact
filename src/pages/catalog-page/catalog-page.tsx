import { useNavigate, useParams } from "react-router-dom";
import { useProducts } from "../../hooks";
import { useEffect, useState } from "react";
import styles from "./catalog-page.module.css";
import { ICONS, IMAGES, IProduct } from "../../shared";

export function CatalogPage(){
    const { products, error, loading } = useProducts()
    // const navigate = useNavigate()

    if (error || !products){
		return (
			<h1>{error}</h1>
		)
	}

    return (
        <div className={styles.productCart}>
            <h1 className={styles.catalogTxt}>КАТАЛОГ</h1>

            <div className={styles.categoryContainer}>
                <button>Всі</button>

                <button>
                    <img src={IMAGES.droneBtnCategory} className = {styles.droneBtnCategory} />
                </button>

                <button>
                    <img src={IMAGES.binocularBtnCategory} className = {styles.binocularBtnCategory} />
                </button>
            </div>

            <div className={styles.newProductsList}>
                { products?.map((product: IProduct) => {
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

        </div>
    )
}