import { useState } from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup'
import usePostPrato from '../services/usePostPrato'

const validationSchema = yup.object({
   nome: yup.string().required('Campo obrigatório'),
   descricao: yup.string().required('Campo obrigatório'),
   preco: yup
      .number()
      .required('Campo obrigatório')
      .positive('Tempo de preparo deve ser maior que zero')
      .nullable(),
   tempoPreparo: yup
      .number()
      .required('Campo obrigatório')
      .positive('Tempo de preparo deve ser maior que zero')
      .nullable(),
})
const userFormPrato =  () => {
   const [transaction, setTransaction] = useState<'success' | 'error' | null>(
      null
   )
   const createPrato = usePostPrato

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
      onSubmit: async (values, { resetForm }) => {
         if (values) {
            if (values.categoria == '') {
               formPrato.setFieldError('categoria', 'Campo obrigatório')
               return false
            }
            const responsePost = await createPrato(values)
            responsePost.status === 201 ? resetForm() : ''
            setTransaction(responsePost.status === 201 ? 'success' : 'error')
            
         }
      },
   })
   return { formPrato, transaction }
}

export default userFormPrato
