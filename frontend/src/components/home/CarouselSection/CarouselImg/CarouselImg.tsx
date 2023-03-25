import styles from "./CarouselImg.module.scss"
import { ApiFile } from "@/lib/types"
import Image from "next/image"

export default function CarouselImg({ data }: { data: ApiFile }) {

    if (!data) {
        return null;
    }

    return (
        <div>
            <Image
                className={styles['img']}
                src={data.url}
                alt={""}
                width={data.width}
                height={data.height}
                sizes="(max-width: 900px) 95vw, 60vw"
            />
        </div>
    )
}