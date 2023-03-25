import Navbar from "@/components/nav/Navbar/Navbar"
import Footer from "@/components/Footer/Footer"
import styles from "./Layout.module.scss"

export default function Layout({ children }: { children: any }) {

    return (
        <div className={styles['container']}>
            <Navbar />
            <main>
                {children}
            </main>
            <Footer />
        </div>
    )
}