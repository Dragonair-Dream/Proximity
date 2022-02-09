import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../Services/firebase";
import { getUserData } from "../Store/userProfileReducer";
import { useNavigate } from "react-router";
import { _getUsersFriends } from "../Store/userFriendReducer";
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

  const userData = useSelector((state) => state.userProfile);
  const friends = useSelector((state) => state.usersFriends);
  useEffect(() => {
    dispatch(getUserData());
    dispatch(_getUsersFriends());
  }, []);

  const handleSubmit = () => {
    navigate("/editProfile");
  };

  const acceptedFriends = friends.accepted;
  let friendCount = 0;
  if (acceptedFriends) {
    friendCount = acceptedFriends.length;
  }
  // const friendCount = acceptedFriends.length;
  console.log(Array.isArray(acceptedFriends));

  return (
    <Grid
      sx={{ backgroundColor: "Azure", height: "100vh", marginBottom: "17%" }}
    >
      <Box sx={{ paddingTop: 1 }}>
        <Avatar
          alt="Remy Sharp"
          src={
            userData.email === auth.currentUser.email
              ? auth.currentUser.photoURL
              : ""
          }
          sx={{
            width: 175,
            height: 175,
            border: 0.5,
            margin: "auto",
          }}
        />
        <Typography textAlign="center" style={{ padding: "8px" }}>
          {userData.email === auth.currentUser.email
            ? `${userData.firstName} ${userData.lastName}`
            : null}
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
          <ListItem sx={{ fontWeight: "bolder" }}>136</ListItem>
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
        <Typography sx={{ fontWeight: "bolder" }}>Friends</Typography>
      </Grid>
      <Grid>
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={2}
        >
          {acceptedFriends &&
            acceptedFriends.map((friend) => (
              <Stack
                key={friend.uid}
                align="center"
                direction="column"
                spacing={-1}
              >
                <Avatar
                  alt="Remy Sharp"
                  src={friend.profilePic}
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
            ))}
        </Stack>
      </Grid>
    </Grid>
  );
}
