
import React from 'react'
import ReactDOMServer from 'react-dom/server'
import { shallow } from 'enzyme'
import expect from 'expect'
import { Router } from '../src'

const Index = () => (
  <h1>Index</h1>
)

const Foo = () => (
  <h1>Foo</h1>
)

const App = (props, { route }) => {
  const Comp = route.component || 'div'
  return (
    <div>
      <Comp />
    </div>
  )
}

App.contextTypes = {
  route: React.PropTypes.object
}

const routes = [
  {
    path: '/',
    component: Index
  },
  {
    path: '/foo',
    component: Foo
  }
]

describe('<Router />', () => {
  describe('client-side rendering', () => {
  })

  describe('server-side rendering', () => {
    let html

    it('should not throw', () => {
      expect(() => {
        html = ReactDOMServer.renderToString(
          <Router routes={routes} pathname='/foo'>
            <App />
          </Router>
        )
      }).toNotThrow()
    })

    it('should render the given route', () => {
      expect(html).toMatch(/Foo/)
      expect(html).toNotMatch(/Index/)
    })
  })
})
