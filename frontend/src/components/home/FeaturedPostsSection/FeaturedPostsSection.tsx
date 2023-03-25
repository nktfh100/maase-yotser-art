import Header from "@/components/shared/Header/Header"
import { ApiPost } from "@/lib/types"
import styles from "./FeaturedPostsSection.module.scss"
import PhotosAlbum from "@/components/shared/PhotosAlbum/PhotosAlbum"

export default function FeaturedPostsSection({ posts }: { posts: ApiPost[] }) {

    return (
        <section className={styles['featured']}>
            <Header type="h2" className={styles['featured__header']}>Featured</Header>
            <PhotosAlbum posts={posts} width="60vw" albumProps={{ targetRowHeight: 400 }} containerProps={{ className: styles['featured__album'] }} />
        </section>
    );
}