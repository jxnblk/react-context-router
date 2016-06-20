
import React from 'react'

const Detail = (props, context) => {
  const { params } = context.route
  return (
    <div>
      <h1>Item Detail {params.id}</h1>
    </div>
  )
}

Detail.contextTypes = {
  route: React.PropTypes.object
}

export default Detail

