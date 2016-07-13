
# react-context-router

Minimal React router based on React context

```sh
npm i react-context-router
```

React Router is an excellent routing solution,
but sometimes it does a lot more than you need it to.
This is intended to be a smaller option with a simpler API,
while still using some of the same core modules as React Router.

## Features
- Small-ish package ~30KB
- Simple API
- Only two components: Router & Link
- Pass props directly to any component
- Pass anything through route context

## Usage

```js
// entry.js
import React from 'react'
import ReactDOM from 'react-dom'
import { Router } from 'react-context-router'
import App from './App'
import Index from './Index'
import Post from './Post'

const routes = [
  {
    path: '/',
    // Put any other route data here.
    // This object will be provided through
    // React context to the Router's children.
    component: Index
  },
  {
    path: '/posts/:id',
    component: Post
  }
]

const div = document.getElementById('app')

ReactDOM.render(
  <Router routes={routes}>
    <App />
  </Router>,
  div
)
```

```js
// App.js
import React from 'react'
import { Link } from 'react-context-router'

const Nav = () => (
  <nav>
    <Link href='/' children='Home' />
    <Link href='/posts/1' children='First Post' />
  </nav>
)

class App extends React.Component {
  render () {
    const { router } = this.context
    const Comp = route.component || <div>Page Not Found</div>

    return (
      <div>
        <Nav />
        <Comp />
      </div>
    )
  }
}

App.contextTypes = {
  history: React.PropTypes.object,
  location: React.PropTypes.object,
  router: React.PropTypes.object
}

export default App
```

## Server-side rendering

Pass a `pathname` to the Router component to populate the context for a particular route.

```js
const React = require('react')
const ReactDOM = require('react-dom')
const h = React.createElement
const { Router } = require('react-context-router')
const App = require('./App')

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
  h(Router, {
    routes,
    // Pass a value to the pathname prop for server side rendering
    pathname: '/posts/32'
  }, [
    h(App, { key: 0 })
  ])
)
```

## API

### `<Router />` component

Higher order component that provides history, location, and route data through context.

#### `routes` prop
Array of route objects. Each route must include a `path`.
Any other value added to the object will be provided through context as the `route` object when the location matches the path.

#### `pathname` prop
Manually pass in a pathname to set the current path in server-side rendering.

#### Child Context
The Router component provides the following objects as context to its children:
- `history` object from the [history](https://npmjs.com/package/history) package
- `location` object from the history package
- `route` object from the matching item in the `routes` prop. When a path contains parameters they will be passes as `route.params`.

### `<Link />` component
Used in place of `<a>` links to use client-side history navigation.


### Size comparison

Gzip:
- react-router: 42.85 KB
- react-context-router: 29.19 KB
- Baseline react and react-dom: 82.22 KB

*Results from [bundle-size](https://npmjs.com/package/bundle-size)*

MIT License
