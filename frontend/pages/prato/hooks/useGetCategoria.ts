import { useQuery } from 'react-query'
import { GenericDataType, StatusQueryProps } from '../../../services/types'
import { api } from '../../../services/api'

export const useGetCategoria = () => {
   let statusQuery: StatusQueryProps['status'] = null

   const { isLoading, data, error } = useQuery<GenericDataType>({
      queryKey: ['categoria'],
      queryFn: getCategoria,
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5,
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
         ? { data, statusQuery: (statusQuery = 'success') }
         : { data: null, statusQuery: (statusQuery = 'error') }
   } else {
      statusQuery = null
      return { data: null, statusQuery }
   }

   async function getCategoria() {
      try {
         const { data } = await api.get('api/categoria/listar')
         return data
      } catch (error) {
         return error
      }
   }
}
