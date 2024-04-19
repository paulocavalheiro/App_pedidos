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
import { useEffect, useState } from 'react'
import useGetPRatosPedido from './hooks/useGetPratosPedido'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'
import AvTimerIcon from '@mui/icons-material/AvTimer'
import CategoryIcon from '@mui/icons-material/Category'
import { useSnackBar } from '../../hooks/setSnackMsg'
import SnackBarAlert from '../../mui_component/SnackBarAlert'
import Link from 'next/link'
import useGetUser from '../prato/hooks/getUser'
import useCancelPedido from './hooks/useCancelPedido'
import usePostPedido from './hooks/usePostPedido'

const Pedidos: NextPage = () => {
   const [statuspedido, setStatuspedido] = useState<boolean | null>(null)
   const { data: dataPedido, statusQuery } = useGetPRatosPedido()
   const [snackMessage, setSnackMessage] = useSnackBar()
   const getUser = useGetUser()
   const { postPedido, statusPost } = usePostPedido()
   const { loading, cancelPedido } = useCancelPedido()

   useEffect(() => {
      if (statusQuery === 'error') {
         setSnackMessage({
            show: true,
            msg: 'Erro, não foi possivel buscar os dados do pedido',
            type: 'error',
         })
      }

      if (statusPost) {
         setSnackMessage({
            show: true,
            msg:
               statusPost?.status !== 201
                  ? 'Erro, não foi possivel registrar o pedido'
                  : 'Pedido registrado',
            type: statusPost?.status !== 201 ? 'error' : 'success',
         })
         setStatuspedido(statusPost?.status !== 201 ? false : true)
         statusPost?.status !== 201 ? localStorage.clear() : ''
      }
   }, [statusQuery, statusPost])

   const salvar = async () => {
      await postPedido({ dataPedido })
   }

   return (
      <Box className={styles.pedidoContainer}>
         <Box className={styles.card}>
            <Typography variant="h5">Meu Pedido</Typography>
            <Typography variant="body1">
               {getUser?.nome} #{getUser?.mesa}{' '}
            </Typography>
            <Divider sx={{ width: '100%', pt: '10px', pb: '10px' }} />
            {loading ? (
               <Box className={'statusQuery'} sx={{ pt: '10px' }}>
                  <CircularProgress color="secondary" />
                  <Typography variant="h6" sx={{ pl: '10px' }}>
                     Cancelando...
                  </Typography>
               </Box>
            ) : (
               <>
                  {statuspedido !== null ? (
                     <Box sx={{ pt: '24px' }}>
                        Status sobre seu pedido :{' '}
                        {statuspedido === true
                           ? 'Tudo certo seu pedido foi confirmado'
                           : 'Ouve um erro ao processar seu pedido'}
                     </Box>
                  ) : (
                     <Box className={styles.itensPedido}>
                        {dataPedido &&
                           dataPedido?.map((item: any) => (
                              <>
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
                              </>
                           ))}
                        {dataPedido && (
                           <Stack
                              direction="row"
                              spacing={2}
                              sx={{ pt: '28px' }}
                           >
                              <Button
                                 variant="contained"
                                 color="error"
                                 onClick={cancelPedido}
                              >
                                 Cancelar
                              </Button>
                              <Link href="/prato" passHref>
                                 <Button variant="contained" color="warning">
                                    Cardapio
                                 </Button>
                              </Link>
                              <Button
                                 variant="contained"
                                 color="primary"
                                 onClick={salvar}
                              >
                                 Pedir
                              </Button>
                           </Stack>
                        )}
                     </Box>
                  )}
               </>
            )}
            {!dataPedido && (
               <Box
                  sx={{
                     pt: '10px',
                     display: 'flex',
                     flexDirection: 'column',
                     alignItems: 'center',
                  }}
               >
                  <Typography variant="h6">Pedido sem itens</Typography>
                  <Link href="/prato" passHref>
                     <Button variant="contained" color="error">
                        Cardapio
                     </Button>
                  </Link>
               </Box>
            )}
         </Box>
         <SnackBarAlert
            setSnackMessage={setSnackMessage}
            params={snackMessage}
         />
      </Box>
   )
}
export default Pedidos
