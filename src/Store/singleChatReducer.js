import { auth, db } from '../Services/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';

const GET_SINGLE_CHAT = 'GET_SINGLE_CHAT';

export const setSingleChat = (chatItem) => {
  return {
    type: GET_SINGLE_CHAT,
    chatItem
  };
};

export const getSingleChat = (postersId) => {
  return async (dispatch) => {
    try {
      const chatRef = collection(db, 'chats');
      const q = query(chatRef, where('userChatRef.user1', '==', postersId ), where('userChatRef.user2', '==', auth.currentUser.uid));
      const snapshot = await getDocs(q);
      let data;
      snapshot.forEach(item => {
        data = item.data();
      });
      dispatch(setSingleChat(data));
    } catch (error) {
      console.error('Something went wrong with Single Chat Collection Get request', error);
    }
  };
};

export default (state = {}, action) => {
  switch (action.type) {
    case GET_SINGLE_CHAT:
      console.log("REDUCER!!!!", action.chatItem)
      return action.chatItem;
    default:
      return state;
  }
};
