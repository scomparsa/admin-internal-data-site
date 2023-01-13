import { gql } from 'apollo-boost'

const GET_AD_DATA_QUERY = gql`
  query GetAdData($search: SearchAdDataInput) {
    adData(search: $search) @connection(key: "adData") {
      admId
      day
      title
      isShow
      isHidden
      isClick
      isLiked
      region
      type
      groups
      position
      purpose
      platform
    }
  }
`
export default {
  GET_AD_DATA_QUERY
}
