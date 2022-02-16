import React, { useEffect, useRef, useState } from "react";
import { auth, db } from "../Services/firebase";
import {
  collection,
  doc,
  updateDoc,
  limitToLast,
  orderBy,
  query,
  onSnapshot,
  addDoc,
} from "firebase/firestore";
import { useParams, useLocation } from "react-router-dom";
import ChatMessages from "./ChatMessages";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import TextField from "@mui/material/TextField";
import Divider from "@mui/material/Divider";
import Fab from "@mui/material/Fab";
import Send from "@mui/icons-material/Send";
import makeStyles from "@mui/styles/makeStyles";
import { Alert } from "@mui/material";

const useStyles = makeStyles({
  messageArea: {
    width: "100%",
    height: "80%",
  },
});

const ChatRoom = () => {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const snapInPlace = useRef(null);
  const { state } = useLocation();

  let { chatId } = useParams();
  if (chatId) chatId = chatId.replace(/\s/g, "");

  useEffect(() => {
    snapInPlace.current.scrollIntoView({ behavior: "smooth" });
  });

  useEffect(() => {
    const chatRef = doc(db, "chats", chatId);
    const messageRef = collection(chatRef, "messages");
    const q = query(messageRef, orderBy("createdAt"), limitToLast(25));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const data = [];
      querySnapshot.forEach((doc) =>
        data.push({ docId: doc.id, ...doc.data() })
      );
      setMessages(data);
    });

    return unsubscribe;
  }, []);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (text) {
      const { uid, photoURL } = auth.currentUser;
      if (chatId) {
        const chatRef = doc(db, "chats", chatId);
        await updateDoc(chatRef, {
          latestMessage: { createdAt: new Date(), text },
        });
        const messageRef = collection(chatRef, "messages");
        await addDoc(messageRef, {
          createdAt: new Date(),
          text,
          // photoUrl: photoURL,
          userId: uid,
        });
      } else snapInPlace.current.scrollIntoView({ behavior: "smooth" });
      setText("");
    } else {
      alert("Empty string");
    }
  };

  const classes = useStyles();
  return (
    <Grid container style={{marginBottom: '70px', height: '100%' }}>
      <List className={classes.messageArea}>
        {messages &&
          messages.map((msg) => (
            <ListItem key={msg.docId}>
              <Grid container>
                <Grid item xs={12}>
                  <ChatMessages message={msg} friend={state} />
                </Grid>
              </Grid>
            </ListItem>
          ))}
        <div ref={snapInPlace} />
      </List>
      <Divider />
      <Grid
        container
        style={{
          padding: "20px",
          borderTop: "solid",
          borderWidth: "1px",
          borderColor: "lightgray",
        }}
      >
        <form
          style={{ display: "flex", flex: 1, justifyContent: "center" }}
          onSubmit={handleSendMessage}
        >
          <Grid item xs={11}>
            <TextField
              value={text}
              onChange={(e) => setText(e.target.value)}
              id="outlined-basic"
              label="Start Chatting"
              fullWidth
            />
          </Grid>
          <Grid item xs={1} align="right">
            <Fab type="submit" color="primary" aria-label="add">
              <Send />
            </Fab>
          </Grid>
        </form>
      </Grid>
    </Grid>
  );
};

export default ChatRoom;
