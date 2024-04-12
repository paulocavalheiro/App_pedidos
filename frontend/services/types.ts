// @getData da api
export type GenericDataType = {
   [key: string]: any
}

// msg erro get api
export type TransactionApiType = {
   error: boolean
   msg?: string | null
   code?: number | null
}


