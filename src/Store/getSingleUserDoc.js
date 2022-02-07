import { db } from "../Services/firebase";
import { getDoc, doc } from "firebase/firestore";

const GET_SINGLE_USER_DOC = 'GET_SINGLE_USER_DOC';

export const setUserDoc = (user) => {
  return {
    type: GET_SINGLE_USER_DOC,
    user
  };
};

export const getUserDoc = (userId) => {
  return async (dispatch) => {
    try {
      const userRef = doc(db, 'users', userId);
      const snapShot = await getDoc(userRef);
      if(!snapShot) throw new Error('Error with retrieving data from firestore.')
      dispatch(setUserDoc(snapShot.data()));
    } catch (error) {
      console.error('Something went wrong in the single user Fetch', error);
    }
  };
};

export default (state = {}, action) => {
  switch (action.type) {
    case GET_SINGLE_USER_DOC:
      return action.user;
    default:
      return state;
  };
};
