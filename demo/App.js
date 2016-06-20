
import React from 'react'
import { Link } from '../src'

const NotFound = () => (
  <div>
    404
  </div>
)


class App extends React.Component {
  render () {
    const { history, location, route } = this.context

    const sx = {
      root: {
        fontFamily: '-apple-system, sans-serif'
      }
    }

    const Comp = route.component || NotFound

    return (
      <div style={sx.root}>
        <h1>App</h1>
        <Link href='/' children='Home' />
        <Link href='/about' children='About' />
        <Link href='/derp' children='Derp' />
        <Comp />
      </div>
    )
  }
}

App.contextTypes = {
  history: React.PropTypes.object,
  location: React.PropTypes.object,
  route: React.PropTypes.object
}

export default App

