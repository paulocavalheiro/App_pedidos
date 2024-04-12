import Navbar from './Navbar'
import Footer from './Footer'

import Head from 'next/head'
import React from 'react'
import { Container } from '@mui/material'
import { blue, red } from '@mui/material/colors'

export default function Layout({ children }: any) {
   return (
      <>
         <Head>
            <link rel="shortcut icon" href="/images/favicon.ico" />
            <title>RestauranteApp</title>
         </Head>
         <Navbar />
         <Container maxWidth="lg">
            <main className="main-container">{children}</main>
         </Container>
         <Footer />
      </>
   )
}
