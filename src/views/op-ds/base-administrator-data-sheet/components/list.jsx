import React, { useEffect } from 'react'
import { Table, message } from 'antd'
import { useQuery, useLazyQuery } from 'react-apollo'
import Xlsx from 'xlsx'
import moment from 'moment'
import { gatewayClient } from '@/apollo/client'
import { usePagination } from '@/hooks/use-pagination'
import { PICKER_TYPE, PICKER_NAME, EXTENSION_NAME } from '../../constants'
import { CIRCLE_ADMIN_DATA_QUERY, CIRCLE_ADMIN_EXPORT_DATA_QUERY } from '../../queries'
import { Search } from './search'

const DEFAULT_LIMIT = 20
let pickerType = 'date'

export const List = () => {
  const { data, loading, refetch } = useQuery(CIRCLE_ADMIN_DATA_QUERY, {
    client: gatewayClient,
    variables: { limit: DEFAULT_LIMIT, offset: 0, search: { picker: 'date' } }
  })

  const { edges = [], pageInfo = {} } = data?.circleAdminData || {}

  const [getData, { data: exportData }] = useLazyQuery(CIRCLE_ADMIN_EXPORT_DATA_QUERY, {
    client: gatewayClient,
    onCompleted: () => {
      const list = exportData?.circleAdminExportData?.edges || []

      if (!list || !list.length) {
        message.warning('当前没有你需要导出的数据！')
        return false
      }

      let workbook = { SheetNames: [], Sheets: {} }

      let worksheet = Xlsx.utils.json_to_sheet(
        list.map(
          ({
            day,
            circle,
            OwnTypeText,
            postingNumberAll,
            postingNumberReview,
            commentNumber,
            uid,
            likeNumber,
            shareNumber,
            deleteNote,
            deleteNoteComment,
            title
          }) => {
            return {
              '日期 ': day
                ? `${moment(`${day}`).format(PICKER_TYPE[pickerType])}${
                    pickerType !== 'date' ? EXTENSION_NAME[pickerType] : ''
                  }`
                : '-',
              '管理员 UID ': uid,
              '基地 ID': circle,
              '基地名称 ': title,
              '基地类型 ': OwnTypeText,
              '在该基地发帖数 ': postingNumberAll || 0,
              '在该基地发帖过审数 ': postingNumberReview || 0,
              '在该基地评论数 ': commentNumber || 0,
              '在该基地点赞数 ': likeNumber || 0,
              '在该基地分享数 ': shareNumber || 0,
              '在该基地删除主贴数 ': deleteNote || 0,
              '在该基地删除评论数 ': deleteNoteComment || 0
            }
          }
        )
      )

      Xlsx.utils.book_append_sheet(workbook, worksheet)
      Xlsx.writeFile(workbook, `基地管理员数据表${PICKER_NAME[pickerType]}.csv`, { raw: true, bookType: 'csv' })

      workbook = null
      worksheet = null
    }
  })

  useEffect(() => {
    pickerType = 'date'
  }, [])

  const reloadData = search => {
    const { picker } = search
    if (picker) {
      pickerType = picker
    }
    refetch({ offset: 0, search })
  }

  const exportCsv = search => {
    const { picker } = search
    if (picker) {
      pickerType = picker
    }

    getData({ variables: { offset: 0, limit: 10000, search } })
  }

  const columns = [
    {
      title: '日期',
      dataIndex: 'day',
      fixed: 'left',
      render: text => (text ? moment(`${text}`).format(PICKER_TYPE[pickerType]) : '-')
    },
    {
      title: '管理员 UID',
      dataIndex: 'uid'
    },
    {
      title: '管理员昵称',
      dataIndex: 'name',
      render: (_, row) => row?.user?.name || '-'
    },
    {
      title: '基地 ID',
      dataIndex: 'circle'
    },
    {
      title: '基地名称',
      dataIndex: 'title'
    },
    {
      title: '基地类型',
      dataIndex: 'OwnTypeText'
    },
    {
      title: '在该基地发帖数',
      dataIndex: 'postingNumberAll',
      render: text => text || 0
    },
    {
      title: '在该基地发帖过审数',
      dataIndex: 'postingNumberReview',
      render: text => text || 0
    },
    {
      title: '在该基地评论数',
      dataIndex: 'commentNumber',
      render: text => text || 0
    },
    {
      title: '在该基地点赞数',
      dataIndex: 'likeNumber',
      render: text => text || 0
    },
    {
      title: '在该基地分享数',
      dataIndex: 'shareNumber',
      render: text => text || 0
    },
    {
      title: '在该基地删除主贴数',
      dataIndex: 'deleteNote',
      render: text => text || 0
    },
    {
      title: '在该基地删除评论数',
      dataIndex: 'deleteNoteComment',
      render: text => text || 0
    }
  ]

  return (
    <div className="b-table">
      <Search onSearch={values => reloadData(values)} exportCsv={values => exportCsv(values)} />
      <Table
        columns={columns}
        loading={loading}
        dataSource={edges}
        rowKey={(_, index) => pageInfo.offset * DEFAULT_LIMIT + index}
        scroll={{ x: true }}
        pagination={usePagination({ pageInfo, refetch })}
      />
    </div>
  )
}
