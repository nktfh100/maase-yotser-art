import AboutSection from "@/components/about/AboutSection/AboutSection"
import ContactSection from "@/components/about/ContactSection/ContactSection"
import PageLayout from "@/components/layouts/PageLayout/PageLayout"
import getClient from "@/lib/api/client"
import { ApiAboutPage } from "@/lib/types"
import { gql } from "@apollo/client"
import { GetStaticProps } from "next"
import { NextSeo } from "next-seo"


export const getStaticProps: GetStaticProps = async (context) => {
    const { data } = await getClient().query({
        query:
            gql`
                query AboutPage {
                    aboutPage {
                        header
                        aboutName
                        aboutDescription
                        aboutImageRight {
                            width
                            height
                            url
                        }
                        aboutImageLeft {
                            width
                            height
                            url
                        }
                    }
                }
        `
    });

    return {
        props: {
            data: data?.aboutPage
        },
        revalidate: 60,
    }
}

export default function AboutPage({ data }: { data: ApiAboutPage }) {

    return (
        <PageLayout title={data.header}>
            <NextSeo
                title="About"
            />
            <AboutSection name={data.aboutName} description={data.aboutDescription} rightImg={data.aboutImageRight} leftImg={data.aboutImageLeft} />
            <ContactSection />
        </PageLayout>)
}