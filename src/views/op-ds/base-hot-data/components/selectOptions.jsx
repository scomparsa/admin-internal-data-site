import React from 'react'
import { Link } from '@reach/router'

const HOT_POST = {
  '热门基地贴排序:': ['点赞数', '评论数', '转发数']
}
const HOT_TOPIC = {
  '热门超话排序:': ['实际动态数', '来访数', '参与数', '点赞数', '评论数', '转发数', '来访 UV', '发布动态 UV']
}
const HOT_DYNAMIC = {
  '热门动态排序:': ['点赞数', '评论数', '转发数']
}
const HOT_POST_COLUMNS = [
  {
    title: '帖子 ID',
    dataIndex: 'postingId',
    render: postingId => (
      <a target="_black" rle="noreferrer" href={`/op/base/detail?id=${postingId}`}>
        {postingId}
      </a>
    )
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    render: text => text || '-'
  },
  {
    title: '所属基地',
    dataIndex: 'circle',
    render: circle => {
      const { circleId, title } = circle || {}
      return <p>{`${title || ''} [${circleId || ''}]`}</p>
    }
  },
  {
    title: '帖子内容',
    dataIndex: 'postingContent',
    render: (_, { post }) => {
      const { postingContent, postingPicsRaw = [] } = post || {}
      return (
        <>
          <span style={{ marginRight: '20px' }}>
            {postingContent
              ? postingContent.length > 30
                ? `${postingContent.substr(0, 30)}...`
                : postingContent
              : '-'}
          </span>
          {postingPicsRaw?.length ? (
            <img src={postingPicsRaw[0]} style={{ width: '90px', height: '40px' }} alt="" />
          ) : (
            ''
          )}
        </>
      )
    }
  },
  {
    title: '点赞数',
    dataIndex: 'likeNum',
    render: text => text || 0
  },
  {
    title: '评论数',
    dataIndex: 'commentNum',
    render: text => text || 0
  },
  {
    title: '转发数',
    dataIndex: 'repostNum',
    render: text => text || 0
  }
]
const HOT_TOPIC_COLUMNS = [
  {
    title: '超话 ID',
    dataIndex: 'superDid',
    render: text => {
      return process.env.EXEC_ENV === 'production' ? (
        <Link target="_blank" to={`https://admin.cn/op/super-topic/detail?id=${text}`}>
          {text || ''}
        </Link>
      ) : (
        <Link target="_blank" to={`https://test-admin.cn/op/super-topic/detail?id=${text}`}>
          {text || ''}
        </Link>
      )
    }
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    render: text => text || 0
  },

  {
    title: '超话信息',
    dataIndex: 'superTopic',
    render: superTopic => {
      const { name, description, avatar } = superTopic || {}

      return (
        <div style={{ display: 'flex' }}>
          {avatar ? <img src={avatar} style={{ width: '90px', height: '40px', marginRight: '20px' }} alt="" /> : '-'}
          <div>
            <p>{name || '-'}</p>
            <span>
              {description ? (description.length > 30 ? `${description.substr(0, 10)}...` : description) : '-'}
            </span>
          </div>
        </div>
      )
    }
  },
  {
    title: '来访数',
    dataIndex: 'visitors',
    render: text => text || '-'
  },
  {
    title: '参与数',
    dataIndex: 'joinNum',
    render: text => text || 0
  },
  {
    title: '实际动态数',
    dataIndex: 'realFeedNum',
    render: text => text || 0
  },
  {
    title: '点赞数',
    dataIndex: 'likeNum',
    render: text => text || 0
  },
  {
    title: '评论数',
    dataIndex: 'commentNum',
    render: text => text || 0
  },
  {
    title: '转发数',
    dataIndex: 'repostNum',
    render: text => text || 0
  },
  {
    title: '来访 UV',
    dataIndex: 'visitUv',
    render: text => text || 0
  },
  {
    title: '发布动态 UV',
    dataIndex: 'postFeedUv',
    render: text => text || 0
  }
]
const HOT_DYNAMIC_COLUMNS = [
  {
    title: '动态 ID',
    dataIndex: 'feedId',
    render: text => {
      return process.env.EXEC_ENV === 'production' ? (
        <Link target="_blank" to={`https://admin.cn/op/dynamic/detail?id=${text}`}>
          {text || ''}
        </Link>
      ) : (
        <Link target="_blank" to={`https://test-admin.cn/op/dynamic/detail?id=${text}`}>
          {text || ''}
        </Link>
      )
    }
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    render: text => text || 0
  },
  {
    title: '动态内容',
    dataIndex: 'feedContent',
    render: (_, { feed }) => {
      const { feedContent, feedPics = [] } = feed || {}
      return (
        <>
          <span>{feedContent ? (feedContent.length > 30 ? `${feedContent.substr(0, 30)}...` : feedContent) : '-'}</span>
          {feedPics.length ? (
            <img src={feedPics[0]} style={{ width: '90px', height: '40px', marginLeft: '20px' }} alt="" />
          ) : (
            ''
          )}
        </>
      )
    }
  },
  {
    title: '点赞数',
    dataIndex: 'likeNum',
    render: text => text || 0
  },
  {
    title: '评论数',
    dataIndex: 'commentNum',
    render: text => text || 0
  },
  {
    title: '转发数',
    dataIndex: 'repostNum',
    render: text => text || 0
  }
]

export { HOT_TOPIC, HOT_POST, HOT_DYNAMIC, HOT_POST_COLUMNS, HOT_TOPIC_COLUMNS, HOT_DYNAMIC_COLUMNS }
