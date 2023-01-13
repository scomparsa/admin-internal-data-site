import { gql } from 'apollo-boost'
import { PAGE_INFO_FRAGMENT } from '@/apollo/fragment/fragments'

export const CIRCLE_ADMIN_DATA_QUERY = gql`
  query CircleAdminData($limit: Int!, $offset: Int!, $search: OpCircleDataSearch) {
    circleAdminData(limit: $limit, offset: $offset, search: $search) {
      edges {
        day
        uid
        user {
          name
        }
        ownType
        OwnTypeText
        circle
        title
        postingNumberAll
        postingNumberReview
        likeNumber
        commentNumber
        shareNumber
        deleteNote
        deleteNoteComment
      }
      pageInfo {
        ...pageInfoFields
      }
    }
  }
  ${PAGE_INFO_FRAGMENT}
`

export const CIRCLE_ADMIN_EXPORT_DATA_QUERY = gql`
  query CircleAdminExportData($limit: Int!, $offset: Int!, $search: OpCircleDataSearch) {
    circleAdminExportData(limit: $limit, offset: $offset, search: $search) {
      edges {
        day
        uid
        ownType
        OwnTypeText
        circle
        title
        postingNumberAll
        postingNumberReview
        likeNumber
        commentNumber
        shareNumber
        deleteNote
        deleteNoteComment
      }
    }
  }
`

export const CIRCLE_POST_DATA_QUERY = gql`
  query CirclePostData($limit: Int!, $offset: Int!, $search: OpCircleDataSearch) {
    circlePostData(limit: $limit, offset: $offset, search: $search) {
      edges {
        day
        ownType
        OwnTypeText
        circle
        title
        postingUsers
        postingNumberAll
        postingNumberReview
        likeUsers
        likeNumber
        commentNumber
        commentUsers
        shareUsers
        shareNumber
        deleteNote
        deleteNoteComment
        newJoinUsers
        circleDetailPv
        circleDetailUv
        circleNotePv
        circleNoteUv
        circleNoteDetailPv
        circleNoteDetailUv
        realCircleUsers
        realPostingNumber
        realCommentNumber
      }
      pageInfo {
        ...pageInfoFields
      }
    }
  }
  ${PAGE_INFO_FRAGMENT}
`

export const CIRCLE_POST_EXPORT_DATA_QUERY = gql`
  query CirclePostExportData($limit: Int!, $offset: Int!, $search: OpCircleDataSearch) {
    circlePostExportData(limit: $limit, offset: $offset, search: $search) {
      edges {
        day
        ownType
        OwnTypeText
        circle
        title
        postingUsers
        postingNumberAll
        postingNumberReview
        likeUsers
        likeNumber
        commentNumber
        commentUsers
        shareUsers
        shareNumber
        deleteNote
        deleteNoteComment
        newJoinUsers
        circleDetailPv
        circleDetailUv
        circleNotePv
        circleNoteUv
        circleNoteDetailPv
        circleNoteDetailUv
        realCircleUsers
        realPostingNumber
        realCommentNumber
      }
    }
  }
`

export const CIRCLE_MESSAGE_PUSH_DATA_QUERY = gql`
  query CircleMessagePushData($limit: Int!, $offset: Int!, $search: OpCircleDataSearch) {
    circleMessagePushData(limit: $limit, offset: $offset, search: $search) {
      edges {
        day
        ownType
        OwnTypeText
        circle
        pv
        uv
        title
        url
      }
      pageInfo {
        ...pageInfoFields
      }
    }
  }
  ${PAGE_INFO_FRAGMENT}
`

export const CIRCLE_MESSAGE_PUSH_EXPORT_DATA_QUERY = gql`
  query circleMessagePushExportData($limit: Int!, $offset: Int!, $search: OpCircleDataSearch) {
    circleMessagePushExportData(limit: $limit, offset: $offset, search: $search) {
      edges {
        day
        ownType
        OwnTypeText
        circle
        pv
        uv
        title
        url
      }
    }
  }
`
