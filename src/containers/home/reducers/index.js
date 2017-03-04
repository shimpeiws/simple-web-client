/* @flow */
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
