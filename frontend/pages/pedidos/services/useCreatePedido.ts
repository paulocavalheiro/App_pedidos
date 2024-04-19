import { AxiosResponse } from 'axios'
import { api } from '../../../services/api'

interface UserProps {
   nome: string
   cpf: number
   mesa: number
}

const useCreatePedido = async (children: {
   getUser: UserProps
   idsItens: [{ id: number }]
}): Promise<AxiosResponse> => {
   const postdata = {
      cpf_cliente: children?.getUser?.cpf.toString(),
      nome_cliente: children?.getUser?.nome,
      numero_mesa: children?.getUser?.mesa,
      status: 'Preparando',
      pratos: children?.idsItens,
   }
   const responseData = await api
      .post('api/pedido', {
         ...postdata,
      })
      .then(function (response) {
         return response
      })
      .catch(function (error) {
         return error
      })

   return responseData
}
export default useCreatePedido
