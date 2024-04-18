import {
   Box,
   Button,
   CircularProgress,
   Divider,
   Stack,
   Typography,
} from '@mui/material'
import { NextPage } from 'next'
import styles from '../../styles/pedidos/MeuPedido.module.css'
import { Key, useEffect, useState } from 'react'
import useGetPRatosPedido from './hooks/useGetPratosPedido'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'
import AvTimerIcon from '@mui/icons-material/AvTimer'
import CategoryIcon from '@mui/icons-material/Category'
import { useRouter } from 'next/router'

const Pedidos: NextPage = () => {
   const { data: dataPedido, statusQuery } = useGetPRatosPedido()
   const [loading, setLoading] = useState<boolean>(false)
   const router = useRouter()

   const cancelar = () => {
      console.log('cancelar')
      setLoading(true)
      setTimeout(() => {
         setLoading(false)
         localStorage.clear()
         router.push('/')
      }, 2000)
   }

   return (
      <Box className={styles.pedidoContainer}>
         <Box className={styles.card}>
            <Typography variant="h5">Meu Pedido</Typography>
            <Divider sx={{ width: '100%', pt: '10px', pb: '10px' }} />
            {loading ? (
               <Box className={'statusQuery'} sx={{ pt: '10px' }}>
                  <CircularProgress color="secondary" />
                  <Typography variant="h6" sx={{ pl: '10px' }}>
                     Cancelando...
                  </Typography>
               </Box>
            ) : (
               <Box className={styles.itensPedido}>
                  {dataPedido &&
                     dataPedido?.map((item: any) => (
                        <Box key={item.id}>
                           <Box className={styles.id}>
                              <Typography variant="body1">
                                 Número : {item?.id}
                              </Typography>
                           </Box>
                           <Box>
                              <Typography variant="body1">
                                 {item?.nome}{' '}
                              </Typography>
                           </Box>
                           <Box>
                              <Typography variant="body2">
                                 <CategoryIcon
                                    sx={{ mb: '-4px' }}
                                    fontSize="small"
                                 />{' '}
                                 {item?.categoria?.nome}{' '}
                              </Typography>
                           </Box>
                           <Box>
                              <Typography variant="body1">
                                 <AttachMoneyIcon
                                    sx={{ mb: '-4px' }}
                                    fontSize="small"
                                 />{' '}
                                 {item?.preco}
                              </Typography>
                           </Box>
                           <Box>
                              <Typography variant="body1">
                                 <AvTimerIcon
                                    sx={{ mb: '-4px' }}
                                    fontSize="small"
                                 />{' '}
                                 {item?.tempo_preparo} Min
                              </Typography>
                           </Box>
                           <Divider sx={{ pt: '10px' }} />
                        </Box>
                     ))}
                  <Stack direction="row" spacing={2} sx={{ pt: '28px' }}>
                     <Button
                        variant="contained"
                        color="error"
                        onClick={cancelar}
                     >
                        Cancelar
                     </Button>
                     <Button variant="contained" color="primary">
                        Pedir
                     </Button>
                  </Stack>
               </Box>
            )}
         </Box>
      </Box>
   )
}
export default Pedidos
