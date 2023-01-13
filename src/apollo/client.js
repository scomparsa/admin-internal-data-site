import { ApolloClient, InMemoryCache } from 'apollo-boost'
import { links, gatewayLinks } from './links'
import fragmentMatcher from './fragment/fragmentMatcher'

export const client = new ApolloClient({
  link: links,
  cache: new InMemoryCache({ fragmentMatcher })
})

export const gatewayClient = new ApolloClient({
  link: gatewayLinks,
  cache: new InMemoryCache({ fragmentMatcher })
})

// !Fix: 全局设置 query
// ApolloBoost doesn't support defaultOptions
// https://github.com/apollographql/apollo-client/issues/3900
client.defaultOptions = {
  watchQuery: {
    fetchPolicy: 'cache-and-network',
    errorPolicy: 'all'
  },
  query: {
    errorPolicy: 'all',
    fetchPolicy: 'network-only'
  }
}

gatewayClient.defaultOptions = {
  watchQuery: {
    fetchPolicy: 'cache-and-network',
    errorPolicy: 'all'
  },
  query: {
    errorPolicy: 'all',
    fetchPolicy: 'network-only'
  }
}
