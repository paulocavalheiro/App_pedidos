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
                  <Link href="/prato_list">Ver cardápio</Link>
               </li>
               <li>
                  <Link href="/prato_cadastro">Cadastrar cardápio</Link>
               </li>
               <li>
                  <Link href="/#">Pedidos</Link>
               </li>
            </ul>
         </Box>
      </>
   )
}
