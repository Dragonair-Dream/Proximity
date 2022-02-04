import { auth } from "../Services/firebase";
import { db } from "../Services/firebase";
import { collection, addDoc, getDoc, doc, setDoc } from "firebase/firestore";

export const getFriends = () => {
  return async (dispatch) => {
    try {
      const uid = auth.currentUser.delete.uid
      if (!uid) throw new Error('UID is undefined or possibly null')
      const docRef = doc(db, 'friends', uid)
      const docSnap = await getDoc(docRef) 

    } catch(err) {
      console.log(err)
    }
  }
}