import React from 'react'
import PropTypes from 'prop-types'
import { Icon as LegacyIcon } from '@ant-design/compatible'
import { Menu } from 'antd'
import { Link } from '@reach/router'
import { getMenuMatches } from './sider-menu-utils'
import urlToList from '../utils/path-tools'

const { SubMenu } = Menu

const getIcon = icon => {
  if (typeof icon === 'string') {
    return <LegacyIcon type={icon} />
  }
  return icon
}

const BaseMenu = props => {
  const {
    openKeys,
    theme,
    mode,
    location: { pathname },
    collapsed,
    handleOpenChange,
    style,
    menuData,
    pathPrefix
  } = props

  // Get the currently selected menu
  const getSelectedMenuKeys = pathname => {
    const { flatMenuKeys } = props
    return urlToList(pathname).map(itemPath => getMenuMatches(flatMenuKeys, itemPath).pop())
  }

  let selectedKeys = getSelectedMenuKeys(pathname).filter(key => key)
  if (!selectedKeys.length && openKeys) {
    selectedKeys = [openKeys[openKeys.length - 1]]
  }

  let menuProps = {}
  if (openKeys && !collapsed) {
    menuProps = {
      openKeys: openKeys.length === 0 ? [...selectedKeys] : openKeys
    }
  }

  const conversionPath = path => {
    if (path && path.indexOf('http') === 0) {
      return path
    }
    return `/${path || ''}`.replace(/\/+/g, '/')
  }

  const getMenuItemPath = (item, pathPrefix) => {
    const { name } = item
    const itemPath = conversionPath(`${pathPrefix}${item.path}`)
    const icon = getIcon(item.icon)
    const { target } = item
    const START_WITH_HTTPS_REGEX = /^https?:\/\//
    if (START_WITH_HTTPS_REGEX.test(itemPath)) {
      return (
        <a href={itemPath} target={target}>
          <span>{name}</span>
        </a>
      )
    }
    const { location, isMobile, onCollapse } = props

    return (
      <Link
        to={itemPath}
        target={target}
        replace={itemPath === location.pathname}
        onClick={isMobile ? () => onCollapse(true) : undefined}
      >
        {icon}
        <span>{name}</span>
      </Link>
    )
  }

  const getSubMenuOrItem = item => {
    if (item.children && !item.hideChildrenInMenu && item.children.some(child => child.name)) {
      const { name } = item
      return (
        <SubMenu
          key={pathPrefix + item.path}
          title={
            item.icon ? (
              <span>
                {getIcon(item.icon)}
                <span>{name}</span>
              </span>
            ) : (
              name
            )
          }
        >
          {/* eslint-disable-next-line no-use-before-define */}
          {getNavMenuItems(item.children)}
        </SubMenu>
      )
    }

    return <Menu.Item key={pathPrefix + item.path}>{getMenuItemPath(item, pathPrefix)}</Menu.Item>
  }

  const getNavMenuItems = (menusData, parent) => {
    if (!menusData) return []

    return menusData
      .filter(item => item.name && !item.hideInMenu)
      .map(item => getSubMenuOrItem(item, parent))
      .filter(item => item)
  }

  return (
    <Menu
      key="Menu"
      mode={mode}
      theme={theme}
      onOpenChange={handleOpenChange}
      selectedKeys={selectedKeys}
      style={style}
      // className={cls}
      {...menuProps}
    >
      {getNavMenuItems(menuData)}
    </Menu>
  )
}

BaseMenu.propTypes = {
  openKeys: PropTypes.array,
  theme: PropTypes.oneOf(['light', 'dark']),
  mode: PropTypes.oneOf(['vertical', 'horizontal', 'inline']),
  location: PropTypes.object.isRequired,
  style: PropTypes.object,
  menuData: PropTypes.array,
  flatMenuKeys: PropTypes.array,
  collapsed: PropTypes.bool.isRequired,
  isMobile: PropTypes.bool.isRequired,
  handleOpenChange: PropTypes.func.isRequired,
  onCollapse: PropTypes.func.isRequired,
  pathPrefix: PropTypes.string.isRequired
}

export default BaseMenu
