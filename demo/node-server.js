// Server-side rendering demo
// Run `node demo/node-server.js` using Node ^v6

const React = require('react')
const ReactDOMServer = require('react-dom/server')
const { Router, Link } = require('..')
const h = React.createElement

const App = (props, context) => {
  return (
    h('div', {}, [
      h('span', { key: 0 }, 'Current route:'),
      h('pre', { key: 1 }, JSON.stringify(context.route, null, 2))
    ])
  )
}
App.contextTypes = {
  route: React.PropTypes.object
}

const routes = [
  {
    path: '/',
    name: 'Index'
  },
  {
    path: '/posts/:id',
    name: 'Post'
  }
]

const html = ReactDOMServer.renderToString(
  h(Router, { routes, pathname: '/posts/32' }, [
    h(App, { key: 0 })
  ])
)

console.log(html)

