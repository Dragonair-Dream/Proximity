import {
  addDoc,
  collection,
  where,
  query,
  getDocs,
  doc,
} from "@firebase/firestore";
import { updateDoc } from "firebase/firestore";
import { db, auth, storage } from "../Services/firebase";
import { uploadBytes, ref, getDownloadURL } from "firebase/storage";

const GET_USERS_POSTS = "GET_USERS_POSTS";
const ADD_USERS_POST = "ADD_USERS_POST";

const getUsersPosts = (postData) => {
  return {
    type: GET_USERS_POSTS,
    postData,
  };
};

const addUsersPost = (post) => {
  return {
    type: ADD_USERS_POST,
    post,
  };
};

export const _addUsersPost = (
  imageUrl,
  locationName,
  caption,
  latitude,
  longitude,
  uid
) => {
  return async (dispatch) => {
    try {
      const postData = {
        postersId: uid,
        imageUrl: imageUrl,
        locationName: locationName,
        latitude: latitude,
        longitude: longitude,
        caption: caption,
        postTime: new Date(),
      };
      const post = await addDoc(collection(db, "posts"), postData, {
        merge: true,
      });
      // const fileRef = ref(storage, "posts/" + post.id + ".png");
      // await uploadBytes(fileRef, imageUrl);
      // const postImage = await getDownloadURL(fileRef);
      // const data = await updateDoc(doc(db, "posts", post.id), {
      //   imageUrl: postImage,
      // });
      // console.log("post data", data.data());
      dispatch(addUsersPost(postData));
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
          postData.push((doc.id, " => ", doc.data()));
        });
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

export default function userPostReducer(state = [], action) {
  switch (action.type) {
    case GET_USERS_POSTS:
      console.log("reducer check length of posts", action.postData);
      return action.postData;
    case ADD_USERS_POST:
      return [...state, action.postData];
    default:
      return state;
  }
}
