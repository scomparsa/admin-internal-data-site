import React, { useEffect } from 'react'
import { Table, message } from 'antd'
import { useQuery, useLazyQuery } from 'react-apollo'
import Xlsx from 'xlsx'
import moment from 'moment'
import { gatewayClient } from '@/apollo/client'
import { usePagination } from '@/hooks/use-pagination'
import { CIRCLE_POST_DATA_QUERY, CIRCLE_POST_EXPORT_DATA_QUERY } from '../../queries'
import { Search } from '../../base-administrator-data-sheet/components/search'
import { PICKER_TYPE, PICKER_NAME, EXTENSION_NAME } from '../../constants'

const DEFAULT_LIMIT = 20
let pickerType = 'date'

export const List = () => {
  const { data, loading, refetch } = useQuery(CIRCLE_POST_DATA_QUERY, {
    client: gatewayClient,
    variables: { limit: DEFAULT_LIMIT, offset: 0, search: { picker: 'date' } }
  })

  const [getData, { data: exportData }] = useLazyQuery(CIRCLE_POST_EXPORT_DATA_QUERY, {
    client: gatewayClient,
    onCompleted: () => {
      const list = exportData?.circlePostExportData?.edges || []

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
            title,
            OwnTypeText,
            postingNumberAll,
            postingNumberReview,
            postingUsers,
            likeUsers,
            shareUsers,
            likeNumber,
            newJoinUsers,
            shareNumber,
            circleDetailPv,
            circleNoteDetailPv,
            circleDetailUv,
            circleNoteDetailUv,
            realCircleUsers,
            realPostingNumber,
            realCommentNumber,
            commentNumber,
            commentUsers
          }) => {
            return {
              '日期 ': day
                ? `${moment(`${day}`).format(PICKER_TYPE[pickerType])}${
                    pickerType !== 'date' ? EXTENSION_NAME[pickerType] : ''
                  }`
                : '-',
              '基地 ID': circle,
              '基地名称 ': title,
              '基地类型 ': OwnTypeText,
              '基地发帖数 ': postingNumberAll || 0,
              '基地发帖过审数 ': postingNumberReview || 0,
              '基地帖子发布人数 ': postingUsers || 0,
              '基地帖子评论数 ': commentNumber || 0,
              '基地帖子评论人数 ': commentUsers || 0,
              '基地帖子点赞数 ': likeNumber || 0,
              '基地帖子点赞人数 ': likeUsers || 0,
              '基地帖子分享数 ': shareNumber || 0,
              '基地帖子分享人数 ': shareUsers || 0,
              '基地当日新加入人数 ': newJoinUsers || 0,
              '基地当日 PV': circleDetailPv || 0,
              '基地当日 UV': circleDetailUv || 0,
              '基地当日帖子绘制量 ': circleNoteDetailPv || 0,
              '基地当日主题帖详情页绘制量 ': circleNoteDetailUv || 0,
              '基地总加入人数 ': realCircleUsers || 0,
              '基地总发帖数 ': realPostingNumber || 0,
              '基地总评论数 ': realCommentNumber || 0
            }
          }
        )
      )

      Xlsx.utils.book_append_sheet(workbook, worksheet)
      Xlsx.writeFile(workbook, `单个基地发帖数据表${PICKER_NAME[pickerType]}.csv`, { raw: true, bookType: 'csv' })

      workbook = null
      worksheet = null
    }
  })

  useEffect(() => {
    pickerType = 'date'
  }, [])

  const { edges = [], pageInfo = {} } = data?.circlePostData || {}

  const reloadData = (search = {}) => {
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
      title: '基地 ID',
      dataIndex: 'circle',
      render: text => text || 0
    },
    {
      title: '基地名称',
      dataIndex: 'title',
      render: text => text || 0
    },
    {
      title: '基地类型',
      dataIndex: 'OwnTypeText',
      render: text => text || 0
    },
    {
      title: '基地发帖数',
      dataIndex: 'postingNumberAll',
      render: text => text || 0
    },
    {
      title: '基地发帖过审数',
      dataIndex: 'postingNumberReview',
      render: text => text || 0
    },
    {
      title: '基地帖子发布人数',
      dataIndex: 'postingUsers',
      render: text => text || 0
    },
    {
      title: '基地帖子评论数',
      dataIndex: 'commentNumber',
      render: text => text || 0
    },
    {
      title: '基地帖子评论人数',
      dataIndex: 'commentUsers',
      render: text => text || 0
    },
    {
      title: '基地帖子点赞数',
      dataIndex: 'likeNumber',
      render: text => text || 0
    },
    {
      title: '基地帖子点赞人数',
      dataIndex: 'likeUsers',
      render: text => text || 0
    },
    {
      title: '基地帖子分享数',
      dataIndex: 'shareNumber',
      render: text => text || 0
    },
    {
      title: '基地帖子分享人数',
      dataIndex: 'shareUsers',
      render: text => text || 0
    },
    {
      title: '基地当日新加入人数',
      dataIndex: 'newJoinUsers',
      render: text => text || 0
    },
    {
      title: '基地当日 PV',
      dataIndex: 'circleDetailPv',
      render: text => text || 0
    },
    {
      title: '基地当日 UV',
      dataIndex: 'circleDetailUv',
      render: text => text || 0
    },
    {
      title: '基地当日帖子绘制量',
      dataIndex: 'circleNoteDetailPv',
      render: text => text || 0
    },
    {
      title: '基地当日主题帖详情页绘制量',
      dataIndex: 'circleNoteDetailUv',
      render: text => text || 0
    },
    {
      title: '基地总加入人数',
      dataIndex: 'realCircleUsers',
      render: text => text || 0
    },
    {
      title: '基地总发帖数',
      dataIndex: 'realPostingNumber',
      render: text => text || 0
    },
    {
      title: '基地总评论数',
      dataIndex: 'realCommentNumber',
      render: text => text || 0
    }
  ]

  return (
    <div className="b-table">
      <Search onSearch={values => reloadData(values)} exportCsv={values => exportCsv(values)} />
      <Table
        rowKey={(_, index) => pageInfo.offset * DEFAULT_LIMIT + index}
        loading={loading}
        columns={columns}
        dataSource={edges}
        scroll={{ x: true }}
        pagination={usePagination({ pageInfo, refetch })}
      />
    </div>
  )
}
