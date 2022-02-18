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
export const updateRelations = (newData) => {
  return async (dispatch) => {
    try {
      const uid = auth.currentUser.uid
      let relations = await getDoc(doc(db, 'friends', uid))
      relations = relations.data()
      for (const pending of relations.pending) {
        let theirDoc = await getDoc(doc(db, 'friends', pending.uid))
        theirDoc = theirDoc.data()
        const newArr = []
        for (const requestedLoop of theirDoc.requested) {
          if (requestedLoop.uid === uid) {
            newArr.push({
              firstName: newData.firstName,
              lastName: newData.lastName,
              profilePic: auth.currentUser.photoURL,
              uid: newData.uid,
              userName: newData.userName
            })
          } else {
            newArr.push(requestedLoop)
          }
        }
        await updateDoc(doc(db, 'friends', pending.uid), {
          requested: newArr
        })
      }
      for (const requested of relations.requested) {
        let theirDoc = await getDoc(doc(db, 'friends', requested.uid))
        theirDoc = theirDoc.data()
        const newArr = []
        for (const pendingLoop of theirDoc.pending) {
          if (pendingLoop.uid === uid) {
            newArr.push({
              firstName: newData.firstName,
              lastName: newData.lastName,
              profilePic: auth.currentUser.photoURL,
              uid: newData.uid,
              userName: newData.userName
            })
          } else {
            newArr.push(pendingLoop)
          }
        }
        await updateDoc(doc(db, 'friends', requested.uid), {
          pending: newArr
        })
      }
      for (const accepted of relations.accepted) {
        let theirDoc = await getDoc(doc(db, 'friends', accepted.uid))
        theirDoc = theirDoc.data()
        const newArr = []
        for (const acceptedLoop of theirDoc.accepted) {
          if (acceptedLoop.uid === uid) {
            newArr.push({
              firstName: newData.firstName,
              lastName: newData.lastName,
              profilePic: auth.currentUser.photoURL,
              uid: newData.posterId,
              userName: newData.userName
            })
          } else {
            newArr.push(acceptedLoop)
          }
        }
        await updateDoc(doc(db, 'friends', accepted.uid), {
          accepted: newArr
        })
      }
    } catch(err) {
      console.log(err)
    }
  }
}

export const decideRequest = (uid, option, name='') => {
  return async (dispatch) => {
    try {
      const myUid = auth.currentUser.uid
      const editMine = doc(db, 'friends', myUid)
      const docRef = await getDoc(editMine)
      const findFriendData = docRef.data()
      //const findFriend = findFriendData.pending.find(element => element.uid === uid)
      const editTheirs = doc(db, 'friends', uid)
      const theirDocRef = await getDoc(editTheirs)
      const findTheirsData = theirDocRef.data()
      // const findTheirs = findTheirsData.requested.find(element => element.uid === myUid)
      if (option === 'accept') {
        const findFriend = findFriendData.pending.find(element => element.uid === uid)
        const findTheirs = findTheirsData.requested.find(element => element.uid === myUid)

        await updateDoc(editMine, {
          accepted: arrayUnion(findFriend),
          pending: arrayRemove(findFriend)
        })
        await updateDoc(editTheirs, {
          accepted: arrayUnion(findTheirs),
          requested: arrayRemove(findTheirs)
        })
        await updateDoc(doc(db, 'notifications', uid), {
          notifications: arrayUnion({
            read: false,
            type: 'search',
            text: `${auth.currentUser.displayName} has accepted your friend request!`
          })
        })
      } else if (option === 'decline') {
        const findFriend = findFriendData.pending.find(element => element.uid === uid)
        const findTheirs = findTheirsData.requested.find(element => element.uid === myUid)

        await updateDoc(editMine, {
          pending: arrayRemove(findFriend)
        })
        await updateDoc(editTheirs, {
          requested: arrayRemove(findTheirs)
        })
        await updateDoc(doc(db, 'notifications', uid), {
          notifications: arrayUnion({
            read: false,
            type: 'search',
            text: `${auth.currentUser.displayName} has declined your friend request.`
          })
        })
      } else if (option === 'add') { //send friend request
        const myDoc = await getDoc(doc(db, 'users', myUid))
        const myData = myDoc.data()
        const myInfo = {
          firstName: myData.firstName,
          lastName: myData.lastName,
          userName: myData.userName,
          profilePic: myData.profilePic,
          uid: myUid,
        }
        const theirDoc = await getDoc(doc(db, 'users', uid))
        const theirData = theirDoc.data()
        const theirInfo = {
          firstName: theirData.firstName,
          lastName: theirData.lastName,
          userName: theirData.userName,
          profilePic:theirData.profilePic,
          uid: uid,
        }
        await updateDoc(editMine, {
          requested: arrayUnion(theirInfo)
        })
        await updateDoc(editTheirs, {
          pending: arrayUnion(myInfo)
        })
        await updateDoc(doc(db, 'notifications', uid), {
          notifications: arrayUnion({
            read: false,
            type: 'search',
            text: `${auth.currentUser.displayName} sent you a friend request!`
          })
        })
      } else { //send reminder
        /*
        const findFriend = findFriendData.requested.find(element => element.uid === uid)
        await updateDoc(editMine, {
          requested: arrayRemove(findFriend)
        })
        */
        await updateDoc(doc(db, 'notifications', uid), {
          notifications: arrayUnion({
            read: false,
            type: 'search',
            text: `${auth.currentUser.displayName} is waiting on your friend request!`
          })
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
