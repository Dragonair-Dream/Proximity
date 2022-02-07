import { getDocs, query, collection } from 'firebase/firestore'
import { auth, db } from '../Services/firebase'

const GET_USERS = 'GET_USERS'

const getUsersAction = (users) => {
  console.log('getAllUsers action creator called')
  return {
    type: GET_USERS,
    users
  }
}

export const getAllUsers = () => {
  return async (dispatch) => {
    try {
      const users = []
      const uid = auth.currentUser.uid
      const allUsers = query(collection(db, 'users'))
      const usersSnap = await getDocs(allUsers)
      usersSnap.forEach((user) => {
        if (user.data().posterId !== uid) {
          users.push((user.id, '=>', user.data()))
        }
      })
      dispatch(getUsersAction(users))
    } catch(err) {
      console.log(err)
    }
  }
}

const usersReducer = (state = [], action) => {
  switch (action.type) {
    case GET_USERS:
      console.log('Users store set as: ', action.users)
      return [...action.users]
    default:
      return state
  }
}

export default usersReducer