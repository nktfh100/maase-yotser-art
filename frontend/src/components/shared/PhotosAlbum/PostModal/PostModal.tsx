import { useRouter } from "next/router"
import { useEffect, useReducer } from "react"
import styles from "./PostModal.module.scss"
import Modal from 'react-modal'
import { ApiPost } from "@/lib/types";
import Image from "next/image";

Modal.setAppElement("#__next");

// Todo: A better way to make this component:
// Instead of passing list of posts, get the post data from the server
export default function PostModal({ posts }: { posts: ApiPost[] }) {
    const router = useRouter();

    const { post } = router.query;

    const [activePostId, setActivePostId] = useReducer((state: any, action: any) => {
        if (action) {
            router.query.post = action;
        } else {
            delete router.query.post;
        }
        router.push(router, undefined, { shallow: true });
        return action;
    }, "");


    useEffect(() => {
        if (post) {
            setActivePostId(post);
        }
    }, [post])

    const activePostData = posts.find((post) => {
        if (post.id == activePostId) {
            return true;
        }
    });

    if (!activePostData && activePostId) {
        setActivePostId(null);
    }

    return (
        <Modal
            isOpen={!!activePostId}
            onRequestClose={() => { setActivePostId(null); }}
            style={{}}
            contentLabel="Image Modal"
            className={styles['post-modal']}
            overlayClassName={styles['post-modal-overlay']}
        >
            {
                activePostData &&
                <>
                    <div aria-label="Close modal" className={styles['post-modal__close']} onClick={() => setActivePostId(null)}></div>
                    <h1 className={styles['post-modal__title']}>{activePostData.title}</h1>
                    <Image
                        unoptimized
                        className={styles['post-modal__img']}
                        src={activePostData.imageFile.url}
                        alt={activePostData.title}
                        width={activePostData.imageFile.width}
                        height={activePostData.imageFile.height}
                    />
                </>
            }

        </Modal>
    )
}