import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Layout } from 'antd'
import { getDefaultCollapsedSubMenus } from './sider-menu-utils'
import BaseMenu from './base-menu'

import './sider-menu.less'

const { Sider } = Layout

const SiderMenu = props => {
  const { title, collapsed, onCollapse, theme, isMobile } = props
  const [openKeys, setOpenKeys] = useState(getDefaultCollapsedSubMenus(props))
  const defaultProps = collapsed ? {} : { openKeys }

  const isMainMenu = key => {
    const { menuData } = props
    return menuData.some(item => (key ? item.key === key || item.path === key : false))
  }

  const handleOpenChange = openKeys => {
    const moreThanOne = openKeys.filter(openKey => isMainMenu(openKey)).length > 1
    setOpenKeys(moreThanOne ? [openKeys.pop()] : [...openKeys])
  }

  return (
    <Sider
      collapsible
      breakpoint="lg"
      width={256}
      trigger={null}
      theme={theme}
      collapsed={collapsed}
      onCollapse={collapse => {
        if (!isMobile) {
          onCollapse(collapse)
        }
      }}
      className="sider sider-menu"
    >
      <a id="logo" className="sider-logo" href={import.meta.env.BASE_URL}>
        <img
          className="sider-logo__img"
          src="https://web.bldimg.com/cblued/static/logo.1d8l3108cj75vd.png"
          alt="logo"
          width={40}
        />
        <h1 className="sider-logo__title">{title}</h1>
      </a>
      <BaseMenu
        {...props}
        mode="inline"
        handleOpenChange={handleOpenChange}
        onOpenChange={handleOpenChange}
        style={{ padding: '16px 0', width: '100%' }}
        {...defaultProps}
      />
    </Sider>
  )
}

SiderMenu.propTypes = {
  title: PropTypes.string.isRequired,
  collapsed: PropTypes.bool.isRequired,
  onCollapse: PropTypes.func.isRequired,
  theme: PropTypes.oneOf(['light', 'dark']).isRequired,
  isMobile: PropTypes.bool.isRequired,
  menuData: PropTypes.array.isRequired
}

export default SiderMenu
