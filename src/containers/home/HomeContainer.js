/* @flow */
import { connect } from 'react-redux'
import React from 'react'
import type { Dispatcher, Connector } from '../../types'
import Home from './components/Home'
import type {Action, State} from './reducers'
import { getItems } from './reducers'

function HomeContainer (
  props: State & Dispatcher<Action>
) {
  return (
    <Home
      {...props}
      dispatch={props.dispatch}
      onClickGetItems={getItems}
    />
  )
}

const connector: Connector<{}, State, Action> = connect(({ home }) => home)

export default connector(HomeContainer)
