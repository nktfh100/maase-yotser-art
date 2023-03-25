import styles from "./Footer.module.scss"

export default function Footer() {

    return (
        <footer className={styles['footer']}>
            <div className={styles['footer__content']}>
                <p>© {new Date().getFullYear()} Maase Yotser</p>
                <p>Website by nktfh100</p>
            </div>
        </footer>
    )
}