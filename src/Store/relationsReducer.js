import { auth } from "../Services/firebase";
import { db } from "../Services/firebase";
import { getDoc, doc, arrayUnion, arrayRemove, updateDoc } from "firebase/firestore";

const GET_RELATIONS = 'GET_RELATIONS'

const getRelationsAction = (relations) => {
  return {
    type: GET_RELATIONS,
    relations
  }
}

export const decideRequest = (uid, option) => {
  return async (dispatch) => {
    try {
      const testUid = auth.currentUser.uid
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
      const uid = auth.currentUser.uid
      if (!uid) throw new Error('UID is undefined or possibly null')
      const userRef = doc(db, 'friends', uid)
      const userSnap = await getDoc(userRef)
      if (userSnap.exists()) {
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
      return action.relations
    default:
      return state
  }
}
