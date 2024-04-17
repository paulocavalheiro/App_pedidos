import type { NextPage } from 'next'
import styles from '../styles/Home.module.css'
import { Box, Button, TextField, Typography, styled } from '@mui/material'

const Home: NextPage = () => {
   return (
      <>
         <Box className={styles.title_container}>
            <h1 className={styles.title}>
               Restaurante<span>App</span>
            </h1>
         </Box>
         <Box className={styles.cardapio_container}>
            <Box className={styles.card}>
               <Typography variant="h6">Crie um usúario para pedir</Typography>
               <WhiteBorderTextField
                  // {...formPrato.getFieldProps('nome')}
                  inputProps={{
                     style: { fontFamily: 'nunito', color: 'white' },
                  }}
                  label="Nome"
                  // value={formPrato.values.nome}
                  // onChange={formPrato.handleChange}
                  // error={
                  //    formPrato.touched.nome &&
                  //    Boolean(formPrato.errors.nome)
                  // }
                  // helperText={
                  //    formPrato.touched.nome && formPrato.errors.nome
                  // }
                  sx={{ mt: 2 }}
               />
               <WhiteBorderTextField
                  // {...formPrato.getFieldProps('nome')}
                  inputProps={{
                     style: { fontFamily: 'nunito', color: 'white' },
                  }}
                  label="Nº Mesa"
                  type='number'
                  // value={formPrato.values.nome}
                  // onChange={formPrato.handleChange}
                  // error={
                  //    formPrato.touched.nome &&
                  //    Boolean(formPrato.errors.nome)
                  // }
                  // helperText={
                  //    formPrato.touched.nome && formPrato.errors.nome
                  // }
                  sx={{ mt: 2 }}
               />
               <Button type="submit" variant="contained" sx={{ mt: 2 }}>
                  Registrar
               </Button>
            </Box>
         </Box>
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
`
