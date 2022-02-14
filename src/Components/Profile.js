import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { auth, db } from "../Services/firebase";
import { useNavigate } from "react-router";
import { _getUsersPosts } from "../Store/userPostReducer";
import { doc, onSnapshot } from "@firebase/firestore";
import {
  Button,
  Grid,
  Typography,
  Avatar,
  Box,
  Stack,
  ListItem,
  Divider,
} from "@mui/material";

export default function Profile() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);

  const [userData, setUserData] = useState([]);
  const [friends, setFriendsNew] = useState([]);

  //get user posts for count
  const posts = useSelector((state) => state.usersPosts);
  useEffect(() => {
    dispatch(_getUsersPosts());
  }, []);

  //get user data
  useEffect(() => {
      const unsub = onSnapshot(doc(db, "users", auth.currentUser.uid), (doc) =>
        setUserData(doc.data())
      );
      return unsub;
  }, []);
  //get friends data
  useEffect(() => {
      const unsub = onSnapshot(doc(db, "friends", auth.currentUser.uid), (doc) => {
        setFriendsNew(doc.data().accepted)
      }
      );
      return unsub;
  }, []);

  const handleSubmit = () => {
    navigate("/editProfile");
  };
  let postCount = 0;
  if (posts) {
    postCount = posts.length;
  }

  let friendCount = 0;
  if (friends) {
    friendCount = friends.length;
  }

  return (
    <Grid sx={{ backgroundColor: "Azure", height: "100%", marginBottom: "0" }}>
      <Box sx={{ paddingTop: 1 }}>
        <Avatar
          alt="Remy Sharp"
          src={auth.currentUser.photoURL}
          sx={{
            width: 175,
            height: 175,
            border: 0.5,
            margin: "auto",
          }}
        />
        <Typography textAlign="center" style={{ padding: "8px" }}>
          {userData ? `${userData.firstName} ${userData.lastName}` : ""}
        </Typography>
        <Typography
          textAlign="center"
          style={{ padding: "1px", fontWeight: "lighter" }}
        >
          {userData.email === auth.currentUser.email ? userData.about : ""}
        </Typography>
      </Box>
      <Box textAlign="center" style={{ padding: "10px" }}>
        <Button
          style={{ padding: "8px" }}
          variant="contained"
          onClick={(e) => handleSubmit(e)}
        >
          Edit Profile
        </Button>
      </Box>

      <Stack
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={2}
      >
        <Stack align="center" direction="column" spacing={-1}>
          <ListItem sx={{ fontWeight: "bolder" }}>
            {friendCount ? friendCount : 0}
          </ListItem>
          <ListItem sx={{ fontWeight: "lighter" }}>Friends</ListItem>
        </Stack>
        <Stack direction="column" spacing={-1}>
          <ListItem sx={{ fontWeight: "bolder" }}>
            {postCount ? postCount : 0}
          </ListItem>
          <ListItem sx={{ fontWeight: "lighter" }}>Posts</ListItem>
        </Stack>
      </Stack>
      <Divider component="p" />
      <p>
        <Typography
          sx={{ mt: 0.5, ml: 2 }}
          color="text.secondary"
          display="block"
          variant="caption"
        ></Typography>
      </p>
      <Grid align="center" sx={{ mb: 2 }}>
        <Typography>
          Name :{" "}
          {userData.email === auth.currentUser.email
            ? `${userData.firstName} ${userData.lastName}`
            : ""}
        </Typography>
        <Typography>
          User Name :{" "}
          {userData.email === auth.currentUser.email ? userData.userName : ""}
        </Typography>
        <Typography>
          Email :{" "}
          {userData.email === auth.currentUser.email ? userData.email : ""}
        </Typography>
        <Typography>
          Phone Number :{" "}
          {userData.email === auth.currentUser.email
            ? userData.phoneNumber
            : ""}
        </Typography>
        <Typography>
          Birthday :{" "}
          {userData.email === auth.currentUser.email
            ? userData.DateOfBirth
            : ""}
        </Typography>
      </Grid>
      <Divider component="p" />
      <p>
        <Typography
          sx={{ mt: 0.5, ml: 2 }}
          color="text.secondary"
          display="block"
          variant="caption"
        ></Typography>
      </p>
      <Grid align="center">
        <Typography
          sx={{ fontWeight: "bolder", fontSize: "150%", paddingBottom: "20px" }}
        >
          ~ Friends ~
        </Typography>
      </Grid>
      <Grid sx={{ backgroundColor: "Azure" }}>
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={2}
          display="flex"
          flexWrap="wrap"
        >
          {friends &&
            friends.map((friend) => {
              const user = users.find(user => user.posterId === friend.uid);
              return  (
              <Stack
                key={friend.uid}
                align="center"
                direction="column"
                spacing={-1}
              >
                <Avatar
                  alt="Remy Sharp"
                  src={user && user.profilePic}
                  sx={{
                    width: 75,
                    height: 75,
                    border: 0.5,
                    margin: "auto",
                  }}
                />
                <Typography textAlign="center" style={{ padding: "8px" }}>
                  {friend.firstName}
                </Typography>
              </Stack>
            )})}
        </Stack>
        <br />
        <br />
        <br />
        <br />
        <br />
      </Grid>
    </Grid>
  );
}
