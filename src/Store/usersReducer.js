import { getDocs, query, collection, setDoc, doc } from 'firebase/firestore'
import { auth, db } from '../Services/firebase'

const GET_USERS = 'GET_USERS'
const CREATE_USER = "CREATE_USER_PROFILE";

const getUsersAction = (users) => {
  return {
    type: GET_USERS,
    users
  }
}

export const createdUser = (userInfo) => {
  return {
    type: CREATE_USER,
    userInfo,
  };
};

export const createUser = (userInfo) => {
  return async (dispatch) => {
    try {
      const uid = auth.currentUser.uid;
      if (!uid) throw new Error("UID is undefined or possibly null");
      await setDoc(doc(db, "users", uid), {
        ...userInfo,
        profilePic: auth.currentUser.photoURL || '/Proximity.jpg'
      });
      dispatch(createdUser(userInfo));
    } catch (error) {
      console.error("Error in create user thunk", error);
    }
  };
};

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
      return action.users
    case CREATE_USER:
      return [...state, action.userInfo];
    default:
      return state
  }
}

export default usersReducer
