import React from 'react'
import PropTypes from 'prop-types'
import { Drawer } from 'antd'
import SiderMenu from './sider-menu'
import { getFlatMenuKeys } from './sider-menu-utils'

const SidermenuWrapper = React.memo(props => {
  const { isMobile, menuData, collapsed, onCollapse, pathPrefix } = props
  const flatMenuKeys = getFlatMenuKeys(menuData, pathPrefix)

  return isMobile ? (
    <Drawer
      visible={!collapsed}
      placement="left"
      onClose={() => onCollapse(true)}
      style={{ padding: 0, height: '100vh' }}
    >
      <SiderMenu {...props} flatMenuKeys={flatMenuKeys} collapsed={isMobile ? false : collapsed} />
    </Drawer>
  ) : (
    <SiderMenu {...props} flatMenuKeys={flatMenuKeys} />
  )
})

SidermenuWrapper.propTypes = {
  isMobile: PropTypes.bool.isRequired,
  menuData: PropTypes.array.isRequired,
  collapsed: PropTypes.bool.isRequired,
  onCollapse: PropTypes.func.isRequired,
  pathPrefix: PropTypes.string
}

export default SidermenuWrapper
