import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { auth, db } from '../Services/firebase';
import { collection, doc, limit, orderBy, query } from 'firebase/firestore';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { useParams } from 'react-router-dom';
import ChatMessages from './ChatMessages';
import { getMessages } from '../Store/messagesReducer';


const ChatRoom = () => {
  let  { chatId } = useParams();
  chatId = chatId.replace(/\s/g, '')
  // const messages = useSelector((state) => state.messages);
  // const dispatch = useDispatch();

  // useEffect(() => {
  //     dispatch(getMessages(chatId));
  //   }, [chatId]);

    const chatRef = doc(db, 'chats', chatId)
    const messageRef = collection(chatRef, 'messages');
    const q = query(messageRef, orderBy('createdAt'), limit(25));
    // const [messages] = useCollectionData(q, {idField: 'id'});

  return (
    <div>
      {/* {messages && messages.map((msg) => <ChatMessages key={msg.id} message={msg} />)} */}
    </div>
  );
};

export default ChatRoom;
