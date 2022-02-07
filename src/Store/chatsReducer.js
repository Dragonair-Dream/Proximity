import { auth, db } from '../Services/firebase';
import { collection, query, where, getDocs, orderBy, getDoc, doc } from 'firebase/firestore';

const GET_CHATS = 'GET_CHATS';

export const setChats = (chatItems) => {
  return {
    type: GET_CHATS,
    chatItems
  };
};

export const getChats = () => {
  return async (dispatch) => {
    try {
      const chatRef = collection(db, 'chats');
      const q = query(chatRef, where('users', 'array-contains', auth.currentUser.uid ));
      const snapshot = await getDocs(q);


      // const friendId =[];
      const data = [];
      snapshot.forEach(item => {
        // friendId.push(item.data().users.filter(user => user !== auth.currentUser.uid));
        data.push(item.data());
      });
      // console.log(friendId)
      // const userRef = collection(db, 'users');
      // const q2 = query(userRef, where('name', 'not-in', friendId));
      // const userSnap = await getDocs(q2);
      // console.log()
      // userSnap.forEach(id => console.log('DFSADSFADSF', id.data()))
      // data.map(item => item.users = item.users.filter(user => user !== auth.currentUser.uid));

      // console.log(data)
      dispatch(setChats(data));
    } catch (error) {
      console.error('Something went wrong with Chat Collection Get request', error);
    }
  };
};

export default (state = [], action) => {
  switch (action.type) {
    case GET_CHATS:
      return action.chatItems;
    default:
      return state;
  }
};
