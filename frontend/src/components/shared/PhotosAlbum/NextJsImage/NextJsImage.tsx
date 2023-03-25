import Image from "next/image"
import type { RenderPhotoProps } from "react-photo-album"
import styles from "./NextJsImage.module.scss"
import { motion } from "framer-motion"

export default function NextJsImage({
    imageProps: { src, alt, title, sizes, className, onClick },
    wrapperStyle,
}: RenderPhotoProps) {
    return (
        <div className={styles['image']} style={wrapperStyle}>
            <motion.div
                initial={{
                    opacity: 0
                }}
                whileInView={{
                    opacity: 1,
                    transition: {
                        duration: 0.8
                    }
                }}
                viewport={{ once: true, amount: 0.2 }}

                className={styles['image__inner']}
                style={{ position: "relative", width: "100%", height: "100%" }}
            >
                <Image
                    fill
                    src={src}
                    alt={alt}
                    title={title}
                    sizes={sizes}
                    className={className}
                    onClick={onClick}
                    quality={60}
                />
            </motion.div>
        </div>
    );
}
