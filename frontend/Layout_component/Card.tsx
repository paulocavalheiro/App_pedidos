import { Box, Button } from '@mui/material'
import styles from '../styles/Card.module.css'
import Link from 'next/link'
import React, { ReactNode } from 'react'

export interface Prato {
   id: number
   nome: string
   descricao: string
   categoria: string
   preco: number
   tempoPreparo: number
}

export default function Card({children}:{children: ReactNode} ) {
   return (
      <>
         <Box className={styles.card}>
            {children}
         </Box>
      </>
   )
}
