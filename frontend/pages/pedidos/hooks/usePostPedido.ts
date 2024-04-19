import { useState } from 'react'
import useGetUser from '../../prato/hooks/getUser'
import useCreatePedido from '../services/useCreatePedido'
import { AxiosResponse } from 'axios'

const usePostPedido = () => {
   const [statusPost, setStatusPost] = useState<AxiosResponse | null>(null)
   const getUser = useGetUser()
   const createPedido = useCreatePedido
   const postPedido = async (children: any) => {
      const idsItens: [{ id: number }] = children.dataPedido?.map(
         (item: any) => ({
            id: item.id,
         })
      )
      const responsePost = await createPedido({ getUser, idsItens })
      setStatusPost(responsePost)
   }

   return { postPedido, statusPost }
}
export default usePostPedido
