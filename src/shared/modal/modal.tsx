import { IModalProps } from "./modal.types";
import styles from "./modal.module.css";
import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

export function Modal(props: IModalProps) {
    const { isOpen, onClose, children, className, doCloseOnOutsideClick, container } = props

    const modalRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
	    if (!doCloseOnOutsideClick) return

        function clickOutside(event: MouseEvent) {
            const target = event.target as Node

            if (modalRef.current && !modalRef.current.contains(target)) {
                onClose()
            }
        }
        document.addEventListener("mousedown", clickOutside)

        return () => {
            document.removeEventListener("mousedown", clickOutside)
        }
    }, [doCloseOnOutsideClick, onClose])

    if (!isOpen) return null

    return createPortal(
        <div className={styles.overlay}>
            <div className={`${className} ${styles.modal}`} ref={modalRef}>
                {children}
            </div>
        </div>,
        container ?? document.body
    )


}


