const ad2Options = new Map([
  [1, '附近banner1'],
  [2, '附近banner3'],
  [3, '动态banner'],
  [4, '热门动态'],
  [5, '附近动态'],
  [6, '关注动态'],
  [7, '开机图'],
  [8, '浮层广告'],
  [9, '身边banner2'],
  [10, '发现feed05'],
  [11, '来访banner广告'],
  [12, '来访原生广告'],
  [13, '个人主页广告'],
  [14, '首页原生广告'],
  [15, '个人主页banner'],
  [16, '动态详情']
])

const ad2Columns = new Map([
  ['101', '附近banner1'],
  ['102', '身边banner2'],
  ['103', '附近banner3'],
  ['130', '动态banner'],
  ['000', '热门动态'],
  ['010', '附近动态'],
  ['020', '关注动态'],
  ['200', '开机图'],
  ['300', '浮层广告'],
  ['030', '发现feed05'],
  ['150', '来访banner广告'],
  ['540', '来访原生广告'],
  ['560', '个人主页广告'],
  ['570', '首页原生广告'],
  ['160', '个人主页banner'],
  ['1100', '动态详情']
])

const groupsData = [
  { label: '日期', value: 'day' },
  { label: '类型', value: 'type,groups,position' },
  { label: '地区', value: 'region' },
  { label: '系统', value: 'platform' },
  { label: '广告ID', value: 'admId' },
  { label: '投放名称', value: 'title' },
  { label: '使用途径', value: 'purpose' }
]

const defaultGroupsData = ['day', 'admId', 'title']

const showData = [
  { label: '曝光', value: 'isShow' },
  { label: '关闭', value: 'isHidden' },
  { label: '点击', value: 'isClick' },
  { label: '热区点击', value: 'isHotClick' },
  { label: '点赞', value: 'isLiked' }
]

const defaultShowData = ['isShow', 'isClick']

const purposeData = {
  0: '销售广告',
  1: '运营推荐'
}

const platformData = {
  0: '全部',
  1: 'Android',
  2: 'iOS'
}

const defaultAdType = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]

export default {
  ad2Options,
  ad2Columns,
  groupsData,
  showData,
  defaultShowData,
  defaultGroupsData,
  purposeData,
  platformData,
  defaultAdType
}
