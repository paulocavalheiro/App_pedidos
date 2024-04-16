import { api } from '../../../services/api'
import { GenericDataType } from '../../../services/types'

const postPrato = async (children: GenericDataType): Promise<any> => {
   const postdata = {
      nome: children?.nome,
      descricao: children?.descricao,
      preco: children?.preco,
      tempo_preparo: children?.tempoPreparo,
      status: children?.status,
      categoria: { nome: children?.categoria?.nome },
   }
   const responseData = await api
      .post('api/prato', {
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
export default postPrato
