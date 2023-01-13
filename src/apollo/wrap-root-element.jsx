import React from 'react'
import PropTypes from 'prop-types'
import { ApolloProvider } from 'react-apollo'
import { gatewayClient } from './client'

const wrapRootElement = ({ element }) => <ApolloProvider client={gatewayClient}>{element}</ApolloProvider>

wrapRootElement.propTypes = {
  element: PropTypes.element.isRequired
}

export default wrapRootElement
