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

const getJwtToken = async () => {
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
  return userTokenResult.data.jwt
}

const getInstane = async () => {
  const jwtToken = await getJwtToken()
  return axios.create({
    headers: {
      'Authorization': `Bearer ${jwtToken}`
    }
  })
}

const getItemsAndCategories = async () => {
  const instance = await getInstane()
  return await axios
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
}

const getComments = async (items) => {
  const instance = await getInstane()
  return await axios
    .all(
      items.map((item) => instance.get(`comments/${item.id}`))
    )
    .then((comments) => {
      return comments.map((comment) => comment.data.data)
    })
}

export const getItems = createAction('GET_ITEMS', async () => {
  const result = await getItemsAndCategories()
  const comments = await getComments(result.items)
  console.info('result', result)
  console.info('comments', comments)
  return Object.assign({}, result, { comments })
})

export const GetItemsBff = createAction('GET_ITEMS', async () => {
  const result = await axios.get('http://localhost:1323/items')
  console.info('result', result)
  return result
})
