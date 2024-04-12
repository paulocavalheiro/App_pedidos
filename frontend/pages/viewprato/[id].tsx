import { useEffect, useState } from 'react'
import styles from '../../styles/Viewprato.module.css'
import {
   Box,
   Button,
   Chip,
   Divider,
   Icon,
   Stack,
   Typography,
} from '@mui/material'
import { useRouter } from 'next/router'
import { api } from '../../services/api'
import Link from 'next/link'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'
import AvTimerIcon from '@mui/icons-material/AvTimer'
import SnackBarAlert, { SnackType } from '../../mui_component/SnackBarAlert'

type GenericDataType = {
   [key: string]: any
}

type CategoriaType = {
   id: number
   nome: string
   status: boolean
   icone: JSX.Element
}

export default function ViewPratoId() {
   const [pratoView, setPratoView] = useState<GenericDataType>()
   const [snackMessage, setSnackMessage] = useState<SnackType>({
      show: false,
      msg: null,
      type: null,
   })
   const router = useRouter()
   const { id } = router.query

   useEffect(() => {
      async function getprato() {
         try {
            const response = await api.get(`api/prato/visualizar/${id}`)
            setPratoView(response.data)
         } catch (error) {
            setSnackMessage({
               show: true,
               msg: 'Erro, não foi possivel buscar os dados do prato',
               type: 'error',
            })
         }
      }
      id != null ? getprato() : ''
   }, [])

   return (
      <>
         <Box className={styles.prato_container}>
            <Box className={styles.card}>
               <Typography variant="h4">{pratoView?.nome}</Typography>
               <Box className={styles.id}>
                  <Typography variant="h6">Número #{pratoView?.id}</Typography>
               </Box>
               <Box className={styles.desc_container}>
                  <Chip
                     color="warning"
                     disabled={false}
                     variant="filled"
                     label="Descrição"
                  />
                  <Typography variant="body2" sx={{ pt: '10px' }}>
                     {pratoView?.descricao}
                  </Typography>
               </Box>
               <Box className={styles.categoria_container}>
                  <Typography variant="subtitle1">
                     <b>Categoria</b> | {pratoView?.categoria?.nome}
                  </Typography>
               </Box>
               <Box className={styles.categoria_container}>
                  <Typography variant="subtitle1">
                     <b>
                        <AttachMoneyIcon sx={{ mb: '-4px' }} fontSize="small" />
                     </b>{' '}
                     | {pratoView?.preco}
                  </Typography>
               </Box>
               <Box className={styles.categoria_container}>
                  <Typography variant="subtitle1">
                     <b>
                        <AvTimerIcon sx={{ mb: '-4px' }} fontSize="small" />
                     </b>{' '}
                     | {pratoView?.tempo_preparo} Min
                  </Typography>
               </Box>
               <Divider sx={{ width: '100%', mt: '15px', mb: '15px' }} />
               <Stack
                  direction="row"
                  divider={<Divider orientation="vertical" flexItem />}
                  spacing={2}
               >
                  <Link href="/prato_list" passHref>
                     <Button variant="contained" color="warning">
                        Voltar
                     </Button>
                  </Link>
                  <Button variant="contained" color="primary">
                     Adicionar
                  </Button>
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
