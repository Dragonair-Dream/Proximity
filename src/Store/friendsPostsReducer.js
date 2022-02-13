import { collection, doc, getDoc, getDocs, query, where } from "@firebase/firestore";
import { db, auth } from "../Services/firebase";


const GET_USERS_FRIENDS_POSTS = 'GET_USERS_FRIENDS_POSTS'

const getUsersFriendsPosts = (posts) => {
    return({
        type: GET_USERS_FRIENDS_POSTS,
        posts
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

            if (friends.length > 0) {
                friends.map( async friend => {
                    const friendId = friend.uid;
                    const q =  query(collection(db, "posts"), where("postersId", "==", friendId));
                    const docSnap =  await getDocs(q);
                    // console.log('popopopopo', docSnap)
                    docSnap.forEach((doc) => {
                        postData.push({docId: doc.id,  ...doc.data()});
                    });
                    dispatch(getUsersFriendsPosts(postData))
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

export default function friendsPostsReducer(state = [], action) {
    switch(action.type){
        case GET_USERS_FRIENDS_POSTS:
            return action.posts
        default:
            return state
    }
}
