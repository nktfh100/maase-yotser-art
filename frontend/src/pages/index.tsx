import PageLayout from '@/components/layouts/PageLayout/PageLayout'
import CarouselSection from '@/components/home/CarouselSection/CarouselSection'
import { GetStaticProps } from 'next'
import getClient from '@/lib/api/client'
import { gql } from '@apollo/client'
import { ApiHomePage } from '@/lib/types'
import FeaturedPosts from '@/components/home/FeaturedPostsSection/FeaturedPostsSection'
import { NextSeo } from 'next-seo'

export const getStaticProps: GetStaticProps = async (context) => {
  const { data } = await getClient().query({
    query:
      gql`
        query HomePage {
          homePage {
            header
            featuredPosts {
              id
              title
              imageFile {
                url
                height
                width
              }
            }
            carouselImage1 {
              width
              height
              url
            }
            carouselImage2 {
              width
              height
              url
            }
            carouselImage3 {
              url
              height
              width
            }
            carouselImage4 {
              url
              width
              height
            }
          }
        }
      `
  });

  return {
    props: {
      data: data?.homePage
    },
    revalidate: 60,
  }
}

export default function Home({ data }: { data: ApiHomePage }) {
  return (
    <PageLayout title={data.header}>
      <NextSeo
        title="Home Page"
      />
      <CarouselSection images={[data.carouselImage1, data.carouselImage2, data.carouselImage3, data.carouselImage4]} />
      <FeaturedPosts posts={data.featuredPosts} />
    </PageLayout>
  )
}
