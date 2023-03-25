import PageLayout from "@/components/layouts/PageLayout/PageLayout"
import { GetStaticProps, GetStaticPaths } from 'next'
import getClient from "@/lib/api/client"
import { gql } from "@apollo/client"
import { ApiCollection } from "@/lib/types"
import PhotosAlbum from "@/components/shared/PhotosAlbum/PhotosAlbum"
import { NextSeo } from "next-seo"

export const getStaticPaths: GetStaticPaths = async () => {
    const { data } = await getClient().query({
        query:
            gql`
                query Query {
                    collections {
                        slug
                    }
                }   
        `
    });

    const paths = data.collections.map((ele: { slug: string }) => {
        return { params: { slug: ele.slug } }
    })

    return {
        paths: paths,
        fallback: "blocking",
    }
}

export const getStaticProps: GetStaticProps = async (context) => {

    if (!context.params || !context.params.slug) {
        return {
            notFound: true,
        }
    }

    const data = await getClient().query({
        query: gql`
                query Collection($where: CollectionWhereInput!) {
                    collections(where: $where) {
                        name
                        postsCount
                        slug
                        posts {
                            id
                            title
                            imageFile {
                                width
                                height
                                url
                            }
                        }
                    }
                }   
        `,
        variables: {
            "where": {
                "slug": {
                    "equals": context.params.slug
                }
            }
        }
    });

    if (data.data.collections.length == 0) {
        return {
            notFound: true,
        }
    }

    return {
        props: {
            data: data.data.collections[0]
        },
        revalidate: 60,
    }
}

// TODO pagination or scroll pagination
export default function CollectionPage({ data }: { data: ApiCollection }) {

    return (
        <PageLayout title={data.name}>
            <NextSeo
                title={"Collection - " + data.name}
            />
            <PhotosAlbum posts={data.posts} containerProps={{ style: { width: "80vw" } }} />
        </PageLayout>
    )
}