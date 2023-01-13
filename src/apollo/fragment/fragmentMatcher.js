import { IntrospectionFragmentMatcher } from 'apollo-boost'
import introspectionQueryResultData from './fragmentTypes.json'

export default new IntrospectionFragmentMatcher({
  introspectionQueryResultData
})
