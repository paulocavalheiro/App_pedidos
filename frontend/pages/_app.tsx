import '../styles/globals.css'
import Layout from '../Layout_component/Layout'
import type { AppProps } from 'next/app'
import NextNProgress from 'nextjs-progressbar'
import { CssBaseline } from '@mui/material'

function MyApp({ Component, pageProps }: AppProps) {
   return (
      <>
         <Layout>
            <CssBaseline />
            <NextNProgress color="#e33d33" startPosition={0.3} stopDelayMs={200} height={3} showOnShallow={true} />
            <Component {...pageProps} />
         </Layout>
      </>
   )
}

export default MyApp
