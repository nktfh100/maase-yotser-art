import styles from "./CarouselSection.module.scss"
import "react-responsive-carousel/lib/styles/carousel.min.css"
import { Carousel } from "react-responsive-carousel"
import { ApiFile } from "@/lib/types"
import CarouselImg from "./CarouselImg/CarouselImg"


export default function CarouselSection({ images }: { images: ApiFile[] }) {

    return (
        <Carousel
            className={styles['carousel']}
            autoPlay={true}
            infiniteLoop={true}
            showStatus={false}
            showThumbs={false}
            stopOnHover={true}
            interval={4000}
            dynamicHeight={true}
        >
            {
                images.filter((ele) => !!ele).map((img, i) => {
                    return <CarouselImg key={i} data={img} />
                })
            }
        </Carousel>
    )
}