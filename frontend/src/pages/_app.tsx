import Layout from '@/components/layouts/Layout/Layout'
import '@/styles/globals.scss'
import type { AppProps } from 'next/app'
import { Heebo } from 'next/font/google'
import NextNProgress from 'nextjs-progressbar'
import { DefaultSeo } from 'next-seo'
import { GoogleAnalytics } from "nextjs-google-analytics"
import NagishLi from '@/components/shared/NagishLi'
import { MotionConfig } from "framer-motion"

const heebo = Heebo({ subsets: ['latin', 'hebrew'] });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <style jsx global>{`
        html {
          font-family: ${heebo.style.fontFamily}, sans-serif;
        }
      `}</style>

      <NagishLi />

      <DefaultSeo
        openGraph={{
          type: 'website',
          locale: 'en_IE',
          url: 'https://maase-yotser.com',
          siteName: 'Maase-Yotser',
        }}
        titleTemplate={'%s | Maase Yotser'}
        defaultTitle={'Maase Yotser Art'}
        description={'Art by maase yotser'}
      />

      <NextNProgress color="black" />

      <GoogleAnalytics trackPageViews />

      <Layout>
        <MotionConfig reducedMotion="user">
          <Component {...pageProps} />
        </MotionConfig>
      </Layout>
    </>
  )
}
