import React from 'react'
import { Table } from 'antd'
import { useQuery } from 'react-apollo'
import moment from 'moment'
import { gatewayClient } from '@/apollo/client'
import { usePagination } from '@/hooks/use-pagination'
import { CIRCLE_MESSAGE_PUSH_DATA_QUERY } from '../../queries'
import { Search } from './search'

const DEFAULT_LIMIT = 20

export const List = () => {
  const { data, loading, refetch } = useQuery(CIRCLE_MESSAGE_PUSH_DATA_QUERY, {
    client: gatewayClient,
    variables: { limit: DEFAULT_LIMIT, offset: 0 }
  })

  const { edges = [], pageInfo = {} } = data?.circleMessagePushData || {}

  const columns = [
    {
      title: '日期',
      dataIndex: 'day',
      fixed: 'left',
      render: text => (text ? moment(`${text}`).format('YYYY-MM-DD') : '-')
    },
    {
      title: '链接',
      dataIndex: 'url'
    },
    {
      title: '基地 ID',
      dataIndex: 'circle',
      render: text => text || '-'
    },
    {
      title: '基地名称',
      dataIndex: 'title',
      render: text => text || '-'
    },
    {
      title: '基地类型',
      dataIndex: 'OwnTypeText',
      render: text => text || 0
    },
    {
      title: '链接点击 PV',
      dataIndex: 'pv',
      render: text => text || 0
    },
    {
      title: '链接点击 UV',
      dataIndex: 'uv',
      render: text => text || 0
    }
  ]

  return (
    <div className="b-table">
      <Search onSearch={values => refetch({ offset: 0, search: values })} />
      <Table
        columns={columns}
        dataSource={edges}
        loading={loading}
        rowKey={(_, index) => pageInfo.offset * DEFAULT_LIMIT + index}
        pagination={usePagination({ pageInfo, refetch })}
        scroll={{ x: true }}
      />
    </div>
  )
}
