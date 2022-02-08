import React from "react";
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
  let count = 0
  const unsub = onSnapshot(doc(db, 'notifications', auth.currentUser.uid), (notifs) => {
    const data = notifs.data()
    console.log('THIS IS DATA: ', data)
    data.notifications.forEach((notification) => {
      if (notification.read === false) {
        count += 1
      }
    })
  })

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
          <Badge badgeContent={count} color='primary'>
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
