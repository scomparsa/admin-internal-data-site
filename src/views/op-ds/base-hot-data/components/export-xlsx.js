export const exportXlsx = (type, data) => {
  if (type === 0) {
    return data.map(({ postingId, createTime, circle, post, likeNum, commentNum, repostNum }) => {
      return {
        '帖子 ID ': postingId,
        '创建时间 ': createTime,
        '所属基地 ': circle.title + circle.circleId,
        '帖子内容 ': post.postingContent
          ? post.postingContent.length > 30
            ? `${post.postingContent.substr(0, 30)}...`
            : `${post.postingContent}`
          : 0,
        '点赞数 ': likeNum,
        '评论数 ': commentNum || 0,
        '转发数 ': repostNum || 0
      }
    })
  } else if (type === 1) {
    return data.map(
      ({
        superDid,
        createTime,
        superTopic,
        visitors,
        joinNum,
        realFeedNum,
        likeNum,
        commentNum,
        repostNum,
        visitUv,
        postFeedUv
      }) => {
        return {
          '超话 ID ': superDid,
          '创建时间 ': createTime,
          '超话名称 ': superTopic.name || 0,
          '超话简介 ': superTopic.description
            ? superTopic.description.length > 30
              ? `${superTopic.description.substr(0, 30)}...`
              : `${superTopic.description}`
            : 0,
          '来访数 ': visitors || 0,
          '参与数 ': joinNum || 0,
          '实际动态数 ': realFeedNum || 0,
          '点赞数 ': likeNum || 0,
          '评论数 ': commentNum || 0,
          '转发数 ': repostNum || 0,
          '来访 UV ': visitUv || 0,
          '发布动态 UV ': postFeedUv || 0
        }
      }
    )
  } else if (type === 2) {
    return data.map(({ feedId, createTime, feed, likeNum, commentNum, repostNum }) => {
      return {
        '动态 ID ': feedId,
        '创建时间 ': createTime,
        '动态内容 ': feed.feedContent
          ? feed.feedContent.length > 30
            ? `${feed.feedContent.substr(0, 30)}...`
            : `${feed.feedContent}`
          : 0,
        '点赞数 ': likeNum || 0,
        '评论数 ': commentNum || 0,
        '转发数 ': repostNum || 0
      }
    })
  }
}
