import { setDoc, getDoc, doc } from "firebase/firestore"
import { auth, db } from '../Services/firebase'

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
      const updatedArr = notifData.notifications.map(element => {
        return {
          actionType: element.actionType,
          text: element.text,
          read: true
        }
      })
      await setDoc(doc(db, 'notifications', auth.currentUser.uid), {
        notifications: updatedArr
      })
    } catch(err) {
      console.log(err)
    }
  }
}
export default (state = [], action) => {
  switch (action.type) {
    case SET_NOTIFICATIONS:
      return action.arr
    default:
      return state
  }
}