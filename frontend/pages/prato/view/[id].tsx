import { useEffect, useState } from 'react'
import styles from '../../../styles/Viewprato.module.css'
import {
   Box,
   Button,
   Chip,
   CircularProgress,
   Divider,
   Stack,
   Typography,
} from '@mui/material'
import Link from 'next/link'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'
import AvTimerIcon from '@mui/icons-material/AvTimer'
import SnackBarAlert, { SnackType } from '../../../mui_component/SnackBarAlert'
import { getPrato } from '../hooks/getPrato'
import { useSnackBar } from '../../../hooks/setSnackMsg'
import useAddItemPedido from '../hooks/addItemPedido'


export default function ViewPratoId() {
   const { data, statusQuery } = getPrato()
   const { status:statusAddItem, addItemPedido } = useAddItemPedido()
   const [snackMessage, setSnackMessage] = useSnackBar()
   const [loadingBtn, setLoadingBtn] = useState(false)

   const addPrato = async () => {
      await addItemPedido(data)
      setLoadingBtn(true)
      setTimeout(() => {
         setLoadingBtn(false)
      },4000)
   }
   
   useEffect(() => {
      if (statusQuery === 'error') {
         setSnackMessage({
            show: true,
            msg: 'Erro, não foi possivel buscar os dados do prato',
            type: 'error',
         })
      }
      if(statusAddItem){
         setSnackMessage({
            show: statusAddItem ? true : false,
            msg:
               statusAddItem === 'exists'
                  ? 'Item já adicionado'
                  : statusAddItem === 'success'
                  ? 'Item adicionado'
                  : '',
            type: statusAddItem === 'exists' ? 'warning' : 'success',
         })
      }      
   }, [statusQuery,statusAddItem])

   return (
      <>
         <Box className={styles.prato_container}>
            <Box className={styles.card}>
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
               <Typography variant="h4">{data?.nome}</Typography>
               <Box className={styles.id}>
                  <Typography variant="h6">Número #{data?.id}</Typography>
               </Box>
               <Box className={styles.desc_container}>
                  <Chip
                     color="warning"
                     disabled={false}
                     variant="filled"
                     label="Descrição"
                  />
                  <Typography variant="body2" sx={{ pt: '10px' }}>
                     {data?.descricao}
                  </Typography>
               </Box>
               <Box className={styles.categoria_container}>
                  <Typography variant="subtitle1">
                     <b>Categoria</b> | {data?.categoria?.nome}
                  </Typography>
               </Box>
               <Box className={styles.categoria_container}>
                  <Typography variant="subtitle1">
                     <b>
                        <AttachMoneyIcon sx={{ mb: '-4px' }} fontSize="small" />
                     </b>{' '}
                     | {data?.preco}
                  </Typography>
               </Box>
               <Box className={styles.categoria_container}>
                  <Typography variant="subtitle1">
                     <b>
                        <AvTimerIcon sx={{ mb: '-4px' }} fontSize="small" />
                     </b>{' '}
                     | {data?.tempo_preparo} Min
                  </Typography>
               </Box>
               <Divider sx={{ width: '100%', mt: '15px', mb: '15px' }} />
               <Stack
                  direction="row"
                  divider={<Divider orientation="vertical" flexItem />}
                  spacing={2}
               >
                  <Link href="../" passHref>
                     <Button variant="contained" color="error">
                        Voltar
                     </Button>
                  </Link>
                  <Button variant="contained" color="primary" onClick={addPrato} disabled={loadingBtn}>
                     {loadingBtn ? <CircularProgress color="secondary" size={'15px'} /> : ''} 
                     {loadingBtn ? 'Adicionando...' : 'Adicionar'}
                  </Button>
                  <Link href="../../pedidos" passHref>
                     <Button variant="contained" color="warning">
                        Ver Pedido
                     </Button>
                  </Link>
               </Stack>
            </Box>
         </Box>
         <SnackBarAlert
            setSnackMessage={setSnackMessage}
            params={snackMessage}
         />
      </>
   )
}


