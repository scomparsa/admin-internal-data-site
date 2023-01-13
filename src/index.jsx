import React from 'react'
import { render } from 'react-dom'
import { Buffer } from 'buffer'
import { App } from './app'
import { isProd } from './utils/env'

if (isProd) {
  window.Raven.config('', {
    ignoreErrors: ['Uncaught (in promise) Error: GraphQL error: no permission'],
    ignoreUrls: []
  }).install()
}

window.Buffer = Buffer

render(<App />, document.getElementById('app'))
