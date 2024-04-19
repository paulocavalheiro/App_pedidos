import { useQuery } from "react-query";
import { api } from "../../../services/api";
import { GenericDataType, StatusQueryProps } from "../../../services/types";

const useGetPRatosPedido = () => {
    let statusQuery: StatusQueryProps['status'] = null;

   const { isLoading, data, error } = useQuery<GenericDataType>({
      queryKey: ['getPratos'],
      queryFn: getPratos,
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
   async function getPratos() {
      try {
         const arrPratos = JSON.parse(localStorage.getItem('pratos') || '[]')
         if(arrPratos.length === 0) return null
         const { data } = await api.get(`api/prato/buscarIds/${arrPratos}`)
         return data
      } catch (error) {
         return error
      }
   }
}

export default useGetPRatosPedido