
import React from 'react'
import ReactDOM from 'react-dom'
import { Router } from '../src'
import App from './App'
import Index from './Index'
import About from './About'
import Detail from './Detail'

const div = document.getElementById('app')

const routes = [
  {
    path: '/',
    component: Index
  },
  {
    path: '/about',
    component: About
  },
  {
    path: '/items/:id',
    component: Detail
  }
]

ReactDOM.render(
  <Router routes={routes}>
    <App />
  </Router>,
  div
)

