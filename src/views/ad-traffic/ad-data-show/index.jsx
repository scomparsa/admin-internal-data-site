import React, { useState, useRef } from 'react'
import { findDOMNode } from 'react-dom'
import Layout from '@/layouts'
import { ExportOutlined } from '@ant-design/icons'
import { Card, Button } from 'antd'
import XLSX from 'xlsx'
import ConditionForm from './_condition-form'
import TableList from './_table-list'
import staticResource from './constants'

const { defaultShowData, defaultGroupsData } = staticResource
const adData = () => {
  const tableRef = useRef(null)
  const [tableList, setTableList] = useState(null)
  const [formData, setFormData] = useState({ groups: defaultGroupsData, show: defaultShowData })

  const handleExportToCsv = () => {
    if (tableRef.current) {
      const tableNode = findDOMNode(tableRef.current)
      const wb = XLSX.utils.table_to_book(tableNode, { raw: true })
      XLSX.writeFile(wb, `广告数据展示.xlsx`)
    }
  }

  return (
    <Layout>
      <Card
        title="广告数据展示"
        extra={
          <Button icon={<ExportOutlined />} onClick={handleExportToCsv}>
            导出数据
          </Button>
        }
      >
        <ConditionForm setTableList={setTableList} setFormData={setFormData} />
      </Card>

      <TableList dataSource={tableList} formData={formData} ref={tableRef} />
    </Layout>
  )
}

export default adData
