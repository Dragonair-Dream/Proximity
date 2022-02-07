import React, {useEffect, useCallback, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { auth, db } from '../Services/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { formatRelative } from 'date-fns';
import { getChats } from '../Store/chatsReducer';
import { Link } from 'react-router-dom';

const Chats = () => {
  const [userName, setUserName] = useState('John');
  const [senderName, setSenderName] = useState('You');

  const chatsArray = useSelector((state) => state.chats);
  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(getChats());
  }, []);


  return (
    <List sx={{ width: '100%', maxWidth: '100%', bgcolor: 'background.paper' }}>
      {chatsArray.map((item) => (
        <Link style={{textDecoration: 'none'}} to={`/chats/${item.chatID}`} key={item.chatID}>
          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <Avatar alt={userName} />
            </ListItemAvatar>
            <ListItemText
              primary={
                <React.Fragment>
                  {/* {userName} */}
                  <Typography
                      sx={{ display: 'inline' }}
                      component="span"
                      variant="body2"
                      color="gray"
                    >
                      {` (${formatRelative(new Date(item.latestMessage.createdAt.seconds * 1000), new Date())})`}
                    </Typography>
                  </React.Fragment>
              }
              secondary={
                <React.Fragment>
                  <Typography
                    sx={{ display: 'inline' }}
                    component="span"
                    variant="body2"
                    color="text.primary"
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
