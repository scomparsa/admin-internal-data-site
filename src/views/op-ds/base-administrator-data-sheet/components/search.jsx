import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { DatePicker, Select, Form, Button, Space, Tooltip } from 'antd'
import moment from 'moment'
import { TYPE, PICKER_TEXT } from '../../constants'

import './index.less'

const FormItem = Form.Item
const { RangePicker } = DatePicker
const { Option } = Select

export const Search = ({ onSearch, exportCsv }) => {
  const [picker, setPicker] = useState('date')
  const [form] = Form.useForm()

  const paramFormat = () => {
    const { date, ...args } = { ...form.getFieldsValue(true) }
    if (date) {
      const [startDay, endDay] = date
      const dayRange = {
        startDay: Number(
          moment(startDay)
            .startOf(picker)
            .format('YYYYMMDD')
        ),
        endDay: Number(
          moment(endDay)
            .endOf(picker)
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

  const handleExportCsv = () => {
    const values = paramFormat()
    exportCsv(values)
  }

  const resetFields = () => {
    setPicker('date')
    form.resetFields()
    form.setFieldsValue({ picker: 'date' })
    onSearch({})
  }

  return (
    <div className="search-box">
      <Form layout="inline" form={form}>
        <FormItem name="picker" initialValue="date">
          <Select placeholder="选择查询的日期类型" onChange={value => setPicker(value)}>
            <Option key="date">按日</Option>
            <Option key="week">按周</Option>
            <Option key="month">按月</Option>
          </Select>
        </FormItem>
        <FormItem name="date">
          <RangePicker picker={picker} />
        </FormItem>
        <FormItem>
          <div className="search-box__tip">{PICKER_TEXT[picker]}</div>
        </FormItem>
        <FormItem label="基地类型" name="ownType">
          <Select placeholder="选择类型">
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
            <Tooltip title="一次只能导出10000条数据">
              <Button onClick={() => handleExportCsv()}>导出</Button>
            </Tooltip>
          </Space>
        </FormItem>
      </Form>
    </div>
  )
}

Search.propTypes = {
  onSearch: PropTypes.func,
  exportCsv: PropTypes.func
}
