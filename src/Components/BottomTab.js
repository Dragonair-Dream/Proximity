import React, { useState, useEffect } from "react";
import { makeStyles } from "@mui/styles";
import { BottomNavigation, Badge } from "@mui/material";
import { BottomNavigationAction } from "@mui/material";
import {
  Notifications,
  Search,
  MapTwoTone,
  ChatBubbleTwoTone,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import { auth, db} from '../Services/firebase'
import { onSnapshot, doc } from "firebase/firestore";
import { useDispatch } from 'react-redux'

import { setNotifications } from '../Store/notificationsReducer'

const useStyles = makeStyles({
  root: {
    width: "100%",
    backgroundColor: "#1565c0",
    position: "fixed",
    bottom: 0,
    opacity: 10,
    paddingTop: 5,
    paddingBottom: 10,
  },
});

const myStyles = makeStyles({
  root: {
    width: "100%",
    color: "gray",
  },
  selected: {
    color: "white",
  },
});

function BottomTab() {
  const dispatch = useDispatch()
  let [count, setCount] = useState(0)

  useEffect(() => {
    let unsub
    unsub = onSnapshot(doc(db, 'notifications', auth.currentUser.uid), (notifs) => {
      let sum = 0
      const data = notifs.data()
      if (data) {
        data.notifications.forEach((notification) => {
          if (notification.read === false && window.location.pathname !== '/notifications') {
            sum += 1
          }
        })
        dispatch(setNotifications(data.notifications.reverse()))
        setCount(count + sum)
      } else {
        setCount(0)
      }
    })
    return unsub
  }, [])

  const classes = useStyles();
  const styles = myStyles();

  const [value, setValue] = React.useState(0);

  const handleChange = (e, newValue) => {
    setValue(newValue);
  };

  return (
    <BottomNavigation
      className={classes.root}
      showLabels={false}
      value={value}
      onChange={(e, newValue) => handleChange(e, newValue)}
    >
      <BottomNavigationAction
        component={Link}
        to="/"
        className={styles.root}
        label="Map"
        icon={<MapTwoTone style={{ fill: "white" }} />}
        classes={{selected: styles.selected}}
      />
      <BottomNavigationAction
        component={Link}
        to="/search"
        className={styles.root}
        label="Search"
        icon={<Search style={{ fill: "white" }} />}
        classes={{selected: styles.selected}}
      />
      <BottomNavigationAction
        component={Link}
        to="/notifications"
        className={styles.root}
        label="Notifications"
        classes={{selected: styles.selected}}
        icon={
          <Badge badgeContent={count} color='secondary'>
            <Notifications style={{ fill: "white" }} />
          </Badge>
        }
      />
      <BottomNavigationAction
        component={Link}
        to="/chats"
        className={styles.root}
        label="Chat"
        icon={<ChatBubbleTwoTone style={{ fill: "white" }} />}
        classes={{selected: styles.selected}}
      />
    </BottomNavigation>
  );
}
export default BottomTab;
