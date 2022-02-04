import { auth } from "../Services/firebase";
import { db } from "../Services/firebase";
import { collection, addDoc, getDoc, doc, setDoc } from "firebase/firestore";

const GET_RELATIONS = 'GET_RELATIONS'

const getRelationsAction = (relations) => {
  return {
    type: GET_RELATIONS,
    relations
  }
}

export const getRelations = () => {
  return async (dispatch) => {
    try {
      //console.log('Current user is: ', auth.currentUser)
      //const uid = auth.currentUser.uid
      const uid = 'sVn4XnxzBTVxqRDUKEznfPvpGlJ3'
      console.log('UID is: ', 'sVn4XnxzBTVxqRDUKEznfPvpGlJ3')
      if (!uid) throw new Error('UID is undefined or possibly null')
      const userRef = doc(db, 'friends', uid)
      const userSnap = await getDoc(userRef) 
      if (userSnap.exists()) {
        console.log('User Document Data: ', userSnap.data())
        dispatch(getRelationsAction(userSnap.data()))
      } else {
        console.log('No such user document')
      }
    } catch(err) {
      console.log(err)
    }
  }
}

export default (state = {}, action) => {
  switch (action.type) {
    case GET_RELATIONS:
      console.log('Got friends', action.relations)
      return action.relations
    default:
      return state
  }
}