
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

const Bar = (props, context) => (
  <h1>Bar {context.route.params.id}</h1>
)
Bar.contextTypes = {
  route: React.PropTypes.object
}

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
  },
  {
    path: '/foo/:id',
    component: Bar
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

    it('should pass url params', () => {
      html = ReactDOMServer.renderToString(
        <Router routes={routes} pathname='/foo/32'>
          <App />
        </Router>
      )
      expect(html).toMatch(/Bar.+32/)
      expect(html).toNotMatch(/Index|Foo/)
    })
  })
})
