import {
  addDoc,
  collection,
  where,
  query,
  getDocs,
  doc,
  updateDoc,
} from "@firebase/firestore";
import { db, auth } from "../Services/firebase";

const GET_USERS_POSTS = "GET_USERS_POSTS";
const ADD_USERS_POST = "ADD_USERS_POST";
const UPDATE_USERS_POST = "UPDATE_USERS_POST";

const getUsersPosts = (postData) => {
  return {
    type: GET_USERS_POSTS,
    postData,
  };
};

const addUsersPost = (postData) => {
  return {
    type: ADD_USERS_POST,
    postData,
  };
};

const updateUsersPost = (postData) => {
  console.log("jhasbdjhabdhdbiqdbqi", postData);
  return {
    type: UPDATE_USERS_POST,
    postData,
  };
};

export const _addUsersPost = (
  imageUrl,
  locationName,
  caption,
  latitude,
  longitude,
  uid,
  editing
) => {
  return async (dispatch) => {
    try {
      const post = await addDoc(
        collection(db, "posts"),
        {
          postersId: uid,
          imageUrl: imageUrl,
          locationName: locationName,
          latitude: latitude,
          longitude: longitude,
          caption: caption,
          postTime: new Date(),
          editing: editing,
        },
        { merge: true }
      );
      dispatch(addUsersPost(post.data()));
    } catch (error) {
      console.log("thunk add post", error);
    }
  };
};

export const _getUsersPosts = () => {
  return async (dispatch) => {
    try {
      const postData = [];
      const uid = auth.currentUser.uid;
      const q = query(collection(db, "posts"), where("postersId", "==", uid));
      const docSnap = await getDocs(q);

      if (docSnap) {
        docSnap.forEach((doc) => {
          postData.push({ docId: doc.id, ...doc.data() });
        });
        console.log("_getudersposts  thunk", postData);
        dispatch(getUsersPosts(postData));
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    } catch (error) {
      console.log("thunk userPost", error);
    }
  };
};

export const _updateUsersPost = (obj) => {
  return async (dispatch) => {
    try {
      console.log("uuuuuuuuuuuuuuuuuu", obj);
      const postRef = doc(db, "posts", obj.postId); // move into store
      await updateDoc(postRef, {
        caption: obj.caption,
        locationName: obj.locationName,
      });
      dispatch(updateUsersPost(obj));
    } catch (error) {
      console.log("99999 thunk update users post -----", error);
    }
  };
};

export default function userPostReducer(state = [], action) {
  switch (action.type) {
    case GET_USERS_POSTS:
      console.log("reducer check length of posts", action.postData);
      return action.postData;
    case ADD_USERS_POST:
      return [...state, action.postData];
    case UPDATE_USERS_POST:
      console.log("action post data", state);
      const newState = state.map((post) =>
        post.postId === action.postData.postId ? action.postData : post // figure out logic to update state
      );
      return newState;
    default:
      return state;
  }
}
