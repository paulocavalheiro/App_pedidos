import type { NextPage } from 'next'
import styles from '../../styles/Cardapio.module.css'
import Card from '../../Layout_component/Card'
import { useEffect } from 'react'
import { Box, Button, CircularProgress, Typography } from '@mui/material'
import SnackBarAlert from '../../mui_component/SnackBarAlert'
import { useSnackBar } from '../../hooks/setSnackMsg'
import { useGetCardapio } from './services/useGetCardapio'
import Link from 'next/link'

const PratoList: NextPage = () => {
   const { data, statusQuery } = useGetCardapio()
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
                  <Card key={index}  >
                     <p className={styles.idCard}>#{item.id}</p>
                     <h3 className={styles.textCard}>{item.nome}</h3>
                     <h3 className={styles.textCard}>R${item.preco}</h3>
                     <Link href={`prato/view/${item.id}`}>
                        <Button variant="contained" color="error">
                           Visualizar
                        </Button>
                     </Link>
                  </Card>
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
