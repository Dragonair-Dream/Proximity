import { addDoc, collection, doc, getDoc, getDocs, query, where } from "@firebase/firestore";
import { db, auth } from "../Services/firebase";

const GET_USERS_FRIENDS = "GET_USERS_FRIENDS";
const ADD_USERS_FRIENDS= "ADD_USERS_FRIENDS";
const GET_USERS_FRIENDS_POSTS = 'GET_USERS_FRIENDS_POSTS'


const getUsersFriends = (friends) => {
    return({
        type: GET_USERS_FRIENDS,
        friends
    })
};

const addUsersFriends = (friends) =>{
    return({
        type: ADD_USERS_FRIENDS,
        friends
    })
}

const getUsersFriendsPosts = (posts) => {
    return({
        type: GET_USERS_FRIENDS_POSTS,
        posts
    })
}

export const _addUsersFriends = (accepted, pending, requested) => {
    return (async (dispatch) => {
        try {
            const friends = await addDoc(
                collection(db, "friends"),
                {
                  accepted: [],
                  pending: [],
                  requested: []
                },
                { merge: true }
              );
              console.log("post data", friends.data())
              dispatch(addUsersFriends(friends.data()))
        } catch (error) {
            console.log('thunk add post' , error)
        }
    })
}


export const _getUsersFriends = () => {
    return(async(dispatch) => {
        try {
            const friendData = []
            const uid = auth.currentUser.uid;
            const docRef =  doc(db, "friends", uid);
            const docSnap = await getDoc(docRef);
        
            if (docSnap) {
                const friendsData = docSnap.data()
              dispatch(getUsersFriends(friendsData))
              console.log("_getusers friends data", docSnap.data().accepted)
            } else {
              // doc.data() will be undefined in this case
              console.log("No such friends  document!");
            }
        } catch (error) {
            console.log('thunk user freinds' , error)
        }
    })
}

export const _getUsersFriendsPosts = () => {
    return(async(dispatch) => {
        try {
            const postData = []
            const uid = auth.currentUser.uid;
            const docRef =  doc(db, "friends", uid);
            const docuSnap = await getDoc(docRef);
            const friends = docuSnap.data().accepted
        
            if (friends) {
                friends.map( friend => {
                    const friendId = friend.uid;
                    const q =  query(collection(db, "posts"), where("postersId", "==", friendId));
                    const docSnap =  getDocs(q);
                    console.log('popopopopo', docSnap)
                    docSnap.forEach((doc) => {
                        postData.push((doc.id, " => ", doc.data()));
                    });
                })
            //   dispatch(getUsersFriendsPosts(postData))
              console.log("_getusers friends posts", postData)
            } else {
              // doc.data() will be undefined in this case
              console.log("No such document!");
            }
        } catch (error) {
            console.log('thunk userPost' , error)
        }
    })
}

export default function userFriendReducer(state = {}, action) {
    switch(action.type){
        case GET_USERS_FRIENDS:
            console.log("reducer check length of posts",action.friends)
            return action.friends;
        case ADD_USERS_FRIENDS:
            return [...state, action.friends]
        case GET_USERS_FRIENDS_POSTS:
            return action.posts
        default:
            return state
    }
}