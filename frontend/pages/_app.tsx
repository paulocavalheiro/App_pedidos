import '../styles/globals.css'
import Layout from '../Layout_component/Layout'
import type { AppProps } from 'next/app'
import NextNProgress from 'nextjs-progressbar'
import { CssBaseline } from '@mui/material'
import { QueryClient, QueryClientProvider } from 'react-query'

function MyApp({ Component, pageProps }: AppProps) {
   const queryClient = new QueryClient()

   return (
      <>
         <Layout>
            <CssBaseline />
            <NextNProgress color="#e33d33" startPosition={0.3} stopDelayMs={200} height={3} showOnShallow={true} />
            <QueryClientProvider client={queryClient}>
               <Component {...pageProps} />
            </QueryClientProvider>
         </Layout>
      </>
   )
}

export default MyApp
