import { addDoc, collection, where, query, getDocs } from "@firebase/firestore";
import { db, auth } from "../Services/firebase";

const GET_USERS_POSTS = "GET_USERS_POSTS";
const ADD_USERS_POST = "ADD_USERS_POST"


const getUsersPosts = (postData) => {
    return({
        type: GET_USERS_POSTS,
        postData
    })
};

const addUsersPost = (post) =>{
    return({
        type: ADD_USERS_POST,
        post
    })
}

export const _addUsersPost = (imageUrl, locationName, caption, latitude, longitude, uid) => {
    return (async (dispatch) => {
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
                },
                { merge: true }
              );
              console.log("post data", post.data())
              dispatch(addUsersPost(post.data()))
        } catch (error) {
            console.log('thunk add post' , error)
        }
    })
}


export const _getUsersPosts = () => {
    return(async(dispatch) => {
        try {
            const postData = []
            const uid = auth.currentUser.uid;
            const q =  query(collection(db, "posts"), where("postersId", "==", uid));
            const docSnap = await getDocs(q);
        
            if (docSnap) {
              docSnap.forEach((doc) => {
              postData.push((doc.id, " => ", doc.data()));
              });
              dispatch(getUsersPosts(postData))
              console.log("_getuserspostr", postData)

            } else {
              // doc.data() will be undefined in this case
              console.log("No such document!");
            }
        } catch (error) {
            console.log('thunk userPost' , error)
        }
    })
}

export default function userPostReducer(state = [], action) {
    switch(action.type){
        case GET_USERS_POSTS:
            console.log("reducer check length of posts",action.postData)
            return action.postData;
        case ADD_USERS_POST:
            return [...state, action.postData]
        default:
            return state
    }
}