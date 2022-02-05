import React, { useEffect, useState } from 'react';
import { auth, db } from '../Services/firebase';
import { collection, doc, updateDoc, limitToLast, orderBy, query, onSnapshot, addDoc } from 'firebase/firestore';
import { useParams } from 'react-router-dom';
import ChatMessages from './ChatMessages';
import { getMessages } from '../Store/messagesReducer';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import TextField from '@mui/material/TextField';
import Divider from '@mui/material/Divider';
import Fab from '@mui/material/Fab';
import Send from '@mui/icons-material/Send';
import makeStyles from '@mui/styles/makeStyles';
import { FormControl } from '@mui/material';

const useStyles = makeStyles({
  messageArea: {
    width: '100%',
    height: '65vh',
    overflowY: 'auto'
  }
});

const ChatRoom = () => {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');
  let  { chatId } = useParams();
  chatId = chatId.replace(/\s/g, '')
  // const messages = useSelector((state) => state.messages);
  // const dispatch = useDispatch();
  // useEffect(() => {
  //     dispatch(getMessages(chatId));
  //   }, [chatId]);


  useEffect(() => {
    const chatRef = doc(db, 'chats', chatId)
    const messageRef = collection(chatRef, 'messages');
    const q = query(messageRef, orderBy('createdAt'), limitToLast(25));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const data = [];
      querySnapshot.forEach(doc => (
        data.push({docId: doc.id, ...doc.data()})
      ));
      setMessages(data);
    });
    return unsubscribe;
  }, []);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    const { uid, photoURL } = auth.currentUser;
    if (chatId) {
      const chatRef = doc(db, 'chats', chatId);
      await updateDoc(chatRef, {
        latestMessage: {createdAt: new Date(), text,},
      });
      const messageRef = collection(chatRef, 'messages');
      await addDoc(messageRef, {
        createdAt: new Date(),
        text,
        photoURL,
        userId: uid
      });
    }
    setText('');
  };

  const classes = useStyles();
  return (
    <Grid container style={{height: '100%'}}>
      <List className={classes.messageArea}>
        {messages && messages.map((msg) => (
          <ListItem key={msg.docId}>
            <Grid container>
              <Grid item xs={12}>
                <ChatMessages message={msg} />
              </Grid>
            </Grid>
          </ListItem>
        ))}
      </List>
      <Divider />
      <Grid container style={{padding: '20px'}}>
        <form style={{display: 'flex', flex: 1}} onSubmit={handleSendMessage}>
          <Grid item xs={11}>
            <TextField value={text} onChange={(e) => setText(e.target.value)} id="outlined-basic" label="Start Chatting" fullWidth />
          </Grid>
          <Grid item xs={1} align="right">
            <Fab type='submit' color="primary" aria-label="add"><Send /></Fab>
          </Grid>
        </form>
      </Grid>
    </Grid>
  );
};

export default ChatRoom;
