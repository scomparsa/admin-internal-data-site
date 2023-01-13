import React from 'react'
import { Table, Popover, Card } from 'antd'
import PropTypes from 'prop-types'
import REGION from '@/assets/regionfile'
import staticResource from '../constants'

const { ad2Columns, purposeData, platformData } = staticResource
const TableList = ({ dataSource, formData }, ref) => {
  const { groups, show } = formData

  const columns = [
    {
      title: '日期',
      dataIndex: 'day',
      sorter: (a, b) => a.day - b.day
    }
  ]

  if (groups.includes('type,groups,position')) {
    columns.push({
      title: '广告类型',
      sorter: (a, b) => {
        const one = String(a.type) + String(a.groups) + String(a.position)
        const two = String(b.type) + String(b.groups) + String(b.position)
        return one - two
      },
      render: (_, record) => (
        <span>{ad2Columns.get(String(record.type) + String(record.groups) + String(record.position)) || '-'}</span>
      )
    })
  }

  if (groups.includes('region')) {
    columns.push({
      title: '投放地区',
      dataIndex: 'region',
      align: 'center',
      sorter: (a, b) => a.region - b.region,
      render: _ => {
        let region
        if (_) {
          region = _.split(',')
            .map(key => REGION[key])
            .join(',')
        }
        return _ ? (
          <Popover content={region}>
            <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', width: 150 }}>
              {region}
            </div>
          </Popover>
        ) : (
          '-'
        )
      }
    })
  }

  if (groups.includes('platform')) {
    columns.push({
      title: '投放系统',
      dataIndex: 'platform',
      sorter: (a, b) => a.platform - b.platform,
      render: (text, _) => <span>{platformData[text] || '-'}</span>
    })
  }

  if (groups.includes('admId')) {
    columns.push({
      title: '广告ID',
      dataIndex: 'admId',
      sorter: (a, b) => a.admId - b.admId
    })
  }

  if (groups.includes('title')) {
    columns.push({
      title: '投放名称',
      dataIndex: 'title',
      render: (text, _) => <span>{text !== 'unknown' ? text : '-'}</span>,
      sorter: (a, b) => a.title - b.title
    })
  }

  if (groups.includes('purpose')) {
    columns.push({
      title: '使用途径',
      dataIndex: 'purpose',
      sorter: (a, b) => a.purpose - b.purpose,
      render: (text, _) => <span>{purposeData[text] || '-'}</span>
    })
  }

  if (show.includes('isShow')) {
    columns.push({
      title: '曝光',
      dataIndex: 'isShow',
      sorter: (a, b) => a.isShow - b.isShow,
      render: (text, _) => <span>{text || 0}</span>
    })
  }

  if (show.includes('isHidden')) {
    columns.push({
      title: '关闭',
      dataIndex: 'isHidden',
      sorter: (a, b) => a.isHidden - b.isHidden,
      render: (text, _) => <span>{text || 0}</span>
    })
  }

  if (show.includes('isClick')) {
    columns.push({
      title: '点击',
      dataIndex: 'isClick',
      sorter: (a, b) => a.isClick - b.isClick,
      render: (text, _) => <span>{text || 0}</span>
    })
  }

  if (show.includes('isHotClick')) {
    columns.push({
      title: '热区点击',
      dataIndex: 'isHotClick',
      sorter: (a, b) => a.isHotClick - b.isHotClick,
      render: (text, _) => <span>{text || 0}</span>
    })
  }

  if (show.includes('isLiked')) {
    columns.push({
      title: '点赞',
      dataIndex: 'isLiked',
      sorter: (a, b) => a.isLiked - b.isLiked,
      render: (text, _) => <span>{text || 0}</span>
    })
  }

  if (!dataSource) return null

  return (
    <Card style={{ marginTop: 20 }}>
      <span ref={ref}>
        <Table columns={columns} dataSource={dataSource} pagination={false} rowKey={() => Math.random()} />
      </span>
    </Card>
  )
}

TableList.propTypes = {
  dataSource: PropTypes.array,
  formData: PropTypes.shape({
    groups: PropTypes.array.isRequired,
    show: PropTypes.array.isRequired
  }).isRequired
}

export default React.memo(React.forwardRef(TableList))
