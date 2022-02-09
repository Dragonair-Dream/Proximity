import { setDoc } from "firebase/firestore"

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
      const notifDoc = await getDoc(doc(db, 'notifications', auth.currentUser.uid))
      const notifData = notifDoc.data()
      const updatedArr = notifData.map(element => {
        return {
          actionType: element.actionType,
          text: element.text,
          read: true
        }
      })
      await setDoc(doc(db, 'notifications', auth.currentUser.uid), {
        notifications: updatedArr
      })
      dispatch(_setNotifications([]))
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