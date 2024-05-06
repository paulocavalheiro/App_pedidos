import { useQuery } from "react-query";
import { api } from "../../../services/api";
import { GenericDataType, StatusQueryProps } from "../../../services/types";
import useGetUser from "../../prato/hooks/getUser";

const useGetPedido = () => {
   let statusQuery: StatusQueryProps['status'] = null; 
   const user = useGetUser()   

   const { isLoading, data, error } = useQuery<GenericDataType>({
      queryKey: ['getPedido',user],      
      queryFn: () => getPedido(user), 
      enabled: !!user,     
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
   async function getPedido(user:any) {
      try {
         const { data } = await api.get(`api/pedido/listPedido/${user.cpf}`)
         return data
      } catch (error) {
         return error
      }
   }
}

export default useGetPedido