import styles from "@/components/layouts/PageLayout/PageLayout.module.scss"
import Header from "@/components/shared/Header/Header"

export default function PageLayout({ title, children, style }: { title: string, children: any, style?: any }) {

    return (
        <div className={styles['page-layout']} style={style}>
            <Header className={styles['page-layout__header']}>{title}</Header>
            {children}
        </div>
    )
}