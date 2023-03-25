import NavItem from "@/components/nav/NavItem/NavItem"
import Link from "next/link"
import { useEffect, useState } from "react"
import styles from "./Navbar.module.scss"

export default function Navbar() {

    const [minimizeNav, setMinimizeNav] = useState(false);

    useEffect(() => {
        const update = () => {
            setMinimizeNav(document.body.scrollTop > 50 || document.documentElement.scrollTop > 50);
        }
        window.addEventListener("scroll", update);
        update();
        return () => window.removeEventListener("scroll", update);
    }, []);


    return (
        <header className={styles['navbar'] + " " + (minimizeNav ? styles['navbar--minimized'] : "")}>
            <Link href="/"><h2 className={styles['navbar__title']}>Maase Yotser</h2></Link>
            <nav className={styles['navbar__nav']}>
                <ul className={styles['navbar__nav-list']}>
                    <NavItem href="/" text="Home" />
                    <NavItem href="/collections" text="Collections" />
                    <NavItem href="/about" text="About" />
                </ul>
            </nav>
        </header>
    )
}