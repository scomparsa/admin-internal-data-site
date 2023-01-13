import { HttpLink } from 'apollo-boost'
import { getToken } from '@/utils/auth'

export const gatewayHttpLink = new HttpLink({
  fetch,
  uri: import.meta.env.VITE_GATEWAY_HOST,
  headers: {
    authorization: getToken()
  }
})
