import { useNavigate, useParams } from "react-router-dom";
import { useProducts, useScrollToStartPage } from "../../hooks";
import { useEffect, useState } from "react";
import styles from "./catalog-page.module.css";
import { ICONS, IMAGES, IProduct } from "../../shared";
import { useProductsToPage } from "../../hooks/use-products-to-page";
import { off } from "process";
import { useCategories } from "../../hooks/use-categories";

export function CatalogPage() {
    const [offset, setOffset] = useState<number>(0)
    const [currentPage, setCurrentPage] = useState<number>(1)
    const { categories } = useCategories()
    const { allProducts } = useProducts()
    const { products, error, loading, fetchProductsToPage } = useProductsToPage()
    const { scrollToTop } = useScrollToStartPage()
    useEffect(() => {
        fetchProductsToPage(offset)
    }, [offset])
    if (error || !products || !allProducts) {
        return <h1>{error}</h1>
    }

    const pages = Math.ceil(allProducts.length / 8)

    const firstPage = () => {
        setCurrentPage(1)
        setOffset(0)
    }

    const lastPage = () => {
        setCurrentPage(pages)
        setOffset((pages - 1) * 8)
    }

    const goToPage = (page: number) => {
        setCurrentPage(page)
        setOffset((page - 1) * 8)
    }

    const pageNumbers = Array.from({ length: pages }, (_, i) => i + 1)
    return (
        <div className={styles.productCart}>
            <h1 className={styles.catalogTxt}>КАТАЛОГ</h1>

            <div className={styles.categoryContainer}>
                <button>Всі</button>
                { categories?.map((category)=>{
                    return (
                        <button key = {category.id} className={styles.droneBtnCategory} onClick={() => fetchProductsToPage(offset, category.id)}>
                            <img src={category.image} className={styles.droneImgCategory} alt="" />
                        </button>
                    )
                })}


            </div>

            <div className={styles.newProductsList}>
                {products.map((product: IProduct) => {return(
                    <div key={product.id} className={styles.productCard}>
                        <ICONS.newDroneOne className={styles.productImage} />

                        <h2 className={styles.productTitle}>{product.name}</h2>

                        {product.discount ? (
                            <div className={styles.productPrices}>
                                <p className={styles.productPriceWithoutDiscount}>
                                    ${product.price}
                                </p>
                                <p
                                    className={`${styles.productPriceWithDiscount} ${styles.productDiscount}`}
                                >
                                    $
                                    {product.price -
                                        (product.price * product.discount) /
                                            100}
                                </p>
                            </div>
                        ) : (
                            <div className={styles.productPrices}>
                                <p className={styles.productPrice}>
                                    ${product.price}
                                </p>
                            </div>
                        )}
                    </div>
                )})}
            </div>

            <div className={styles.pagination}>
                <button className={styles.arrowPageButton}
                    onClick={firstPage}
                    disabled={currentPage === 1}
                >
                    <ICONS.previousPage className={styles.arrowPage}/>
                </button>

                {pageNumbers.map((page) => (
                    <button
                        key={page}
                        onClick={() => {
                            scrollToTop()
                            goToPage(page)
                        }}
                        className={`${styles.buttonToPage} ${                     
                            page === currentPage
                                ? styles.activePage
                                : styles.pageButton
                            }`

                        }
                    >
                        {page}
                    </button>
                ))}

                <button className={styles.arrowPageButton}
                    onClick={lastPage}
                    disabled={currentPage === pages}
                >
                    <ICONS.nextPage className={styles.arrowPage}/>
                </button>
            </div>
        </div>
    )
}
