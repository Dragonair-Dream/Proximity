import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { auth } from "../Services/firebase";
import { createUserProfile } from "../Store/userProfileReducer";
import ProfileImage from "./ProfileImage";
import { useNavigate } from "react-router";
import {
  TextField,
  Button,
  Grid,
  InputAdornment,
  Typography,
} from "@mui/material";
import { AccountCircle, ContactPhone, Cake, Badge } from "@mui/icons-material";

export default function UserProfile() {
  const [email, setEmail] = useState(auth.currentUser.email || "");
  const [userName, setUserName] = useState(auth.currentUser.userName || "");
  const [DateOfBirth, setDateOfBirth] = useState(
    auth.currentUser.DateOfBirth || ""
  );
  const [phoneNumber, setPhoneNumber] = useState(
    auth.currentUser.phoneNumber || ""
  );
  const [firstName, setFirstName] = useState(auth.currentUser.firstName || "");
  const [lastName, setLastName] = useState(auth.currentUser.lastName || "");

  const dispatch = useDispatch();

  const newData = {
    firstName: firstName,
    lastName: lastName,
    email: email,
    userName: userName,
    DateOfBirth: DateOfBirth,
    phoneNumber: phoneNumber,
    profilePic: auth.currentUser.photoURL,
    posterId: auth.currentUser.uid,
  };
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userName) {
      window.alert("Please enter a User Name");
    } else {
      dispatch(createUserProfile(newData));
      navigate("/");
    }
  };

  // const colRef = collection(db, "users");
  // const q = query(colRef, where("email", "==", auth.currentUser.email));
  // let users = [];
  // const querySnapshot = getDocs(q).then((snapshot) => {
  //   snapshot.docs.forEach((doc) => {
  //     users.push({ ...doc.data() });
  //   });
  // });
  // console.log(users);

  // querySnapshot.forEach((doc) => {
  //   users.push(doc.data());
  //   console.log("inside userProfile", users);
  // });

  return (
    <Grid container style={{ maxHeight: "100vh" }}>
      <Grid
        container
        item
        xs={12}
        sm={6}
        style={{ padding: 10 }}
        alignItems="center"
        direction="column"
        justifyContent="center"
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            maxWidth: "400px",
            minWidth: "300px",
            flexShrink: 1,
          }}
        >
          <Typography
            style={{ fontSize: "30px", color: "#0458cf ", textShadow: "100px" }}
          >
            Update User Profile
          </Typography>
          <TextField
            required
            id="signup-basic"
            label="First name"
            variant="standard"
            type="name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            margin="normal"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Badge />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            required
            id="signup-basic"
            label="Last name"
            variant="standard"
            type="name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            margin="normal"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Badge />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            id="signup-basic"
            label="Email"
            variant="standard"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            margin="normal"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccountCircle />
                </InputAdornment>
              ),
            }}
          />

          <TextField
            id="signup-basic"
            label="User name"
            variant="standard"
            type="displayName"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            margin="normal"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Badge />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            id="signup-basic"
            label="Phone Number"
            variant="standard"
            type="number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            margin="normal"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <ContactPhone />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            id="signup-basic"
            label="Date Of Birth"
            variant="standard"
            type="date"
            value={DateOfBirth}
            onChange={(e) => setDateOfBirth(e.target.value)}
            margin="normal"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Cake />
                </InputAdornment>
              ),
            }}
          />

          <Button
            style={{ padding: "8px" }}
            variant="contained"
            onClick={(e) => handleSubmit(e)}
          >
            Submit Profile
          </Button>
          <br />
          <ProfileImage />
        </div>
      </Grid>
    </Grid>
  );
}
