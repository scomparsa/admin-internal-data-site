import React from 'react'
import PropTypes from 'prop-types'
import Header from './header'

import './index.less'

const GlobalHeader = props => (
  <header className="global-header" style={{ width: '100%' }}>
    <Header {...props} />
  </header>
)

GlobalHeader.propTypes = {
  collapsed: PropTypes.bool.isRequired,
  isMobile: PropTypes.bool,
  setting: PropTypes.object
}

GlobalHeader.defaultProps = {
  isMobile: false,
  setting: {}
}

export default GlobalHeader
