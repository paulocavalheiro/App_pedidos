import type { NextPage } from 'next'
import styles from '../../styles/Cardapio.module.css'
import Card from '../../Layout_component/Card'
import { useEffect } from 'react'
import { Box, CircularProgress, Typography } from '@mui/material'
import SnackBarAlert from '../../mui_component/SnackBarAlert'
import { getCardapio } from './hooks/getCardapio'
import { useSnackBar } from '../../hooks/setSnackMsg'

const PratoList: NextPage = () => {
   const { data, statusQuery } = getCardapio()
   const [snackMessage, setSnackMessage] = useSnackBar()
   
   useEffect(() => {
      if (statusQuery === 'error') {
         setSnackMessage({
            show: true,
            msg: 'Erro, não foi possivel buscar os dados do cardápio',
            type: 'error',
         })
      }
   }, [statusQuery])

   return (
      <>
         <Box className={styles.title_container}>
            <h1 className={styles.title}>
               Cardapio<span>App</span>
            </h1>
         </Box>
         <Box className={styles.cardapio_container}>
            <Box
               className={'statusQuery'}
               sx={{
                  visibility: statusQuery === 'loading' ? 'visible' : 'hidden',
               }}
            >
               <CircularProgress color="secondary" />
               <Typography variant="h6" sx={{ pl: '10px' }}>
                  Carregando...
               </Typography>
            </Box>
            {data &&
               data.length > 0 &&
               statusQuery === 'success' &&
               data.map((item: any, index: number) => (
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
