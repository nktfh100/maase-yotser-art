import Link from "next/link"
import { useRouter } from "next/router"
import styles from "./NavItem.module.scss"


export default function NavItem({ text, href }: { text: string, href: string }) {

    const router = useRouter();

    const isActive = router.pathname == href;

    return (
        <li className={`${styles['nav-item']} ${isActive ? styles['nav-item--active'] : ""}`}>
            <Link href={href}>{text}</Link>
        </li>
    )
}