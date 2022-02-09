import React from "react";
import { makeStyles } from "@mui/styles";
import { BottomNavigation } from "@mui/material";
import { BottomNavigationAction } from "@mui/material";
import {
  Notifications,
  Search,
  MapTwoTone,
  ChatBubbleTwoTone,
} from "@mui/icons-material";
import { Link } from "react-router-dom";

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
        label="Map"
        icon={<MapTwoTone style={{ fill: "white" }} />}
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
        icon={<Notifications style={{ fill: "white" }} />}
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
