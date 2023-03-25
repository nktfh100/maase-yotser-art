import { ApiCollection } from "@/lib/types"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import styles from "./CollectionCard.module.scss"

export default function CollectionCard({ data }: { data: ApiCollection }) {
    return (
        <motion.li
            initial={{
                // y: 250,
                opacity: 0
            }}
            whileInView={{
                // y: 50,
                opacity: 1,
                transition: {
                    duration: 0.8
                }
            }}
            viewport={{ once: true, amount: 0.1 }}
        >
            <Link href={`/collections/${data.slug}`} className={styles['collection']}>
                <div className={styles['collection-card']}>
                    {
                        data.posts.map((post, i) => {
                            return (
                                <Image
                                    key={i}
                                    className={styles['collection-card__img']}
                                    src={post.imageFile.url}
                                    alt={""}
                                    width={post.imageFile.width}
                                    height={post.imageFile.height}
                                    sizes={`${styles.imageWidth}`}
                                />
                            )
                        })
                    }
                </div>
                <p className={styles['collection__name']}>{data.name}</p>
            </Link>
        </motion.li >
    )
}