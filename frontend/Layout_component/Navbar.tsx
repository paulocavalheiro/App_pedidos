import Link from 'next/link'
import styles from '../styles/Navbar.module.css'
import Image from 'next/image'
import React from 'react'
import logo from '../public/img/logo.png'
import { Box, Typography } from '@mui/material'

export default function Navbar() {
   return (
      <>
         <Box className={styles.navbar}>
            <Box className={styles.logo}>
               <Image src={logo} width="70" height="70" alt="Logo" />
               <Typography variant="h4">Rimberio Kitchen</Typography>
            </Box>
            <ul className={styles.link_items}>
               <li>
                  <Link href="/">Início</Link>
               </li>
               <li>
                  <Link href="/prato/">Ver cardápio</Link>
               </li>
               
               <li>
                  <Link href="/pedidos/listPedidos">Meu Pedidos</Link>
               </li>
               <li>
                  |
               </li>
               <li>                  
                  <Link href="/prato/create">
                     Cadastrar cardápio
                  </Link>
               </li>
            </ul>
         </Box>
      </>
   )
}
