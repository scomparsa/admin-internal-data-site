module.exports = {
  client: {
    tagName: 'gql',
    includes: ['./src/**/*.{js,jsx}'],
    service: {
      name: 'admin-server',
      url: 'http://localhost:8006/graphql'
    }
  }
}
