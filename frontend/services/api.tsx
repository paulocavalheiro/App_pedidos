import axios, { AxiosInstance } from 'axios'

function getAPIClient(): AxiosInstance {
   const api = axios.create({
      baseURL: 'http://127.0.0.1:3000',
   })

   api.interceptors.request.use((config) => {
      return config
   })

   api.interceptors.response.use(
      (response) => response,
      (error) => {
         if (error.response.status === 401) {
            return false
         } else {
            return Promise.reject(error)
         }
      }
   )

   return api
}

export const api = getAPIClient()
