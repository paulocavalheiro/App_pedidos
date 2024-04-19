import { useQuery } from "react-query";
import { api } from "../../../services/api";
import { GenericDataType, StatusQueryProps } from "../../../services/types";

const useGetPedido = () => {
   let statusQuery: StatusQueryProps['status'] = null;   

   const { isLoading, data, error } = useQuery<GenericDataType>({
      queryKey: ['getPedido'],
      queryFn: getPedido,
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
   async function getPedido() {
      const userStorage = localStorage.getItem('user')
      const parsedUser = userStorage ? JSON.parse(userStorage) : []
      try {
         const { data } = await api.get(`api/pedido/listPedido/${parsedUser.cpf}`)
         return data
      } catch (error) {
         return error
      }
   }
}

export default useGetPedido