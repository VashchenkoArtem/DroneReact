import styles from "./undefined.module.css"

export function PageUndefined(){
    return (
        <div className={styles.undefinedBody}>
            <h1 className={styles.undefinedText}>Сторінка <br /> не знайдена</h1>
        </div>
    )
}