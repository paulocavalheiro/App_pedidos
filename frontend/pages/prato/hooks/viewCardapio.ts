import { api } from '../../../services/api'
import { GenericDataType, StatusQueryProps } from '../../../services/types'
import { useRouter } from 'next/router'
import { useQuery } from 'react-query'

/**
 * retorna visualização do prato
 * @returns {pratoView: GenericDataType, transactionApi: TransactionApiType}
 */
export const viewCardapio = (): GenericDataType => {
   let statusQuery: StatusQueryProps['status'] = null;
   const router = useRouter()
   const { id } = router.query

   const { isLoading, data, error } = useQuery<GenericDataType>({
      queryKey: ['getprato'],
      queryFn: getprato,
      refetchOnWindowFocus: false,
      enabled: !!id
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
      return data && data?.id
         ? { data, statusQuery: statusQuery = 'success' }
         : { data: null, statusQuery: statusQuery = 'error' }
   } else {
      statusQuery = null
      return { data: null, statusQuery }
   }

   async function getprato() {
      try {
         const { data } = await api.get(`api/prato/visualizar/${id}`)
         return data
      } catch (error) {
         return error   
      }
   }   
}
