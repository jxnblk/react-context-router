
import React from 'react'

const Link = ({
  href,
  ...props
}, {
  history,
  location
}) => {
  const handleClick = (e) => {
    e.preventDefault()
    history.push(href)
  }

  return (
    <a {...props}
      href={href}
      onClick={handleClick} />
  )
}

Link.contextTypes = {
  history: React.PropTypes.object,
  location: React.PropTypes.object
}

export default Link

