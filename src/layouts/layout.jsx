/* eslint-disable react/no-multi-comp */
import React, { useState, memo } from 'react'
import { Query } from 'react-apollo'
import { gql } from 'apollo-boost'
import PropTypes from 'prop-types'
import { Layout, BackTop } from 'antd'
import { Location } from '@reach/router'
import { isLogin, logout } from '@/utils/auth'
import { siteMetadata } from '~/config'
import SiderMenu from './sider-menu'
import GlobalHeader from './global-header'
import PageHeader from './page-header'
import useMenu from './hooks'
import SEO from './seo'

import './layout.less'

const { Content } = Layout

const GET_ADMIN_USER_PERMISSIONS = gql`
  query GetAdminUserPermissions {
    adminUser {
      id
      name
      avatar
      email
      roles {
        id
        permissions {
          alias
        }
        platform
      }
    }
  }
`

const BasicLayout = memo(({ children, loginUser, visibilityHeight, props, customPageHeader, pageHeaderProps }) => {
  const { menuData, breadcrumbNameMap } = useMenu()
  const [collapsed, setCollapsed] = useState(false)

  const { menuLinks } = siteMetadata

  return (
    <Layout style={{ flexDirection: 'row' }}>
      <BackTop visibilityHeight={visibilityHeight} />
      <Query query={GET_ADMIN_USER_PERMISSIONS}>
        {({ data = {} }) => {
          if (!Object.prototype.hasOwnProperty.call(data, 'adminUser')) {
            return null
          }

          const permissionAliases = Array.from(
            new Set(
              data.adminUser.roles.reduce((accumulator, role) => {
                const aliases = role.permissions.map(permission => permission.alias)
                return [...aliases, ...accumulator]
              }, [])
            )
          )

          // 经过权限过滤之后的菜单
          const renderMenu = []

          menuData.forEach(item => {
            if (item.children) {
              if (item.children.some(route => permissionAliases.includes(route.alias))) {
                // 需要一次判断子元素的权限是否存在
                const checkChild = item.children.filter(({ alias }) => permissionAliases.includes(alias))
                renderMenu.push({ ...item, children: checkChild })
              }
            } else if (permissionAliases.includes(item.alias)) {
              renderMenu.push(item)
            }
          })

          return (
            <Location>
              {({ location }) => {
                const currentPath = `${location.pathname.replace(/\/+$/, '')}`
                let currentMenuLink

                menuLinks.forEach(menuLink => {
                  if (menuLink.path && currentPath.endsWith(menuLink.path)) {
                    currentMenuLink = menuLink
                    return
                  }

                  const { routes = [] } = menuLink
                  routes.forEach(subMenuLink => {
                    if (subMenuLink?.path && currentPath.endsWith(subMenuLink?.path)) {
                      currentMenuLink = subMenuLink
                    }
                  })
                })

                const alias = currentMenuLink?.alias
                const title = currentMenuLink ? currentMenuLink.name : '首页'

                if (loginUser) loginUser(data.adminUser)

                return (
                  <>
                    <SEO title={title} />
                    <SiderMenu
                      theme="dark"
                      isMobile={false}
                      title={siteMetadata.title}
                      pathPrefix={siteMetadata.pathPrefix}
                      collapsed={collapsed}
                      onCollapse={setCollapsed}
                      menuData={renderMenu}
                      location={location}
                      {...props}
                    />
                    <Layout style={{ minHeight: '100vh' }}>
                      <GlobalHeader collapsed={collapsed} onCollapse={setCollapsed} user={data.adminUser} />
                      {customPageHeader ||
                        (currentMenuLink && (
                          <PageHeader {...pageHeaderProps} routes={breadcrumbNameMap[currentPath]} title={title} />
                        ))}
                      <Content className="content">
                        {alias && !permissionAliases.includes(alias) ? '权限不足' : children}
                      </Content>
                      <footer className="footer">{`©${new Date().getFullYear()}`}</footer>
                    </Layout>
                  </>
                )
              }}
            </Location>
          )
        }}
      </Query>
    </Layout>
  )
})

BasicLayout.propTypes = {
  children: PropTypes.node.isRequired,
  visibilityHeight: PropTypes.number,
  props: PropTypes.object,
  customPageHeader: PropTypes.any,
  pageHeaderProps: PropTypes.object,
  loginUser: PropTypes.func
}

export default props => {
  if (!isLogin()) {
    logout()
    return null
  }
  return <BasicLayout {...props} />
}
