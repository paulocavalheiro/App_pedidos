import {
   Autocomplete,
   Box,
   Button,
   FormControlLabel,
   Grid,
   InputAdornment,
   Switch,
   TextField,
   Typography,
} from '@mui/material'
import { NextPage } from 'next'
import styles from './../../styles/CreatePrato.module.css'
import React, { useEffect } from 'react'
import { AccessTimeFilled } from '@mui/icons-material'
import { useSnackBar } from '../../hooks/setSnackMsg'
import SnackBarAlert from '../../mui_component/SnackBarAlert'
import styled from '@emotion/styled'
import { useGetCategoria } from './services/useGetCategoria'
import useFormPrato from './hooks/useFormPrato'

const PratoCreate: NextPage = () => {
   const [snackMessage, setSnackMessage] = useSnackBar()
   const { data: dataCategoria, statusQuery: statusQueryCategoria } = useGetCategoria()  
   const { formPrato, transaction } = useFormPrato()
   
   useEffect(() => {
      if (statusQueryCategoria === 'error') {
         setSnackMessage({
            show: true,
            msg: 'Erro, não foi possivel buscar os dados da categoria',
            type: 'error',
         })
      }
      if (transaction === 'success') {
         setSnackMessage({
            show: true,
            msg: 'Sucesso, prato cadastrado',
            type: 'success',
         })         
      }
      if (transaction === 'error') {
         setSnackMessage({
            show: true,
            msg: 'Aviso, não foi possivel cadastrar a mesa',
            type: 'error',
         })
      }
   }, [statusQueryCategoria, transaction])
   
   
   return (
      <>
         <Box className={styles.pratoContainer}>
            <form onSubmit={formPrato.handleSubmit}>
               <Grid container spacing={1}>
                  <Grid item xs={12}>
                     <Typography variant="h6" color={'#fff'}>Cadastro de Prato</Typography>
                     <WhiteBorderTextField
                        {...formPrato.getFieldProps('nome')}
                        inputProps={{ style: { color: 'white' } }}
                        label="Nome"
                        fullWidth
                        value={formPrato.values.nome}
                        onChange={formPrato.handleChange}
                        error={
                           formPrato.touched.nome &&
                           Boolean(formPrato.errors.nome)
                        }
                        helperText={
                           formPrato.touched.nome && formPrato.errors.nome
                        }
                        sx={{ mt: 2 }}
                     />
                  </Grid>
                  <Grid item xs={12}>
                     <WhiteBorderTextField
                        {...formPrato.getFieldProps('descricao')}
                        inputProps={{ style: { color: 'white' } }}
                        label="Descrição"
                        fullWidth
                        multiline
                        rows={4}
                        value={formPrato.values.descricao}
                        onChange={formPrato.handleChange}
                        error={
                           formPrato.touched.descricao &&
                           Boolean(formPrato.errors.descricao)
                        }
                        helperText={
                           formPrato.touched.descricao &&
                           formPrato.errors.descricao
                        }
                        sx={{ mt: 2 }}
                     />
                  </Grid>
                  <Grid item xs={6}>
                     <WhiteBorderTextField
                        {...formPrato.getFieldProps('preco')}
                        inputProps={{ style: { color: 'white' } }}
                        label="Preço"
                        fullWidth
                        type="number"
                        InputProps={{
                           startAdornment: (
                              <InputAdornment position="start">
                                 R$
                              </InputAdornment>
                           ),
                        }}
                        value={formPrato.values.preco}
                        onChange={formPrato.handleChange}
                        error={
                           formPrato.touched.preco &&
                           Boolean(formPrato.errors.preco)
                        }
                        helperText={
                           formPrato.touched.preco && formPrato.errors.preco
                        }
                        sx={{ mt: 2 }}
                     />
                  </Grid>
                  <Grid item xs={6}>
                     <WhiteBorderTextField
                        {...formPrato.getFieldProps('tempoPreparo')}
                        inputProps={{ style: { color: 'white' } }}
                        label="Tempo de Preparo(min)"
                        fullWidth
                        type="number"
                        InputProps={{
                           startAdornment: (
                              <InputAdornment position="start">
                                 <AccessTimeFilled />
                              </InputAdornment>
                           ),
                        }}
                        value={formPrato.values.tempoPreparo}
                        onChange={formPrato.handleChange}
                        error={
                           formPrato.touched.tempoPreparo &&
                           Boolean(formPrato.errors.tempoPreparo)
                        }
                        helperText={
                           formPrato.touched.tempoPreparo &&
                           formPrato.errors.tempoPreparo
                        }
                        sx={{ mt: 2 }}
                     />
                  </Grid>
                  <Grid item xs={6} sx={{ mt: '12px' }}>
                     <Autocomplete
                        {...formPrato.getFieldProps('categoria')}
                        disablePortal
                        id="combo-box-demo"
                        options={
                           Array.isArray(dataCategoria) ? dataCategoria : []
                        }
                        getOptionLabel={(option) => option.nome || ''}
                        isOptionEqualToValue={(option, value) =>
                           option.id === value.id
                        }
                        onChange={(e, newValue) => {
                           formPrato.setFieldValue('categoria', newValue || '')
                        }}
                        renderInput={(params) => (
                           <WhiteBorderTextField
                              {...params}
                              label="Categoria"
                              sx={{
                                 '& .MuiInputBase-input': {
                                    color: 'white',
                                 },
                              }}
                              error={
                                 formPrato.touched.categoria &&
                                 Boolean(formPrato.errors.categoria)
                              }
                              helperText={
                                 formPrato.touched.categoria &&
                                 formPrato.errors.categoria
                              }
                           />
                        )}
                     />
                  </Grid>
                  <Grid item xs={6}>
                     <FormControlLabel                        
                        control={
                           <Switch
                              color='default'
                              checked={formPrato.values.status}
                              onChange={formPrato.handleChange}
                              name="status"
                           />
                        }
                        label="Status"
                        sx={{ mt: 2 }}
                     />
                  </Grid>
                  <Grid item xs={6}>
                     <Button type="submit" variant="contained" sx={{ mt: 2 }}>
                        Cadastrar
                     </Button>
                  </Grid>
               </Grid>
            </form>
            <SnackBarAlert
               setSnackMessage={setSnackMessage}
               params={snackMessage}
            />
         </Box>
      </>
   )
}
export default PratoCreate

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
