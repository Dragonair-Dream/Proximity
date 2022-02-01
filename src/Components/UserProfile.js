import React, { useState } from "react";
import { auth, db } from "../Services/firebase";
import { collection, addDoc, doc, setDoc, getDoc } from "firebase/firestore";

import {
  TextField,
  Button,
  Grid,
  InputAdornment,
  Typography,
} from "@mui/material";
import {
  AccountCircle,
  ContactPhone,
  Cake,
  Badge,
  Link,
} from "@mui/icons-material";

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
  const [profilePic, setProfilePic] = useState(
    auth.currentUser.profilePic || ""
  );
  const newData = {
    firstName: firstName,
    lastName: lastName,
    email: email,
    userName: userName,
    DateOfBirth: DateOfBirth,
    phoneNumber: phoneNumber,
    profilePic: profilePic,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const uid = await auth.currentUser.uid;
    // auto generate Id:
    // try {
    //   const data = await addDoc(collection(db, "users"), newData);
    //   console.log("user id", data.id);
    // } catch (error) {
    //   console.log("fuck this shit", error);
    // }
    //
    // custom ID:
    try {
      const data = await setDoc(doc(db, "users", uid), newData, {
        merge: true,
      });
      const docRef = doc(db, "users", uid);
      const docSnap = await getDoc(docRef);
      const userData = docSnap._document.data.value.mapValue.fields;
      console.log("user id", userData);
    } catch (error) {
      console.log(error);
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
          <TextField
            id="signup-basic"
            label="Profile Pic"
            variant="standard"
            type="string"
            value={profilePic}
            onChange={(e) => setProfilePic(e.target.value)}
            margin="normal"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Link />
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
        </div>
      </Grid>
    </Grid>
  );
}
