import styles from "./Header.module.scss"


export default function Header({ type = "h1", extraProps = {}, className = "", children }:
    { type?: "h1" | "h2", extraProps?: any, className?: string, children: any }) {

    const props = {
        className: styles['header'] + " " + className
    }

    if (type == "h1") {
        return (
            <h1 {...props} {...extraProps}>{children}</h1>
        )
    }

    return (
        <h2 {...props} {...extraProps}>{children}</h2>
    )
}