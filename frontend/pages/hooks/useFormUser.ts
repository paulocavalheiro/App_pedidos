import { useState } from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup'

const validationSchema = yup.object({
   nome: yup.string().required('Campo obrigatório'),
   mesa: yup.string().required('Campo obrigatório'),
   cpf: yup.number().required('Campo obrigatório').nullable(),
})

const useFormUser = () => {
   const [transaction, setTransaction] = useState<'success' | 'error' | null>(null)

   const formUser = useFormik({
      initialValues: {
         nome: '',
         mesa: '',
         cpf: '',
      },
      validationSchema: validationSchema,
      onSubmit: async (values, { resetForm }) => {
         if (values) {
            const userJSON = JSON.stringify(values)
            localStorage.setItem('user', userJSON)
            setTransaction('success')
         } else {
            setTransaction('error')
         }
      },
   })

   return { formUser, transaction }
}

export default useFormUser
