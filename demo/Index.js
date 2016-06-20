
import React from 'react'
import { Link } from '../src'

const Index = (props, { route }) => {
  const links = Array.from({ length: 16 }).map((a, i) => i)

  return (
    <div>
      <h2>Index</h2>
      <ul>
        {links.map(i => (
          <li key={i}>
            <Link href={`/items/${i}`} children={`Item ${i}`} />
          </li>
        ))}
      </ul>
    </div>
  )
}

Index.contextTypes = {
  route: React.PropTypes.object
}

export default Index

