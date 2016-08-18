
import React from 'react'
import pathToRegexp from 'path-to-regexp'
import createHistory from './create-history'

const createRouter = (Comp) => {
  class Router extends React.Component {
    constructor ({ routes, pathname }) {
      super()
      this.state = {
        history: {},
        route: this.getRoute.bind(this)(routes, { pathname })
      }
      this.unlisten = () => {}
      this.getRoute = this.getRoute.bind(this)
    }

    getChildContext () {
      return this.state
    }

    componentDidMount () {
      const history = createHistory()
      const route = this.getRoute(this.props.routes, window.location)
      this.setState({
        history,
        route
      })
      this.unlisten = history.listen(this.handleHistoryChange.bind(this))
    }

    componentWillUnmount () {
      this.unlisten()
    }

    handleHistoryChange (location) {
      const route = this.getRoute(this.props.routes, location)
      this.setState({ route })
    }

    getRoute (routes, location) {
      const { pathname } = location
      const keys = []
      const params = {}

      const route = routes.reduce((a, b) => {
        const reg = pathToRegexp(b.path, keys)
        const match = reg.test(pathname)
        if (match) {
          const tokens = reg.exec(pathname)
          keys.forEach((key, i) => {
            params[key.name] = tokens[i + 1]
          })
          return b
        }
        return a
      }, null) || {}

      route.params = params
      return route
    }

    render () {
      return (
        <Comp
          {...this.props}
          {...this.state}
        />
      )
    }
  }

  Router.propTypes = {
    pathname: React.PropTypes.string,
    routes: React.PropTypes.array
  }

  Router.defaultProps = {
    routes: []
  }

  Router.childContextTypes = {
    history: React.PropTypes.object,
    route: React.PropTypes.object
  }

  return Router
}

export default createRouter

