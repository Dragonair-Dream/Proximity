import { addDoc, collection, doc, getDoc } from "@firebase/firestore";
import { db, auth } from "../Services/firebase";

const GET_USERS_FRIENDS = "GET_USERS_FRIENDS";
const ADD_USERS_FRIENDS= "ADD_USERS_FRIENDS";


const getUsersFriends = (friends) => {
  return {
    type: GET_USERS_FRIENDS,
    friends,
  };
};

const addUsersFriends = (friends) => {
  return {
    type: ADD_USERS_FRIENDS,
    friends,
  };
};


export const _addUsersFriends = (accepted, pending, requested) => {
  return async (dispatch) => {
    try {
      const friends = await addDoc(
        collection(db, "friends"),
        {
          accepted: [],
          pending: [],
          requested: [],
        },
        { merge: true }
      );
      dispatch(addUsersFriends(friends.data()));
    } catch (error) {
      console.log("thunk add post", error);
    }
  };
};

export const _getUsersFriends = () => {
    return(async(dispatch) => {
        try {
            const uid = auth.currentUser.uid;
            const docRef =  doc(db, "friends", uid);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                const friendsData = docSnap.data()

              dispatch(getUsersFriends(friendsData))
            } else {
              // doc.data() will be undefined in this case
              console.log("No such friends  document!");
            }
        } catch (error) {
            console.log('thunk user freinds' , error)
        }
    })
}


export default function userFriendReducer(state = {}, action) {
    switch(action.type){
        case GET_USERS_FRIENDS:
            return action.friends;
        case ADD_USERS_FRIENDS:
            return [...state, action.friends]
        default:
            return state
    }
};

