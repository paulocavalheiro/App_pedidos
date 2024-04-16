import { Box, Button } from '@mui/material'
import styles from '../styles/Card.module.css'
import Link from 'next/link'
import React from 'react'

export interface Prato {
   id: number
   nome: string
   descricao: string
   categoria: string
   preco: number
   tempoPreparo: number
}

export default function Card({ prato }: { prato: Prato }) {
   return (
      <>
         <Box className={styles.card}>
            <p className={styles.id}>#{prato.id}</p>
            <h3 className={styles.title}>{prato.nome}</h3>
            <h3 className={styles.title}>R${prato.preco}</h3>
            <Link href={`prato/view/${prato.id}`}>
               <Button variant="contained" color="error">
                  Visualizar
               </Button>
            </Link>
         </Box>
      </>
   )
}
