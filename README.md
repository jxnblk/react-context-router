
# react-context-router

Minimal React router based on React context

[![Build Status](https://travis-ci.org/jxnblk/react-context-router.svg?branch=master)](https://travis-ci.org/jxnblk/react-context-router)

```sh
npm i react-context-router
```

[React Router](https://github.com/reactjs/react-router) is an excellent routing solution,
but sometimes it does a lot more than you need it to.
This is intended to be a smaller option with a simpler API.

## Features
- Small-ish package ~5KB
- Simple API
- One higher order component and two components: Router & Link
- Pass props directly to any component
- Pass anything through route context

## Usage

```js
// App.js
import React from 'react'
import { createRouter, Link } from 'react-context-router'

const NotFound = () => <div>Not Found</div>

const Nav = () => (
  <nav>
    <Link href='/' children='Home' />
    <Link href='/posts/1' children='First Post' />
  </nav>
)

class App extends React.Component {
  render () {
    const { route } = this.props
    const Comp = route.component || NotFound

    return (
      <div>
        <Nav />
        <Comp />
      </div>
    )
  }
}

export default createRouter(App)
```

```js
// entry.js
import React from 'react'
import ReactDOM from 'react-dom'
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

ReactDOM.render(<App routes={routes}>, div)
```

## Server-side rendering

Pass a `pathname` to the Router component to populate the context for a particular route.

```js
const React = require('react')
const ReactDOM = require('react-dom')
const h = React.createElement
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
  h(App, {
    routes,
    // Pass a value to the pathname prop for server side rendering
    pathname: '/posts/32'
  })
)
```

## API

### `createRouter`

Higher order component that provides history and route data through context.

#### `routes` prop
Array of route objects. Each route must include a `path`.
Any other value added to the object will be provided through context as the `route` object when the location matches the path.

#### `pathname` prop
Manually pass in a pathname to set the current path for server-side rendering.

#### Child Context
The wrapped component provides the following objects as context to its children:
- `history` wrapped `window.history` object with `listen` and `push` methods
- `route` object from the matching item in the `routes` prop. When a path contains parameters they will be passed as `route.params`.

### `<Router />` component

Component wrapped with `createRouter`, provided as a convenience.

### `<Link />` component

Used in place of `<a>` links to use client-side history navigation.


### Size comparison

Gzip:
- react-context-router: 19.04 KB (5.13 KB without React)
- react-router: 40.29 KB with React
- Baseline react 14.52 KB

*Results from [bundle-size](https://npmjs.com/package/bundle-size)*

MIT License

