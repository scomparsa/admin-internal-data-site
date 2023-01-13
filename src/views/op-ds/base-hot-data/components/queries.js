import { gql } from 'apollo-boost'
import { PAGE_INFO_FRAGMENT } from '@/apollo/fragment/fragments'

export const OP_HOT_DATA = gql`
  query HotCirclePostings($limit: Int!, $offset: Int!, $order: String, $search: HotDataSearchInput!) {
    opHotData(limit: $limit, offset: $offset, order: $order, search: $search) {
      edges {
        id
        postingId
        createTime
        commentNum
        repostNum
        likeNum
        post {
          postingId
          circleId
          postingContent
          postingPicsRaw
        }
        circle {
          circleId
          title
        }

        superDid
        visitors
        joinNum
        realFeedNum
        visitUv
        postFeedUv
        superTopic {
          name
          description
          avatar
        }

        feedId
        feed {
          feedId
          feedPics
          feedContent
        }
      }
      pageInfo {
        ...pageInfoFields
      }
    }
  }
  ${PAGE_INFO_FRAGMENT}
`
