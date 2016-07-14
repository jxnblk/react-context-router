
import React from 'react'
import ReactDOMServer from 'react-dom/server'
import { shallow, mount } from 'enzyme'
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

let ctx
const App = (props, context) => {
  ctx = context
  const Comp = context.route.component || 'div'

  return <Comp />
}

App.contextTypes = {
  history: React.PropTypes.object,
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
    if (typeof document === 'undefined') {
      return
    }
    let root
    let app

    it('should mount', () => {
      mount(<Router />)
    })

    it('should not throw', () => {
      expect(() => {
        root = mount(<Router routes={routes}><App /></Router>)
        app = root.find(App)
      }).toNotThrow()
    })

    it('should pass context to child components', () => {
      expect(ctx).toBeAn('object')
    })

    it('should pass history context', () => {
      expect(ctx.history).toBeAn('object')
      expect(ctx.history.push).toBeA('function')
    })

    it('should pass route context', () => {
      expect(ctx.route).toBeAn('object')
    })

    it('should have route params', () => {
      expect(ctx.route.params).toBeAn('object')
    })

    context('when changing routes', () => {
      let prevCtx

      before(() => {
        prevCtx = ctx
        ctx.history.push('/foo/32')
      })

      it('should change the route context', () => {
        expect(prevCtx.route !== ctx.route).toBe(true)
      })

      it('should have a route param', () => {
        expect(ctx.route.params.id).toEqual(32)
      })
    })
  })

  describe('getRoute()', () => {
    const instance = new Router({ routes })
    const route = instance.getRoute(routes, { pathname: '/foo/32' })

    it('should return a matched route', () => {
      expect(route).toBeAn('object')
    })

    it('should return params', () => {
      expect(route.params.id).toEqual(32)
    })
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
