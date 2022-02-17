import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { readAll } from '../Store/notificationsReducer'

import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
// import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
// import InboxIcon from '@mui/icons-material/Inbox';
// import DraftsIcon from '@mui/icons-material/Drafts';
import { useNavigate } from "react-router-dom";
import { Typography } from "@mui/material";
import { Container } from "@mui/material";
const Notifications = () => {
  const notificationsArr = useSelector(state => state.notifications)
  let count = 0
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(readAll())
  }, [])
/*
  return (
    <div>
      {notificationsArr.map((notif) => (
          <h1>{notif.text}</h1>
      ))}
    </div>
  )
*/
  return (
    <Box fullWidth sx={{bgcolor: 'Background.paper'}}>
      <Container disableGutters maxWidth="sm" component="main" sx={{ pt: 8, pb: 6 }}>
        <Typography variant="h5" align="center" color="text.primary" component="p">
          Your Notifications
        </Typography>
      </Container>
      <List>
        {notificationsArr.length ? (notificationsArr.map((notif) => (
          <div>
            <ListItem disablePadding key={count++}>
              <ListItemButton onClick={() => navigate(`/${notif.type}`)}>
                <ListItemText primary={`${notif.text}`}/>
              </ListItemButton>
            </ListItem>
            <Divider />
          </div>
        ))) : <Typography style={{display: 'flex', flex: 1, justifyContent: 'center', alignItems: 'center', height: '80vh'}}>No Notifications for the time being. Add some friends!</Typography>}
      </List>
    </Box>
  )
}

export default Notifications
