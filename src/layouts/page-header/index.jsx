import React from 'react'
import PropTypes from 'prop-types'
import { PageHeader as AntdPageHeader } from 'antd'

const PageHeader = ({ title, ...rest }) => {
  return <AntdPageHeader {...rest} style={{ paddingBottom: 0 }} title={title} />
}

PageHeader.propTypes = {
  title: PropTypes.string
}

export default PageHeader
