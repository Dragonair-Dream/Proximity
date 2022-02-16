import { auth, db } from '../Services/firebase';
import { collection, query, where, getDocs, orderBy, getDoc, doc, DocumentReference, CollectionReference } from 'firebase/firestore';

const GET_MESSAGES = 'GET_MESSAGES';

export const setMessages = (messages) => {
  return {
    type: GET_MESSAGES,
    messages
  };
};

export const getMessages = (chatId) => {
  return async (dispatch) => {
    try {
      const chatRef = doc(db, 'chats', chatId)
      const messages = collection(chatRef, 'messages');
      const messageSnap = await getDocs(messages);
      let hey;
      const messageData = []
      // messageSnap.forEach(message => {
      //   hey = new CollectionReference(message)
      // });
      messageSnap.forEach(message => messageData.push(message.data()));
      // dispatch(setMessages(messageData));
    } catch (error) {
      console.error('Something went wrong with messages Collection Get request', error);
    }
  };
};

export default (state = [], action) => {
  switch (action.type) {
    case GET_MESSAGES:
      return action.messages;
    default:
      return state;
  }
};
