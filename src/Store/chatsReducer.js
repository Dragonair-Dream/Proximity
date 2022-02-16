import { auth, db } from '../Services/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';

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
      const data = [];
      snapshot.forEach(item => {
        data.push(item.data());
      });
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
