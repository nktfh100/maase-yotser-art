import NextJsImage from "@/components/shared/PhotosAlbum/NextJsImage/NextJsImage"
import PostModal from "@/components/shared/PhotosAlbum/PostModal/PostModal"
import { ApiPost } from "@/lib/types"
import { useRouter } from "next/router"
import { PhotoAlbum } from "react-photo-album"

export default function PhotosAlbum({ posts, albumProps = {}, containerProps = {} }:
    { posts: ApiPost[], width?: string, albumProps?: any, containerProps?: any }) {

    const router = useRouter();

    return (
        <div {...containerProps}>
            <PhotoAlbum
                layout="rows"
                spacing={20}
                targetRowHeight={500}
                photos={posts.filter((post) => post && post.imageFile).map((post) => {
                    return { src: post.imageFile.url, width: post.imageFile.width, height: post.imageFile.height, id: post.id }
                })}
                renderPhoto={NextJsImage}
                onClick={(ev) => {
                    router.query.post = (ev.photo as any).id;
                    router.push(router, undefined, { shallow: true });
                }}
                {...albumProps}
            />
            <PostModal posts={posts} />
        </div>
    )
}