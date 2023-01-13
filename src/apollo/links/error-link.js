import { onError } from 'apollo-link-error'
import { message } from 'antd'
import { logout } from '@/utils/auth'

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    for (const { extensions } of graphQLErrors) {
      const { code } = extensions

      message.destroy()

      if (code === 'UNAUTHENTICATED') {
        message.error('请重新登录')
        logout()
      } else if (code === 'FORBIDDEN') {
        message.error('权限不足，请联系管理员')
      } else {
        message.error('服务器错误，请联系管理员')
      }
    }
  }

  if (networkError) {
    message.error('网络错误，请稍后重试')
  }
})

export default errorLink
