import React from 'react'
import { Button } from 'antd'
import { Link } from '@reach/router'

import './404.less'

const NotFoundPage = () => (
  <>
    <div className="exception">
      <div className="exception__img-block">
        <div
          className="exception__img-ele"
          style={{ backgroundImage: 'url("https://gw.alipayobjects.com/zos/rmsportal/KpnpchXsobRgLElEozzI.svg")' }}
        />
      </div>
      <div className="exception__content">
        <h1>404</h1>
        <div className="exception__content__desc">抱歉，你访问的页面不存在</div>
        <Button type="primary">
          <Link to="/">返回首页</Link>
        </Button>
      </div>
    </div>
    <footer className="exception__footer">{`©${new Date().getFullYear()} Admin Team`}</footer>
  </>
)

export default NotFoundPage
