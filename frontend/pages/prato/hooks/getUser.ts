import { useEffect, useState } from 'react'

interface user {
   nome: string
   cpf: number
   mesa: number
}

const useGetUser = () => {
   const [user, setUser] = useState<user>({} as user)

   useEffect(() => {
      const userData = localStorage.getItem('user')
      const parsedUser = userData ? JSON.parse(userData) : []
      setUser(parsedUser)
   }, [])

   return user
}

export default useGetUser
