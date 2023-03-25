import CollectionCard from "@/components/collections/CollectionCard/CollectionCard"
import PageLayout from "@/components/layouts/PageLayout/PageLayout"
import getClient from "@/lib/api/client"
import { ApiCollection } from "@/lib/types"
import { gql } from "@apollo/client"
import styles from "@/styles/Collections.module.scss"
import { GetStaticProps } from 'next'
import { NextSeo } from "next-seo"

export const getStaticProps: GetStaticProps = async (context) => {

    const { data } = await getClient().query({
        query:
            gql`
                query Query {
                    collections {
                        slug
                        name
                        postsCount
                        posts(take: 4) {
                            imageFile {
                                url
                                width
                                height
                            }
                            title
                            id
                        }
                    }
                }
        `
    });


    return {
        props: {
            collections: data?.collections
        },
        revalidate: 60,
    }
}

// TODO pagination or scroll pagination
export default function Collections({ collections }: { collections: ApiCollection[] }) {

    return (
        <PageLayout title={"Collections"}>
            <NextSeo
                title="Collections"
            />
            <div>
                <ul className={styles['collections-list']}>
                    {collections.map((collection, i) => {
                        return <CollectionCard data={collection} key={i} />;
                    })}
                </ul>
            </div>
        </PageLayout>
    )
}