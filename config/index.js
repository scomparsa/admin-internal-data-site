export const siteMetadata = {
  title: '国内数据后台',
  description: '国内数据后台',
  author: 'Mark',
  pathPrefix: ['LOCAL', 'LOCAL_DEVELOPMENT'].includes(process.env.NODE_ENV) ? '' : '/internal-data',
  menuLinks: [
    {
      name: '广告流量统计',
      path: '/ad-traffic',
      icon: 'area-chart',
      routes: [
        {
          name: '广告数据展示',
          path: '/ad-traffic/ad-data-show',
          alias: 'DATA##AD_DATA'
        }
      ]
    },
    {
      name: '运营数据统计',
      path: '/op-ds',
      icon: 'bar-chart',
      routes: [
        {
          name: '基地管理员数据表',
          path: '/op-ds/base-administrator-data-sheet',
          alias: 'DATA##OP_CIRCLE_DATA##ADMIN'
        },
        {
          name: '单个基地发帖数据表',
          path: '/op-ds/base-posting-data-sheet',
          alias: 'DATA##OP_CIRCLE_DATA##POST'
        },
        {
          name: '基地站内信推广数据',
          path: '/op-ds/base-promotion-data',
          alias: 'DATA##OP_CIRCLE_DATA##MESSAGE'
        },
        {
          name: '热门数据列表',
          path: '/op-ds/base-hot-data',
          alias: 'DATA##OP_HOT_DATA##ADMIN'
        }
      ]
    }
  ]
}
