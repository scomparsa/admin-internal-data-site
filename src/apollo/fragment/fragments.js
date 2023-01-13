import { gql } from 'apollo-boost'

const PAGE_INFO_FRAGMENT = gql`
  fragment pageInfoFields on OffsetBasedPagination {
    totalCount
    limit
    offset
  }
`

const MUTATION_RESPONSE_FIELDS = gql`
  fragment mutationResponseFields on MutationResponse {
    code
    success
    message
    errors
  }
`

export { PAGE_INFO_FRAGMENT, MUTATION_RESPONSE_FIELDS }
