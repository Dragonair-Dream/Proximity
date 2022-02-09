const SET_NOTIFICATIONS = 'SET_NOTIFICATIONS'

const _setNotifications = (arr) => {
  return {
    type: SET_NOTIFICATIONS,
    arr
  }
}

export const setNotifications = (arr) => {
  return async (dispatch) => {
    try {
      dispatch(_setNotifications(arr))
    } catch(err) {
      console.log(err)
    }
  }
}

export const readAll = () => {
  return async (dispatch) => {
    try {

    } catch(err) {
      console.log(err)
    }
  }
}
export default (state = [], action) => {
  switch (action.type) {
    case SET_NOTIFICATIONS:
      console.log('NOTIFICATIONS REDUCER IS BEING SET TO: ', action.arr)
      return action.arr
    default:
      return state
  }
}