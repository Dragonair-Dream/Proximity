import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../Services/firebase";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { formatRelative } from "date-fns";
import { getChats } from "../Store/chatsReducer";
import { Link } from "react-router-dom";

const Chats = () => {

  let chatsArray = useSelector((state) => state.chats);
  let users = useSelector((state) => state.users);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getChats());
  }, []);

  if (chatsArray.length === 0) {
    return(
      <Grid>
        <Typography style={{display: 'flex', flex: 1, justifyContent: 'center', alignItems: 'center', height: '80vh'}}>No current Chat Messages. Message a Friend!</Typography>
      </Grid>
    );
  };

  return (
    <List sx={{ width: "100%", maxWidth: "100%", bgcolor: "background.paper" }}>
      {chatsArray.map((item) => (
        <Link style={{color: 'black', textDecoration: 'none'}} to={`/chats/${item.chatID}`} key={item.chatID} state={users.find(user => user.posterId === item.users.find(userId => userId !== auth.currentUser.uid))}>
          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <Avatar src={users.find(user => user.posterId === item.users.find(userId => userId !== auth.currentUser.uid)).profilePic} />
            </ListItemAvatar>
            <ListItemText
              primary={
                <React.Fragment>
                  {users.find(user => user.posterId === item.users.find(userId => userId !== auth.currentUser.uid)).userName}
                  <Typography
                    sx={{ display: "inline" }}
                    component="span"
                    variant="body2"
                    color="gray"
                  >
                    {` (${formatRelative(
                      new Date(item.latestMessage.createdAt.seconds * 1000),
                      new Date()
                    )})`}
                  </Typography>
                </React.Fragment>
              }
              secondary={
                <React.Fragment>
                  <Typography
                    sx={{ display: "inline" }}
                    component="span"
                    variant="body2"
                    color="text.secondary"
                  >
                  </Typography>
                  {item.latestMessage.text}
                </React.Fragment>
              }
            />
          </ListItem>
          <Divider variant="inset" component="li" />
        </Link>
      ))}
    </List>
  );
};

export default Chats;
