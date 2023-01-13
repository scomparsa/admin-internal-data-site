import React from 'react'
import PropTypes from 'prop-types'
import { ApolloConsumer } from 'react-apollo'
import moment from 'moment'
import { RegionSelection } from 'admin-ui'
import { gatewayClient } from '@/apollo/client'
import { Form } from '@ant-design/compatible'
import { DatePicker, Select, Input, Checkbox, Button, Row, Col } from 'antd'
import staticResource from '../constants'
import queries from '../queries'

const FItem = Form.Item
const { RangePicker } = DatePicker
const formItemLayout = {
  labelCol: { span: 7 },
  wrapperCol: { span: 17 }
}
const { ad2Options, groupsData, showData, defaultShowData, defaultGroupsData, defaultAdType } = staticResource
const ConditionForm = ({ form, setTableList, setFormData }) => {
  const { getFieldDecorator, validateFields } = form

  const onSubmit = () => {
    validateFields(async (err, { selectTime, adId, showes, adType, ...reset }) => {
      if (!err) {
        let [start, end] = selectTime
        start = start.format('YYYYMMDD')
        end = end.format('YYYYMMDD')

        if (!adType) {
          adType = defaultAdType
        }

        const showesFilter = showes.filter(item => {
          return item !== 'isHotClick'
        })

        const search = {
          ...reset,
          showes: showesFilter,
          adType,
          selectTime: `${start},${end}`,
          adId: adId ? Number(adId) : null
        }

        const { data } = await gatewayClient.query({
          query: queries.GET_AD_DATA_QUERY,
          variables: { search }
        })

        setTableList(data.adData)
      }
    })
  }

  return (
    <Form>
      <Row gutter={24}>
        <Col span={8}>
          <FItem label="选择日期" {...formItemLayout}>
            {getFieldDecorator('selectTime', {
              initialValue: [moment(), moment()]
            })(<RangePicker format="YYYY-MM-DD" style={{ width: '100%' }} />)}
          </FItem>
        </Col>
        <Col span={7}>
          <FItem label="投放系统" {...formItemLayout}>
            {getFieldDecorator('platform', {
              initialValue: 0
            })(
              <Select>
                <Select.Option value={0}>全部</Select.Option>
                <Select.Option value={1}>Android</Select.Option>
                <Select.Option value={2}>iOS</Select.Option>
              </Select>
            )}
          </FItem>
        </Col>
        <Col span={9}>
          <FItem label="广告ID" {...formItemLayout}>
            {getFieldDecorator('adId')(<Input placeholder="请输入广告ID" />)}
          </FItem>
        </Col>
        <Col span={8}>
          <FItem label="类型" {...formItemLayout}>
            {getFieldDecorator('adType')(
              <Select placeholder="默认全选" mode="multiple">
                {Array.from(ad2Options).map(([val, title]) => (
                  <Select.Option key={val} value={val}>
                    {title}
                  </Select.Option>
                ))}
              </Select>
            )}
          </FItem>
        </Col>
        <Col span={7}>
          <FItem label="投放地区" {...formItemLayout}>
            {getFieldDecorator('region')(<RegionSelection onChange={region => form.setFieldsValue({ region })} />)}
          </FItem>
        </Col>
        <Col span={9}>
          <FItem label="展示指标" {...formItemLayout}>
            {getFieldDecorator('showes', {
              initialValue: defaultShowData
            })(
              <Checkbox.Group
                style={{ width: '100%' }}
                options={showData}
                onChange={val => setFormData(prevState => ({ ...prevState, show: val }))}
              />
            )}
          </FItem>
        </Col>
        <Col span={18}>
          <FItem label="分组条件" {...{ labelCol: { span: 3 }, wrapperCol: { span: 21 } }}>
            {getFieldDecorator('groups', {
              initialValue: defaultGroupsData
            })(
              <Checkbox.Group
                style={{ width: '100%' }}
                options={groupsData}
                onChange={val => setFormData(prevState => ({ ...prevState, groups: val }))}
              />
            )}
          </FItem>
        </Col>
        <Col span={6} style={{ textAlign: 'right' }}>
          <FItem wrapperCol={{ offset: 2 }}>
            <ApolloConsumer>
              {() => (
                <Button type="primary" onClick={() => onSubmit()}>
                  查询
                </Button>
              )}
            </ApolloConsumer>
          </FItem>
        </Col>
      </Row>
    </Form>
  )
}

ConditionForm.propTypes = {
  setTableList: PropTypes.func.isRequired,
  setFormData: PropTypes.func.isRequired
}

export default Form.create()(ConditionForm)
