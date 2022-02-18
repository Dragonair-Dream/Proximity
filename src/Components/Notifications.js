import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { readAll } from '../Store/notificationsReducer'
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import { useNavigate } from "react-router-dom";
import { Typography } from "@mui/material";
import { Container } from "@mui/material";
const Notifications = () => {
  const notificationsArr = useSelector(state => state.notifications)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(readAll())
  }, [])

  return (
    <Box fullWidth sx={{bgcolor: 'Background.paper'}}>
      <Container disableGutters maxWidth="sm" component="main" sx={{ pt: 8, pb: 6 }}>
        <Typography variant="h5" align="center" color="text.primary" component="p">
          Your Notifications
        </Typography>
      </Container>
      <List>
        {notificationsArr.length ? (notificationsArr.map((notif, idx) => (
          <div>
            <ListItem disablePadding key={idx}>
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
