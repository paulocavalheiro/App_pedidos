import type { NextPage } from 'next'
import styles from '../styles/Cardapio.module.css'
import Card from '../Layout_conponent/Card'
import { useEffect, useState } from 'react'
import { Box } from '@mui/material'
import { api } from '../services/api'
import SnackBarAlert, { SnackType } from '../mui_component/SnackBarAlert'

type GenericDataType = {
   [key: string]: any
}

const PratoList: NextPage = () => {
   const [cardapio, setCardapio] = useState<GenericDataType>()
   const [snackMessage, setSnackMessage] = useState<SnackType>({
      show: false,
      msg: null,
      type: null,
   })

   useEffect(() => {
      async function getCardapio() {
         try {
            const response = await api.get('api/prato/listar')
            setCardapio(response.data)
         } catch (error) {
            setSnackMessage({
               show: true,
               msg: 'Erro, não foi possivel buscar os dados do cardápio',
               type: 'error',
            })
         }
      }
      getCardapio()
   }, [])

   return (
      <>
         <Box className={styles.title_container}>
            <h1 className={styles.title}>
               Cardapio<span>App</span>
            </h1>
         </Box>
         <Box className={styles.cardapio_container}>
            {cardapio &&
               cardapio.map((item: any, index: number) => (
                  <Card key={index} prato={item} />
               ))}
         </Box>
         <SnackBarAlert
            setSnackMessage={setSnackMessage}
            params={snackMessage}
         />
      </>
   )
}
export default PratoList
