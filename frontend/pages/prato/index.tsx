import type { NextPage } from 'next'
import styles from '../../styles/Cardapio.module.css'
import Card from '../../Layout_component/Card'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { Box } from '@mui/material'
import { api } from '../../services/api'
import SnackBarAlert, { SnackType } from '../../mui_component/SnackBarAlert'
import { getCardapio } from './hooks/getCardapio'
import { useSnackBar } from '../../hooks/setSnackMsg'


const PratoList: NextPage = () => {
   const { cardapio,  transactionApi } = getCardapio()
   const [snackMessage, setSnackMessage] = useSnackBar()

   useEffect(() => {
      if (transactionApi.error === true) {
         setSnackMessage({
            show: transactionApi.error,
            msg: transactionApi.msg,
            type: 'error',
         })
      }
   }, [transactionApi])

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
