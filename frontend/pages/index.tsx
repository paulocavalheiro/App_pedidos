import type { NextPage } from 'next'
import styles from '../styles/Home.module.css'
import {
   Box,
   Button,
   CircularProgress,
   TextField,
   Typography,
   styled,
} from '@mui/material'
import { useSnackBar } from '../hooks/setSnackMsg'
import SnackBarAlert from '../mui_component/SnackBarAlert'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import useFormUser from './hooks/useFormUser'

const Home: NextPage = () => {
   const [snackMessage, setSnackMessage] = useSnackBar()
   const { formUser, transaction } = useFormUser()
   const [loading, setLoading] = useState<boolean>(false)
   const router = useRouter()

   /**
    * usuario e mesa e cadastrado em um local storage para depois 
    * ser usado no cadastro do pedido
    */
   useEffect(() => {
      if (transaction === 'success') {
         setSnackMessage({
            show: true,
            msg: 'Mesa registrada',
            type: 'success',
         })
         setLoading(true)
         setTimeout(() => {
            router.push('/prato')
         }, 1000)
      }
      if (transaction === 'error') {
         setSnackMessage({
            show: true,
            msg: 'Aviso, não foi possivel cadastrar a mesa',
            type: 'error',
         })
      }
   }, [transaction])

   return (
      <>
         <Box className={styles.title_container}>
            <h1 className={styles.title}>
               Usúario<span>App</span>
            </h1>
         </Box>
         <Box className={styles.cardapio_container}>
            {loading ? (
               <Box className={'statusQuery'}>
                  <CircularProgress color="secondary" />
                  <Typography variant="h6" sx={{ pl: '10px' }}>
                     Carregando... pedido
                  </Typography>
               </Box>
            ) : (
               <form onSubmit={formUser.handleSubmit} className={styles.card}>
                  <Typography variant="h6">
                     Crie um usúario para pedir
                  </Typography>
                  <WhiteBorderTextField
                     {...formUser.getFieldProps('nome')}
                     label="Nome"
                     inputProps={{ style: { color: 'white' } }}
                     value={formUser.values.nome}
                     onChange={formUser.handleChange}
                     error={
                        formUser.touched.nome && Boolean(formUser.errors.nome)
                     }
                     helperText={formUser.touched.nome && formUser.errors.nome}
                     sx={{ mt: 2 }}
                  />
                  <WhiteBorderTextField
                     {...formUser.getFieldProps('mesa')}
                     label="Nº Mesa"
                     inputProps={{ style: { color: 'white' } }}
                     type="number"
                     value={formUser.values.mesa}
                     onChange={formUser.handleChange}
                     error={
                        formUser.touched.mesa && Boolean(formUser.errors.mesa)
                     }
                     helperText={formUser.touched.mesa && formUser.errors.mesa}
                     sx={{ mt: 2 }}
                  />
                  <WhiteBorderTextField
                     {...formUser.getFieldProps('cpf')}
                     label="Cpf"
                     inputProps={{ style: { color: 'white' } }}
                     type="number"
                     value={formUser.values.cpf}
                     onChange={formUser.handleChange}
                     error={
                        formUser.touched.cpf && Boolean(formUser.errors.cpf)
                     }
                     helperText={formUser.touched.cpf && formUser.errors.cpf}
                     sx={{ mt: 2 }}
                  />
                  <Button
                     type="submit"
                     variant="contained"
                     color="error"
                     sx={{ mt: 2 }}
                  >
                     Registrar
                  </Button>
               </form>
            )}
         </Box>
         <SnackBarAlert
            setSnackMessage={setSnackMessage}
            params={snackMessage}
         />
      </>
   )
}

export default Home

const WhiteBorderTextField = styled(TextField)`
   & label {
      color: white;
   }
   & .MuiOutlinedInput-root {
      & fieldset {
         border-color: white;
      }
   }
   & .MuiOutlinedInput-root {
      &.Mui-focused fieldset {
         border-color: 'primary.main';
      }
   }
`
