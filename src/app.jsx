import React from 'react'
import { Router, LocationProvider } from '@reach/router'
import { ApolloProvider } from 'react-apollo'
import { QueryParamProvider } from 'use-query-params'
// eslint-disable-next-line import/no-unresolved
import routes from 'virtual:generated-pages-react'
import { siteMetadata } from '~/config'
import { gatewayClient } from './apollo/client'
import { isLocal, isLocalDev } from './utils/env'
import './styles/index.less'
import 'antd/dist/antd.less'

export const App = props => {
  const { location } = isLocal || isLocalDev ? window : props

  return (
    <LocationProvider>
      <ApolloProvider client={gatewayClient}>
        <QueryParamProvider location={location}>
          <Router basepath={siteMetadata.pathPrefix}>
            {routes.map(({ path, component: Component }, idx) => (
              <Component key={idx} path={path} default={path === '/'} />
            ))}
          </Router>
        </QueryParamProvider>
      </ApolloProvider>
    </LocationProvider>
  )
}
