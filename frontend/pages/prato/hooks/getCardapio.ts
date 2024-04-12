import { useEffect, useState } from 'react'
import { GenericDataType, TransactionApiType } from '../../../services/types'
import { api } from '../../../services/api'

export const getCardapio = () => {
   const [cardapio, setCardapio] = useState<GenericDataType>()
   const [transactionApi, setTransactionApi] = useState<TransactionApiType>({
      error: false,
      msg: null,
   })
   useEffect(() => {
      async function getCardapio() {
         try {
            const response = await api.get('api/prato/listar')
            setCardapio(response.data)
         } catch (error) {
            setTransactionApi({
               error: true,
               msg: 'Erro, não foi possivel buscar os dados do cardápio',
            })
         }
      }
      getCardapio()
   }, [])

   return { cardapio, transactionApi }
}
