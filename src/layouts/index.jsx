import React from 'react'
import { ConfigProvider } from 'antd'
import moment from 'moment'
import 'moment/locale/zh-cn'
import Layout from './layout'

moment.locale('zh-cn')

export default props => (
  <ConfigProvider>
    <Layout {...props} />
  </ConfigProvider>
)
