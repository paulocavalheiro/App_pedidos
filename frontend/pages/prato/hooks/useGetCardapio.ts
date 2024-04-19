import { GenericDataType, StatusQueryProps } from '../../../services/types'
import { api } from '../../../services/api'
import { useQuery } from 'react-query'

/**
 * retorna lista de pratos
 * @returns {cardapio: GenericDataType, transactionApi: TransactionApiType}
 */
export const useGetCardapio = (): GenericDataType => {
   let statusQuery: StatusQueryProps['status'] = null;

   const { isLoading, data, error } = useQuery<GenericDataType>({
      queryKey: ['cardapio'],
      queryFn: getCardapio,
      refetchOnWindowFocus: false,
   })
   
   if (isLoading) {
      statusQuery = 'loading'
      return { data: null, statusQuery }
   }

   if (error) {
      statusQuery = 'error'
      return { data: null, statusQuery }
   }

   if (data) {
      return data && data.length > 0
         ? { data, statusQuery: statusQuery = 'success' }
         : { data: null, statusQuery: statusQuery = 'error' }
   } else {
      statusQuery = null
      return { data: null, statusQuery }
   }
   async function getCardapio() {
      try {
         const { data } = await api.get('api/prato/listar')
         return data
      } catch (error) {
         return error
      }
   }
}
