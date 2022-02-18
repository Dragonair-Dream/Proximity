import { auth } from "../Services/firebase";
import { db } from "../Services/firebase";
import { getDoc, doc, setDoc } from "firebase/firestore";

const CREATE_USER_PROFILE = "CREATE_USER_PROFILE";
const CREATE_USER_PROFILE_ERROR = "CREATE_USER_PROFILE_ERROR";
const GET_USER_DATA = "GET_USER_DATA";

export const createdUserProfile = (userInfo) => {
  return {
    type: CREATE_USER_PROFILE,
    userInfo,
  };
};

export const gotUserData = (userData) => {
  return {
    type: GET_USER_DATA,
    userData,
  };
};

export const createUserProfile = (userInfo) => {
  return async (dispatch) => {
    try {
      const uid = auth.currentUser.uid;
      if (!uid) throw new Error("UID is undefined or possibly null");
      await setDoc(doc(db, "users", uid), {
        ...userInfo,
        profilePic: auth.currentUser.photoURL || '/Proximity.jpg'
      });
      dispatch(createdUserProfile(userInfo));
    } catch (error) {
      dispatch({ type: CREATE_USER_PROFILE_ERROR, error });
      console.error("Error in create user profile thunk", error);
    }
  };
};

export const getUserData = () => {
  return async (dispatch) => {
    try {
      const docRef = doc(db, "users", auth.currentUser.uid);
      const docSnap = await getDoc(docRef);
      dispatch(gotUserData(docSnap.data()));
    } catch (error) {
      console.log(error);
    }
  };
};

export default (state = {}, action) => {
  switch (action.type) {
    case CREATE_USER_PROFILE:
      return action.userInfo;
    case CREATE_USER_PROFILE_ERROR:
      console.log("create user error", action.error);
      return state;
    case GET_USER_DATA:
      return action.userData;
    default:
      return state;
  }
};
