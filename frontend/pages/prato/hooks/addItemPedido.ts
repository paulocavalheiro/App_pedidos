import { useState } from 'react'
import { GenericDataType, StatusQueryProps } from '../../../services/types'
import { useQuery } from 'react-query'
import { api } from '../../../services/api'


type StatusProps = 'error' | 'success' | 'exists' | null

const useAddItemPedido = () => {
   const [status, setStatus] = useState<StatusProps>()

   const addItemPedido = async (children: GenericDataType) => {
      const storagePratos = localStorage.getItem('pratos') ? localStorage.getItem('pratos') : null    

      if (!storagePratos) {
         let arrPratos = []
         arrPratos.push(children?.id)
         localStorage.setItem('pratos', JSON.stringify(arrPratos))
         setStatus('success')
      } else {
         const valueExiste = localStorage.getItem('pratos')?.includes(children?.id)
         if (!valueExiste) {
            const pratoStorage = localStorage.getItem('pratos')
            const novoArray = pratoStorage ? JSON.parse(pratoStorage) : []
            novoArray.push(children?.id)
            localStorage.setItem('pratos', JSON.stringify(novoArray))
            setStatus('success')
         }else{
            setStatus('exists')
         }
         
      }
      return status
   }

   return { status, addItemPedido }
}

export default useAddItemPedido
