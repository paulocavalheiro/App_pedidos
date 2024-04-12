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
   const [users, setUsers] = useState([])
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
      onSubmit: (values) => {
         console.log(values)
      },
   })

   async function getCategoria() {
      try {
         const response = await api.get('api/categoria/listar')
         console.log(response)
         // setPratoView(response.data)
      } catch (error) {
         // setSnackMessage({
         //    show: true,
         //    msg: 'Erro, não foi possivel buscar os dados do prato',
         //    type: 'error',
         // })
      }
   }

   const top100Films = [
      { title: 'The Shawshank Redemption', year: 1994 },
      { title: 'The Godfather', year: 1972 },
      { title: 'The Godfather: Part II', year: 1974 },
      { title: 'The Dark Knight', year: 2008 },
      { title: '12 Angry Men', year: 1957 },
      { title: "Schindler's List", year: 1993 },
      { title: 'Pulp Fiction', year: 1994 },
      {
         title: 'The Lord of the Rings: The Return of the King',
         year: 2003,
      },
   ]

   const options = top100Films.map((option) => {
      const firstLetter = option.title[0].toUpperCase()
      return {
         firstLetter: /[0-9]/.test(firstLetter) ? '0-9' : firstLetter,
         ...option,
      }
   })

   useEffect(() => {
      // async function getCategoria() {
      //    try {
      //       const response = await api.get('api/categoria/listar')
      //       console.log(response)
      //       // setPratoView(response.data)
      //    } catch (error) {
      //       // setSnackMessage({
      //       //    show: true,
      //       //    msg: 'Erro, não foi possivel buscar os dados do prato',
      //       //    type: 'error',
      //       // })
      //    }
      // }
      // getCategoria()
   }, [])

   // function getRegionsBr() {
   //    const regions = [`<>
   //       ${ key: 1, id: 1, nome: 'AC', sigla: 'AC' },
   //       ${ key: 2, id: 2, nome: 'AL', sigla: 'AL' },
   //       </>`]
   //    return regions
   // }

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

                  <Grid item xs={12}>
                     {/* <Autocomplete
                        {...formPrato.getFieldProps('categoria')}
                        sx={{ mt: '24px' }}
                        disablePortal
                        id="ac_uf"
                        fullWidth
                        size="small"
                        options={getRegionsBr()}
                        isOptionEqualToValue={(option, sigla) =>
                           option.id === sigla.id
                        }
                        onChange={(e, newValue) => {
                           formPrato.setFieldValue('categoria', newValue || '')
                        }}
                        renderInput={(params) => (
                           <TextField {...params} label={'Caegotri'} />
                        )}
                     /> */}
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
         </Box>
      </>
   )
}
export default PratoCreate
