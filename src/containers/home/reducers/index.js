/* @flow */
import { createAction } from 'redux-actions'
import axios from 'axios'

export type Action =
  {
    type: 'GET_ITEMS'
  }

export type State = {
  items: Array<any>
}

const initialState: State = {
  items: []
}

export default (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case 'GET_ITEMS':
      return initialState
    default:
      return state
  }
}

export const getItems = createAction('GET_ITEMS', async () => {
  const result = await axios.get('http://localhost:3000/items')
  return result.body
})
