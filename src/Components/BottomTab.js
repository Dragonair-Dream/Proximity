import React, { useState, useEffect } from "react";
import { makeStyles } from "@mui/styles";
import { BottomNavigation, Badge } from "@mui/material";
import { BottomNavigationAction } from "@mui/material";
import {
  Notifications,
  Search,
  Home,
  ChatBubbleTwoTone,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import { auth, db} from '../Services/firebase'
import { onSnapshot, doc } from "firebase/firestore";

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
    color: "white",
  },
  selected: {
    color: "red",
  },
});

function BottomTab() {
  let [count, setCount] = useState(0)

  useEffect(() => {
    const unsub = onSnapshot(doc(db, 'notifications', auth.currentUser.uid), (notifs) => {
      let sum = 0
      const data = notifs.data()
      console.log('DATA.NOTIFICATIONS IS: ', data.notifications)
      data.notifications.forEach((notification) => {
        console.log('DATA.TEXT IS: ', notification.text)
        if (notification.read === false) {
          sum += 1
        }
      })
      setCount(count + sum)
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
      showLabels
      value={value}
      onChange={(e, newValue) => handleChange(e, newValue)}
    >
      <BottomNavigationAction
        component={Link}
        to="/"
        className={styles.root}
        label="Home"
        icon={<Home style={{ fill: "white" }} />}
      />
      <BottomNavigationAction
        component={Link}
        to="/search"
        className={styles.root}
        label="Search"
        icon={<Search style={{ fill: "white" }} />}
      />
      <BottomNavigationAction
        component={Link}
        to="/notifications"
        className={styles.root}
        label="Notifications"
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
      />
    </BottomNavigation>
  );
}
export default BottomTab;
