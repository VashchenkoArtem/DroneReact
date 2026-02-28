import { Outlet } from "react-router-dom";
import { Header } from "../Header";
import styles from "./layout.module.css"
import { Footer } from "../Footer";

interface LayoutProps {
    variant?: 'default' | 'fullscreen';
}

export function Layout({variant = "default" }: LayoutProps) {
    return (
        <div className={`${styles.layout} ${styles[variant]}`}>
            <Header variant={variant} />
            <div className={styles.mainContent}>
                <Outlet />
            </div>
            <Footer variant={variant} />
        </div>
    );
}