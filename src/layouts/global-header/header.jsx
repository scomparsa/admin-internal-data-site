import React from 'react'
import PropTypes from 'prop-types'
import { Col, Dropdown, Menu, Row, Avatar, Space } from 'antd'
import { LogoutOutlined, MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons'
import { logout } from '@/utils/auth'

const Header = ({ collapsed, onCollapse, user }) => {
  const [firstLetter] = user?.email || []

  const menu = (
    <Menu
      onClick={({ key }) => {
        if (key === 'logout') {
          logout()
        }
      }}
    >
      <Menu.Item key="logout">
        <Space>
          <LogoutOutlined />
          退出登录
        </Space>
      </Menu.Item>
    </Menu>
  )

  const toggle = evt => {
    evt.preventDefault()

    onCollapse(!collapsed)
  }

  return (
    <Row type="flex" justify="space-between" style={{ paddingRight: 24 }}>
      <Col>
        <a className="global-header__action global-header__action--triggered" href="#" onClick={toggle}>
          {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        </a>
      </Col>
      <Col>
        <Dropdown placement="bottomCenter" overlay={menu}>
          <div>
            {user.avatar ? (
              <Avatar size="small" src={user.avatar} />
            ) : (
              <Avatar size="small">{firstLetter?.toUpperCase()}</Avatar>
            )}
            <span className="u-margin-left-xs">{user.name}</span>
          </div>
        </Dropdown>
      </Col>
    </Row>
  )
}

Header.propTypes = {
  collapsed: PropTypes.bool.isRequired,
  onCollapse: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
}

export default Header
