/* @flow */
import React, { PropTypes } from 'react'
import Hello from '../../../components/Hello'

function Home ({onClickGetItems, ...rests}) {
  return <div>
    Home
    <Hello/>
    <span
      onClick={onClickGetItems}
    >
      GET ITEMS
    </span>
  </div>
}

Home.propTypes = {
  onClickGetItems: PropTypes.func
}

export default Home
