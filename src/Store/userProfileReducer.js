import { auth } from "../Services/firebase";
import { db } from "../Services/firebase";
import { collection, addDoc, getDoc, doc, setDoc } from "firebase/firestore";

const CREATE_USER_PROFILE = "CREATE_USER_PROFILE";
const CREATE_USER_PROFILE_ERROR = "CREATE_USER_PROFILE_ERROR";
const GET_USER_DATA = "GET_USER_DATA";

export const createdUserProfile = (userInfo) => {
  return {
    type: CREATE_USER_PROFILE,
    userInfo,
  };
};

export const gotUserData = (userid) => {
  return {
    type: GET_USER_DATA,
    userid,
  };
};

export const createUserProfile = (userInfo) => {
  return async (dispatch) => {
    try {
      const uid = auth.currentUser.uid;
      if (!uid) throw new Error("UID is undefined or possibly null");
      await setDoc(
        doc(db, "users", uid),
        {
          ...userInfo,
          createdAt: new Date(),
        },
        {
          merge: true,
        }
      );
      dispatch(createdUserProfile(userInfo));
    } catch (error) {
      dispatch({ type: CREATE_USER_PROFILE_ERROR, error });
      console.error("Error in create user profile thunk", error);
    }
  };
};

export const getUserData = async (userid) => {
  const docRef = doc(db, "users", userid);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    console("something went wrong");
  }
};

export default (state = {}, action) => {
  switch (action.type) {
    case CREATE_USER_PROFILE:
      console.log("created User", action.userInfo);
      return state;
    case CREATE_USER_PROFILE_ERROR:
      console.log("create user error", action.error);
      return state;
    case GET_USER_DATA:
      console.log("got user data", action.userid);
    default:
      return state;
  }
};
