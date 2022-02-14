import React, { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import IconButton from "@mui/material/IconButton";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import { auth, useAuth, db } from "../Services/firebase";
import { signOut } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserData } from "../Store/userProfileReducer";
import Divider from "@mui/material/Divider";
import { doc, onSnapshot } from "firebase/firestore";

const settings = ["Logout"];

const NavBar = (props) => {
  const [anchorUser, setAnchorUser] = useState(null);
  const [locationServices, setLocationServices] = useState("On");
  const [switchStatus, setSwitchStatus] = useState(true);
  const [userProfilePic, setUserProfilePic] = useState(null);
  const dispatch = useDispatch();

  const [userData, setUserData] = useState([]);

  const navigate = useNavigate();
  const logout = async () => {
    await signOut(auth);
    navigate("/");
  };

  const handleOpenUserMenu = (e) => {
    setAnchorUser(e.currentTarget);
  };
  const handleCloseUserMenu = (e) => {
    if (e.target.innerHTML === "Logout") {
      logout();
    }
    setAnchorUser(null);
  };

  const handleSwitch = (e) => {
    setSwitchStatus(e.target.checked);

    if (e.target.checked) {
      setLocationServices("On");
    } else {
      setLocationServices("Off");
    }
  };
  const thisUser = useAuth();
  // const userData = useSelector((state) => state.userProfile);
  useEffect(
    () => () =>
      onSnapshot(
        doc(db, "users", auth.currentUser.uid),
        (doc) => setUserData(doc.data())
        // console.log("klasjfl;ajsdfl;kadsf", doc.data())
      ),
    [thisUser]
  );

  useEffect(() => {
    const unsubscribe = onSnapshot(
      doc(db, "users", auth.currentUser.uid),
      (querySnapshot) => {
        setUserProfilePic(querySnapshot.data().profilePic);
      }
    );
    return unsubscribe;
  }, []);

  return (
    <AppBar position="sticky">
      <Container maxWidth="xl">
        <Toolbar>
          <FormControl>
            <FormControlLabel
              value="bottom"
              control={
                <Switch
                  color="secondary"
                  checked={switchStatus}
                  onChange={handleSwitch}
                />
              }
              label={`Location ${locationServices}`}
              labelPlacement="bottom"
            />
          </FormControl>

          <Typography
            variant="h5"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: "flex", justifyContent: "center" }}
          >
            PROXIMITY
          </Typography>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar src={auth.currentUser.photoURL} />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorUser)}
              onClose={handleCloseUserMenu}
            >
              <Typography
                sx={{
                  backgroundColor: "primary",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                {userData?.firstName
                  ? userData.firstName
                  : auth.currentUser.email}
              </Typography>
              <Divider />
              <MenuItem>
                <Link
                  style={{ textDecoration: "none", color: "black" }}
                  to="/userProfile"
                >
                  Profile
                </Link>
              </MenuItem>
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default NavBar;
