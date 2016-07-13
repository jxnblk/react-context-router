
# react-context-router

Minimal React router based on React context

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

production bundles
- baseline: 140 KB
- context-router: 168 KB (186 KB w/ lodash.find)
- react-router: 193 KB

---

- baseline: 210 KB
- react-router: 276 KB
- context-router: 259 KB (with lodash.find)

- context-router: 241 KB (with native find)


total 1344
-rw-r--r--  1 jackson  staff  140787 Jul 13 13:07 base.js
-rw-r--r--  1 jackson  staff  172210 Jul 13 13:07 bundle.js
-rw-r--r--  1 jackson  staff  168819 Jul 13 13:07 mini.js
-rw-r--r--  1 jackson  staff  193776 Jul 13 13:07 react-router.js


total 1992
-rw-r--r--  1 jxn  staff  210817 Jun 19 14:16 base.js
-rw-r--r--  1 jxn  staff  262778 Jun 19 14:16 bundle.js
-rw-r--r--  1 jxn  staff  259387 Jun 19 14:16 mini.js
-rw-r--r--  1 jxn  staff  276059 Jun 19 14:16 react-router.js

---

total 1912
-rw-r--r--  1 jxn  staff  210817 Jun 19 13:58 base.js
-rw-r--r--  1 jxn  staff  244770 Jun 19 13:58 bundle.js
-rw-r--r--  1 jxn  staff  241379 Jun 19 13:58 mini.js
-rw-r--r--  1 jxn  staff  276051 Jun 19 13:58 react-router.js

---

total 1992
-rw-r--r--  1 jxn  staff  210817 Jun 19 13:54 base.js
-rw-r--r--  1 jxn  staff  262571 Jun 19 13:54 bundle.js
-rw-r--r--  1 jxn  staff  259180 Jun 19 13:54 mini.js
-rw-r--r--  1 jxn  staff  276059 Jun 19 13:54 react-router.js

---

total 2256
-rw-r--r--  1 jxn  staff     132 Jun 12 21:07 About.js
-rw-r--r--  1 jxn  staff     745 Jun 19 13:37 App.js
-rw-r--r--  1 jxn  staff     260 Jun 19 13:32 Detail.js
-rw-r--r--  1 jxn  staff     462 Jun 19 13:34 Index.js
-rw-r--r--  1 jxn  staff      60 Jun 19 13:47 base.js
-rw-r--r--  1 jxn  staff  210817 Jun 19 13:50 basebundle.js
-rw-r--r--  1 jxn  staff  311455 Jun 19 13:50 bundle.js
-rw-r--r--  1 jxn  staff     494 Jun 19 13:31 entry.js
-rw-r--r--  1 jxn  staff      71 Jun 19 13:30 index.html
-rw-r--r--  1 jxn  staff      99 Jun 19 13:47 mini.js
-rw-r--r--  1 jxn  staff  308070 Jun 19 13:50 minibundle.js
-rw-r--r--  1 jxn  staff     111 Jun 19 13:47 react-router.js
-rw-r--r--  1 jxn  staff  276053 Jun 19 13:50 rrouterbundle.js
