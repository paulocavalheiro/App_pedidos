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
import styles from './../../styles/Prato_list.module.css'
import { useFormik } from 'formik'
import React, { useEffect, useState } from 'react'
import * as yup from 'yup'
import { AccessTimeFilled } from '@mui/icons-material'
import { api } from '../../services/api'
import { getCategoria } from './hooks/getCategoria'
import { useSnackBar } from '../../hooks/setSnackMsg'
import SnackBarAlert from '../../mui_component/SnackBarAlert'
import postPrato from './hooks/postPrato'

const validationSchema = yup.object({
   nome: yup.string().required('Campo obrigatório'),
   descricao: yup.string().required('Campo obrigatório'),
   preco: yup.number().required('Campo obrigatório'),
   tempoPreparo: yup
      .number()
      .required('Campo obrigatório')
      .positive('Tempo de preparo deve ser maior que zero')
      .nullable(),
})

const PratoCreate: NextPage = () => {
   const { data: dataCategoria, statusQuery: statusQueryCategoria } = getCategoria()  
   const createPrato = postPrato 
   const [snackMessage, setSnackMessage] = useSnackBar()
   
   useEffect(() => {
      if (statusQueryCategoria === 'error') {
         setSnackMessage({
            show: true,
            msg: 'Erro, não foi possivel buscar os dados da categoria',
            type: 'error',
         })
      }
   }, [statusQueryCategoria])

   const formPrato = useFormik({
      initialValues: {
         nome: '',
         categoria: '',
         descricao: '',
         preco: '',
         tempoPreparo: '',
         status: true,
      },
      validationSchema: validationSchema,
      onSubmit: async (values) => {
         if(values){
            const responsePost = await createPrato(values)
            setSnackMessage({
               show: responsePost.status === 201,
               msg: 'Sucesso, prato cadastrado',
               type: 'success',
            })
            setSnackMessage({
               show: responsePost.response.status === 400,
               msg: "Erro, não foi possivel cadastrar o prato",
               type: 'error',
            })
         }        
      },
   })

   return (
      <>
         <Box className={styles.prato_container}>
            <form onSubmit={formPrato.handleSubmit}>
               <Grid container spacing={1}>
                  <Grid item xs={12}>
                     <Typography variant="h6">Cadastro de Prato</Typography>
                     <TextField
                        name="nome"
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
                     <TextField
                        name="descricao"
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
                     <TextField
                        name="preco"
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
                     <TextField
                        name="tempoPreparo"
                        label="Tempo de Preparo"
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
                           <TextField {...params} label="Categoria" />
                        )}
                     />
                  </Grid>
                  <Grid item xs={6}>
                     <FormControlLabel
                        control={
                           <Switch
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
