import { useNavigate, useParams } from "react-router-dom";
import { useProductById, useProductsSimilar } from "../../hooks";
import { useEffect, useState } from "react";
import styles from "./one-product-page.module.css";
import { ICONS, IMAGES, IProduct } from "../../shared";



export function OneProductPage(){
    const { id } = useParams()
    const { product, error, loading } = useProductById(Number(id))
    const { similarProducts } = useProductsSimilar(Number(id))
    if (!product) return null
    if (error || !product){
		return (
			<h1>{error}</h1>
		)
	}

    return (
        <div className={styles.productCart}>
            <img src={IMAGES.headerBG} className={styles.headerImage} alt="Header Background" />

            <div className={styles.droneContainer}>
                <div className={styles.droneActions}>
                    <div className={styles.droneInfoWithImage}>
                        <h1>{product.name}</h1>
                        <p className = {styles.productDescription}>{product.description}</p>
                    </div>
                    <img src = {product.image} className={styles.droneImage} />
                </div>
                <div className={styles.droneInfo}>
                    <div className={styles.droneNameAndImage}>
                        <img className={styles.imageInfo} src = {product.image} alt="" />
                        <div className={styles.dronePriceAndName}>
                            <p className={styles.droneDescription}>{product.name}</p>
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

                        </div>
                    </div>

  


                    <div className={styles.buttonsDrone}>
                        <button className={styles.droneButtonOne}> 
                            <ICONS.cartImage className={styles.newProductButtonArrow} />
                        </button>


                        <button className={styles.droneButton}>ЗАМОВИТИ 
                            <ICONS.newProductsArrow className={styles.newProductButtonArrow} />
                        </button>
                    </div>

                </div>
            </div>

            <div  className={styles.similarProductContainer}>
                <h1 className={styles.similarProductTxt}>СХОЖІ ТОВАРИ</h1>
                <div className={styles.productsList}>
                    { similarProducts?.map((product: IProduct) => {
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
        </div>
        
    )
}