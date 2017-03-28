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
  const result = await axios
    .all([
      instance.get('items'),
      instance.get('categories')
    ])
    .then(
      axios.spread((itemResult, categoryResult) => {
        return {
          items: itemResult.data.data,
          categories: categoryResult.data.data
        }
      })
    )
  const comments = await axios
    .all(
      result.items.map((item) => instance.get(`comments/${item.id}`))
    )
    .then((comments) => {
      return comments.map((comment) => comment.data.data)
    })
  console.info('result', result)
  console.info('comments', comments)
  return Object.assign({}, result, { comments })
})
