import React from 'react';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import { auth } from '../Services/firebase';
import { formatRelative } from 'date-fns';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';

const ChatMessages = (props) => {
  const { text, userId, photoURL, createdAt } = props.message;
  const messagePosition = userId === auth.currentUser.uid ? 'right' : 'left';
  const textAlignment = userId === auth.currentUser.uid ? 'row-reverse' : 'row';
  const profilePic = userId === auth.currentUser.uid ? photoURL : ''; //This is where i will put other person's photoURL

  return (
      <Grid container align={messagePosition} display='flex'>
        <div style={{flex: 1, flexDirection: 'row-reverse'}}>
            <ListItemAvatar>
              <Avatar src={profilePic} />
            </ListItemAvatar>
            <ListItemText
              primary={
                <React.Fragment>
                  <Typography
                      sx={{ display: 'inline' }}
                      component="span"
                      variant="body2"
                      color="gray"
                      fontStyle='italic'
                    >
                      {`${formatRelative(new Date(createdAt.seconds * 1000), new Date())}`}
                    </Typography>
                  </React.Fragment>
              }
              secondary={
                <React.Fragment>
                  <Typography
                    style={{width: '300px'}}
                    sx={{ display: 'flex', flexWrap: 'wrap', flexDirection: `${textAlignment}` }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                    fontWeight='bold'
                  >
                  {text}
                  </Typography>
                </React.Fragment>
              }
            />
        </div>
      </Grid>
  );
};

export default ChatMessages;
