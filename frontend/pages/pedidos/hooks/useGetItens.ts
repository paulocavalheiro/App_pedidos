import { useState } from 'react'
import { api } from '../../../services/api'
import { useQuery } from 'react-query'
import { GenericDataType, StatusQueryProps } from '../../../services/types'

const useGetItens = () => {
   const [itemsPedido, setItemsPedido] = useState('')
   const addItemPedido = async () => {
      setItemsPedido(JSON.parse(localStorage.getItem('pratos') || '[]'))
      const itens = JSON.parse(localStorage.getItem('pratos') || '[]')
      itens.map((item: any) => {
         console.log(item)
      })


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
   return { itemsPedido, addItemPedido }
}
export default useGetItens
