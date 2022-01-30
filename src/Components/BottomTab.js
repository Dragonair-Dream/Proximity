import React from "react";
import { makeStyles } from "@mui/styles";
import { BottomNavigation } from "@mui/material";
import { BottomNavigationAction } from "@mui/material";
import { Logout, Search, Home } from "@mui/icons-material";
import Map from "./Map";

const useStyles = makeStyles({
  root: {
    width: 500,
    backgroundColor: "#E0E0E0",
  },
});

function BottomTab() {
  const classes = useStyles();

  const [value, setValue] = React.useState(0);

  const handleChange = (e, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <BottomNavigation
        className={classes.root}
        showLabels
        value={value}
        onChange={(e, newValue) => handleChange(e, newValue)}
      >
        <BottomNavigationAction
          label="Home"
          icon={<Home />}
          LinkComponent={Map}
        />
        <BottomNavigationAction label="Search" icon={<Search />} />
        <BottomNavigationAction
          label="Logout"
          icon={<Logout />}
          LinkComponent={Logout}
        />
      </BottomNavigation>
    </div>
  );
}
export default BottomTab;
