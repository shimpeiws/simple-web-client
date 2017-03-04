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
  axios.defaults.baseURL = 'http://localhost:3000/'
  axios.defaults.timeout = 3000
  axios.defaults.headers.post['Content-Type'] = 'application/json'
  const userTokenResult = await axios.post(
    'user_token',
    {
      auth: {
        email: 'test@example.com',
        password: 'test123'
      }
    }
  )
  const jwtToken = userTokenResult.data.jwt
  const instance = axios.create({
    headers: {
      'Authorization': `Bearer ${jwtToken}`
    }
  })
  const result = instance.get('http://localhost:3000/items')
  return result.body
})
