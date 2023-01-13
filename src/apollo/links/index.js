import { ApolloLink } from 'apollo-boost'
import mutationResponseLink from './mutation-response-link'
import errorLink from './error-link'
import { httpLink } from './http-link'
import { gatewayHttpLink } from './gateway-http-link'

export const gatewayLinks = ApolloLink.from([mutationResponseLink, errorLink, gatewayHttpLink])

export const links = ApolloLink.from([mutationResponseLink, errorLink, httpLink])
