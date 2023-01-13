import React from 'react'
import { Query } from 'react-apollo'
import { gql } from 'apollo-boost'
import Layout from '../layouts'

import './index.less'

const GET_ADMIN_USER = gql`
  query GetAdminUser {
    adminUser {
      name
      roles {
        name
      }
    }
  }
`

export default () => (
  <Query query={GET_ADMIN_USER}>
    {({ data }) => {
      if (!data?.adminUser) {
        return null
      }

      const { name, roles } = data.adminUser

      return (
        <Layout>
          <div className="dashboard">
            <div className="dashboard__title">{`你好，${name}，祝你开心快乐每一天！`}</div>
            <div className="dashboard__desc">{roles.map(role => role.name).join(', ')}</div>
          </div>
        </Layout>
      )
    }}
  </Query>
)
