import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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
  const userData = useSelector((state) => state.userProfile);

  const [email, setEmail] = useState(userData.email || "");
  const [userName, setUserName] = useState(userData.userName || "");
  const [DateOfBirth, setDateOfBirth] = useState(userData.DateOfBirth || "");
  const [phoneNumber, setPhoneNumber] = useState(userData.phoneNumber || "");
  const [firstName, setFirstName] = useState(userData.firstName || "");
  const [lastName, setLastName] = useState(userData.lastName || "");
  const [about, setAbout] = useState(userData.about || "");

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
    about: about,
  };
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userName) {
      window.alert("Please enter a User Name");
    } else {
      dispatch(createUserProfile(newData));
      navigate("/UserProfile");
    }
  };

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
            type="text"
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
            type="text"
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
            type="text"
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
            type="tel"
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
          <TextField
            id="signup-basic"
            label="About Me"
            variant="standard"
            type="text"
            value={about}
            onChange={(e) => setAbout(e.target.value)}
            margin="normal"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccountCircle />
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
