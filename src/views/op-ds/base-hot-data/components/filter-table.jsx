import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import Xlsx from 'xlsx'
import { Form, Button, Space, Tooltip, DatePicker, message } from 'antd'
import { useLazyQuery } from 'react-apollo'
import { gatewayClient } from '@/apollo/client'
import { OP_HOT_DATA } from './queries'
import { exportXlsx } from './export-xlsx'
import { HOT_TYPE } from '../../constants'

const FormItem = Form.Item

export const FilterTabs = props => {
  const { option, callback, onSearch, selectionType, pageorder, defaultStartTime, defaultEndTime } = props
  const { RangePicker } = DatePicker
  const [form] = Form.useForm()

  const [label, setLabel] = useState([])
  const [buttonValue, setButtonValue] = useState([])
  const [prevIndex, setPrevIndex] = useState(1)
  const [date, setDate] = useState([defaultStartTime, defaultEndTime])
  const [defaultPageorder, setDefaultPageorder] = useState('commentNum')
  const initalDefaultStartTime = moment.unix(defaultStartTime).format('YYYY-MM-DD')
  const initalDefaultEndTime = moment.unix(defaultEndTime).format('YYYY-MM-DD')

  /* 设置初始值 */
  useEffect(() => {
    setLabel(Object.keys(option))
    setButtonValue(option[Object.keys(option)])
    if (Object.keys(option)[0] === '热门基地贴排序:') {
      setPrevIndex(1)
    } else if (Object.keys(option)[0] === '热门超话排序:') {
      setPrevIndex(0)
    } else {
      setPrevIndex(0)
    }
  }, [option])

  /* 数据请求 */
  const [getData, { loading }] = useLazyQuery(OP_HOT_DATA, {
    client: gatewayClient,
    onCompleted: data => {
      const edges = data ? data?.opHotData?.edges : []

      if (!edges || !edges.length) {
        message.warning('当前没有你需要导出的数据！')
        return false
      }
      let workbook = { SheetNames: [], Sheets: {} }
      let worksheet = Xlsx.utils.json_to_sheet(exportXlsx(selectionType, edges))

      Xlsx.utils.book_append_sheet(workbook, worksheet)
      Xlsx.writeFile(workbook, '国内热门数据.csv', { raw: true, bookType: 'csv' })

      workbook = null
      worksheet = null
    }
  })

  /* 参数格式整合 */
  const paramMerge = (type, date) => {
    const paramMergeObj = { type }
    if (date) {
      const [startDay, endDay] = date
      paramMergeObj.startTime = moment(startDay)
        .startOf('day')
        .unix()
      paramMergeObj.endTime = moment(endDay)
        .endOf('day')
        .unix()
    }
    paramMergeObj.order = pageorder
    return paramMergeObj
  }

  /* 导出数据 */
  const exportData = () => {
    getData({
      variables: {
        limit: 500,
        offset: 0,
        order: pageorder,
        search: { type: selectionType, startTime: date[0], endTime: date[1] }
      }
    })
  }

  /* 查询内容 */
  const handleSearch = () => {
    const [startDay, endDay] = date
    const startSelectTime = moment(Number(String(startDay).padEnd(13, '0'))).format('YYYY-MM-DD')
    const endSelectTime = moment(Number(String(endDay).padEnd(13, '0'))).format('YYYY-MM-DD')
    const diffDay = moment(startSelectTime).diff(moment(endSelectTime), 'days') * -1
    if (selectionType === HOT_TYPE.HOTPOST) {
      if (diffDay > 365) {
        return message.error('时间选择错误，热门基地贴只能查询区间范围366天内的数据哦')
      }
    }
    if (selectionType === HOT_TYPE.TOPIC) {
      if (diffDay > 365) {
        return message.error('时间选择错误，热门超话只能查询区间范围366天内的数据哦')
      }
    }
    if (selectionType === HOT_TYPE.DYNAMIC) {
      if (diffDay > 92) {
        return message.error('时间选择错误，热门动态只能查询区间范围93天内的数据哦')
      }
    }
    const newDate = [Number(String(startDay).padEnd(13, '0')), Number(String(endDay).padEnd(13, '0'))]
    const values = paramMerge(selectionType, newDate)
    onSearch(values)
  }

  /* 重置表单 */
  const resetFields = () => {
    if (Object.keys(option)[0] === '热门基地贴排序:') {
      setPrevIndex(1)
      setDefaultPageorder('commentNum')
    } else if (Object.keys(option)[0] === '热门超话排序:') {
      setPrevIndex(0)
      setDefaultPageorder('realFeedNum')
    } else {
      setPrevIndex(0)
      setDefaultPageorder('likeNum')
    }
    setDate([defaultStartTime, defaultEndTime])
    const values = {
      order: defaultPageorder,
      type: selectionType,
      startTime: defaultStartTime,
      endTime: defaultEndTime
    }
    onSearch(values)
    form.setFieldsValue({
      selectDate: [moment(initalDefaultStartTime, 'YYYY-MM-DD'), moment(initalDefaultEndTime, 'YYYY-MM-DD')]
    })
  }

  /* 获取时间 */
  const handleChangeDate = prevdate => {
    const dateValue = paramMerge(selectionType, prevdate, prevIndex)
    setDate([dateValue.startTime, dateValue.endTime])
  }

  /* 点击切换高亮拿到值 */
  const handleClick = index => {
    setPrevIndex(index)
    callback(index)
    paramMerge(index, date, selectionType)
  }

  return (
    <Form style={{ marginTop: '20px' }} form={form}>
      <FormItem label={label[0]} name="buttonValueItem">
        <>
          {buttonValue.map((item, index) => (
            <Button
              onClick={() => {
                handleClick(index)
              }}
              type={prevIndex === index ? 'primary' : 'default'}
              key={index}
            >
              {item}
            </Button>
          ))}
        </>
      </FormItem>
      <FormItem
        layout="inline"
        label="发布日期"
        name="selectDate"
        initialValue={[moment(initalDefaultStartTime, 'YYYY-MM-DD'), moment(initalDefaultEndTime, 'YYYY-MM-DD')]}
        extra="若发布日期项为空，默认查询上一日发布内容的数据;数据更新至昨日23:59:59"
      >
        <RangePicker onChange={handleChangeDate} />
      </FormItem>
      <FormItem name="result">
        <>
          <Space>
            <Button type="primary" onClick={handleSearch}>
              查询
            </Button>
            <Button htmlType="button" onClick={resetFields}>
              重置
            </Button>
          </Space>
          <Tooltip title="一次最多可导出500条数据" className="search-box__export">
            <Button loading={loading} onClick={exportData}>
              导出
            </Button>
          </Tooltip>
        </>
      </FormItem>
    </Form>
  )
}

FilterTabs.propTypes = {
  callback: PropTypes.func,
  option: PropTypes.object,
  selectionType: PropTypes.number,
  onSearch: PropTypes.func,
  pageorder: PropTypes.string,
  defaultStartTime: PropTypes.number,
  defaultEndTime: PropTypes.number
}
