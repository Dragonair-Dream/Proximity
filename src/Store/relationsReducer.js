import { auth } from "../Services/firebase";
import { db } from "../Services/firebase";
import { collection, addDoc, getDoc, doc, setDoc, arrayUnion, arrayRemove, updateDoc } from "firebase/firestore";

const GET_RELATIONS = 'GET_RELATIONS'

const getRelationsAction = (relations) => {
  console.log('getRelations action creator called')
  return {
    type: GET_RELATIONS,
    relations
  }
}

export const decideRequest = (uid, option) => {
  return async (dispatch) => {
    try {
      //const uid = auth.currentUser.uid
      const testUid = 'sVn4XnxzBTVxqRDUKEznfPvpGlJ3'
      
      const editMine = doc(db, 'friends', testUid)
      const docRef = await getDoc(editMine)
      const findFriend = docRef.data().pending.find(element => element.uid === uid)
      
      const editTheirs = doc(db, 'friends', uid)
      const theirDocRef = await getDoc(editTheirs)
      const findTheirs = theirDocRef.data().pending.find(element => element.uid === testUid)

      if (option === 'accept') {
        await updateDoc(editMine, {
          accepted: arrayUnion(findFriend),
          pending: arrayRemove(findFriend)
        })
        await updateDoc(editTheirs, {
          accepted: arrayUnion(findTheirs),
          requested: arrayRemove(findTheirs)
        })
      } else if (option === 'decline') { 
        await updateDoc(editMine, {
          pending: arrayRemove(findFriend)
        })
        await updateDoc(editTheirs, {
          requested: arrayRemove(findTheirs)
        })
      } else { //send friend request
        await updateDoc(editMine, {
          requested: arrayUnion(findFriend)
        })
        await updateDoc(editTheirs, {
          pending: arrayUnion(findTheirs)
        })
      }
      dispatch(getRelations())
    } catch(err) {
      console.log(err)
    }
  }
}

export const getRelations = () => {
  return async (dispatch) => {
    try {
      //console.log('Current user is: ', auth.currentUser)
      //const uid = auth.currentUser.uid
      const uid = 'sVn4XnxzBTVxqRDUKEznfPvpGlJ3'
      console.log('getRelations thunk called')
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
      console.log('Friends store set as: ', action.relations)
      return action.relations
    default:
      return state
  }
}
