import React, { useState } from 'react'
import { Table, Radio } from 'antd'
import { useQuery } from 'react-apollo'
import { gatewayClient } from '@/apollo/client'
import { usePagination } from '@/hooks/use-pagination'
import moment from 'moment'
import { FilterTabs } from './filter-table'
import { OP_HOT_DATA } from './queries'
import {
  HOT_TOPIC,
  HOT_POST,
  HOT_DYNAMIC,
  HOT_POST_COLUMNS,
  HOT_TOPIC_COLUMNS,
  HOT_DYNAMIC_COLUMNS
} from './selectOptions'
import { HOT_TYPE, HOTPOST_TYPE, HOTFANS_TYPE, HOTSOCIAL_TYPE } from '../../constants'
import './index.less'

const COLUMNS = {
  [HOT_TYPE.HOTPOST]: HOT_POST_COLUMNS,
  [HOT_TYPE.TOPIC]: HOT_TOPIC_COLUMNS,
  [HOT_TYPE.DYNAMIC]: HOT_DYNAMIC_COLUMNS
}

const DEFAULT_PAGE_SIZE = 20
const DEFAULT_PAGE = 0
const defaultStartTime = moment()
  .subtract(1, 'days')
  .startOf('day')
  .unix()
const defaultEndTime = moment()
  .subtract(1, 'days')
  .endOf('day')
  .unix()
export const Content = () => {
  const [selectionType, setSelectionType] = useState(HOT_TYPE.HOTPOST)
  const [option, setOption] = useState(HOT_POST)
  const [pageorder, setpageorder] = useState('commentNum')
  const [searchType, setSearchType] = useState(HOT_TYPE.HOTPOST)
  const [typeIndex, setTypeIndex] = useState(HOT_TYPE.HOTPOST)
  const { data, loading, refetch } = useQuery(OP_HOT_DATA, {
    client: gatewayClient,
    variables: {
      limit: DEFAULT_PAGE_SIZE,
      offset: DEFAULT_PAGE,
      order: pageorder,
      search: { type: searchType, startTime: defaultStartTime, endTime: defaultEndTime }
    }
  })
  const columns = COLUMNS[selectionType]
  const dataSource = data?.opHotData?.edges

  /* 选择内容切换 */
  const onChanges = ({ target: { value } }) => {
    setSearchType(value)
    setSelectionType(value)
    setTypeIndex(value)
    if (value === HOT_TYPE.HOTPOST) {
      setOption(HOT_POST)
      setpageorder(HOTPOST_TYPE[1])
    } else if (value === HOT_TYPE.TOPIC) {
      setOption(HOT_TOPIC)
      setpageorder(HOTFANS_TYPE[0])
    } else {
      setOption(HOT_DYNAMIC)
      setpageorder(HOTSOCIAL_TYPE[0])
    }
  }

  /* 重新排序 */
  const callBack = index => {
    if (typeIndex === HOT_TYPE.HOTPOST) {
      setpageorder(HOTPOST_TYPE[index])
    } else if (typeIndex === HOT_TYPE.TOPIC) {
      setpageorder(HOTFANS_TYPE[index])
    } else {
      setpageorder(HOTSOCIAL_TYPE[index])
    }
  }

  return (
    <>
      类型选择：
      <Radio.Group onChange={e => onChanges(e)} value={selectionType} name="radiogroup" defaultValue={0}>
        <Radio value={HOT_TYPE.HOTPOST}>热门基地贴</Radio>
        <Radio value={HOT_TYPE.TOPIC}>热门超话</Radio>
        <Radio value={HOT_TYPE.DYNAMIC}>热门动态</Radio>
      </Radio.Group>
      <FilterTabs
        pageorder={pageorder}
        option={option}
        selectionType={selectionType}
        callback={callBack}
        onSearch={values => {
          const { order, ...reset } = values
          refetch({ offset: 0, order, search: reset })
        }}
        defaultStartTime={defaultStartTime}
        defaultEndTime={defaultEndTime}
      />
      <Table
        size="small"
        dataSource={dataSource}
        columns={columns}
        rowKey="id"
        loading={loading}
        pagination={usePagination({ pageInfo: data?.opHotData?.pageInfo, refetch })}
      />
    </>
  )
}
