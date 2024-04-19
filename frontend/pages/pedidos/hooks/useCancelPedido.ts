import { useRouter } from 'next/router'
import { useState } from 'react'

const useCancelPedido = () => {
   const [loading, setLoading] = useState<boolean>(false)
   const router = useRouter()
   const cancelPedido = () => {
      setLoading(true)
      setTimeout(() => {
         setLoading(false)
         localStorage.clear()
         router.push('/')
      }, 2000)
   }
   return { loading, cancelPedido }
}

export default useCancelPedido
