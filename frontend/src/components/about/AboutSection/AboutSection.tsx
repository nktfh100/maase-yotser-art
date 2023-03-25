import { ApiFile } from "@/lib/types"
import Image from "next/image"
import styles from "./AboutSection.module.scss"


export default function AboutSection({ name, description, rightImg, leftImg }:
    { name: string, description: string, rightImg: ApiFile, leftImg: ApiFile }) {

    return (
        <section className={styles['about']}>
            <div className={styles['about__inner-container']}>
                <div className={`${styles['about__left']} ${styles['about__left-top']}`}>
                    <p className={styles['about__name-header']}>BEHIND MAASE YOTSER</p>
                    <p className={styles['about__name']}>{name}</p>
                </div>
                <div className={`${styles['about__right']} ${styles['about__right-top']} ${styles['about__img']}`}>
                    <Image src={rightImg?.url} alt={""} fill style={{ objectFit: "cover" }} />
                </div>
            </div>
            <div className={styles['about__inner-container']}>
                <div className={`${styles['about__left']} ${styles['about__left-bottom']} ${styles['about__img']}`} >
                    <Image src={leftImg?.url} alt={""} fill style={{ objectFit: "cover" }} />
                </div>
                <div className={`${styles['about__right']} ${styles['about__right-bottom']}`}>
                    <p>{description}</p>
                </div>
            </div>
        </section>
    )
}