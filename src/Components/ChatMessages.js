import React from 'react';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItem from '@mui/material/ListItem';
import { auth } from '../Services/firebase';
import { formatRelative } from 'date-fns';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';

const ChatMessages = (props) => {
  const { text, userId, photoUrl, createdAt } = props.message;
  const messagePosition = userId === auth.currentUser.uid ? 'right' : 'left';
  const profilePic = userId === auth.currentUser.uid && photoUrl

  return (
    // <ListItemText align={messagePosition}>
    //   {text}
    // </ListItemText>

      <ListItem align={messagePosition}>
            <ListItemAvatar>
              <Avatar alt={profilePic} />
            </ListItemAvatar>
            <ListItemText
              primary={
                <React.Fragment>
                  <Typography
                      sx={{ display: 'inline' }}
                      component="span"
                      variant="body2"
                      color="gray"
                    >
                      {` (${formatRelative(new Date(createdAt.seconds * 1000), new Date())})`}
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
                  {text}
                </React.Fragment>
              }
            />
      </ListItem>
  );
};

export default ChatMessages;
