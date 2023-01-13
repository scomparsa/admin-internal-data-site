import React from 'react'
import PropTypes from 'prop-types'
import { DatePicker, Select, Form, Button, Space, Radio, Tooltip, message } from 'antd'
import { useLazyQuery } from 'react-apollo'
import moment from 'moment'
import Xlsx from 'xlsx'
import { gatewayClient } from '@/apollo/client'
import { CIRCLE_MESSAGE_PUSH_EXPORT_DATA_QUERY } from '../../queries'
import { TYPE } from '../../constants'

import '../../base-administrator-data-sheet/components/index.less'

const FormItem = Form.Item
const { RangePicker } = DatePicker
const { Option } = Select

export const Search = ({ onSearch }) => {
  const [form] = Form.useForm()

  const [getData, { data, loading }] = useLazyQuery(CIRCLE_MESSAGE_PUSH_EXPORT_DATA_QUERY, {
    client: gatewayClient,
    onCompleted: () => {
      const edges = data ? data?.circleMessagePushExportData?.edges : []

      if (!edges || !edges.length) {
        message.warning('当前没有你需要导出的数据！')
        return false
      }

      let workbook = { SheetNames: [], Sheets: {} }

      let worksheet = Xlsx.utils.json_to_sheet(
        edges.map(({ day, OwnTypeText, circle, pv, uv, title, url }) => {
          return {
            '日期 ': day ? moment(`${day}`).format('YYYY-MM-DD') : '-',
            '链接 ': url,
            '基地 ID ': circle,
            '基地名称 ': title,
            '基地类型 ': OwnTypeText,
            '链接点击 PV ': pv || 0,
            '链接点击 UV ': uv || 0
          }
        })
      )

      Xlsx.utils.book_append_sheet(workbook, worksheet)
      Xlsx.writeFile(workbook, '基地站内信推广数据.csv', { raw: true, bookType: 'csv' })

      workbook = null
      worksheet = null
    }
  })

  const paramFormat = () => {
    const { date, ...args } = { ...form.getFieldsValue(true) }
    if (date) {
      const [startDay, endDay] = date
      const dayRange = {
        startDay: Number(
          moment(startDay)
            .startOf('day')
            .format('YYYYMMDD')
        ),
        endDay: Number(
          moment(endDay)
            .endOf('day')
            .format('YYYYMMDD')
        )
      }
      args.dayRange = dayRange
    }
    return args
  }

  const handleSearch = () => {
    const values = paramFormat()
    onSearch(values)
  }

  const exportData = () => {
    const search = paramFormat()
    getData({ variables: { limit: 10000, offset: 0, search } })
  }

  const resetFields = () => {
    form.resetFields()
    onSearch({})
  }

  return (
    <div className="search-box">
      <Form layout="inline" form={form}>
        <FormItem name="picker" label="数据纬度">
          <Radio checked>日维度</Radio>
        </FormItem>
        <FormItem name="date">
          <RangePicker />
        </FormItem>
        <FormItem>
          <div className="search-box__tip">数据更新至昨日23:59:59</div>
        </FormItem>
        <FormItem label="基地类型" name="ownType">
          <Select style={{ width: 120 }} placeholder="选择类型">
            {Reflect.ownKeys(TYPE).map(key => (
              <Option key={key} value={Number(key)}>
                {TYPE[key]}
              </Option>
            ))}
          </Select>
        </FormItem>
        <FormItem>
          <Space>
            <Button type="primary" onClick={() => handleSearch()}>
              查询
            </Button>
            <Button htmlType="button" onClick={resetFields}>
              重置
            </Button>
            <Tooltip title="一次最多可导出10000条数据">
              <Button loading={loading} onClick={() => exportData()}>
                导出
              </Button>
            </Tooltip>
          </Space>
        </FormItem>
      </Form>
    </div>
  )
}

Search.propTypes = {
  onSearch: PropTypes.func
}
