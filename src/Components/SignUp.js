import React, { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "../Services/firebase";
import { createUserProfile } from "../Store/userProfileReducer";
import { useDispatch } from "react-redux";
import { doc, setDoc } from "@firebase/firestore";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
//import Link from "@mui/material/Link";
import { Link, useNavigate } from "react-router-dom";
import InputAdornment from "@mui/material/InputAdornment";
import { AccountCircle, LockRounded } from "@mui/icons-material";

export default function SignUp() {
  //creates regex for valid emails
  // const regex = new RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setlastName] = useState("");

  const dispatch = useDispatch();

  const createAccount = async () => {
    const loginEmail = email;
    const loginPassword = password;
    const loginDisplayName = displayName;
    const loginFirstName = firstName;
    const loginLastName = lastName;

    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        loginEmail,
        loginPassword
      );

      await setDoc(doc(db, "friends", auth.currentUser.uid), {
        accepted: [],
        pending: [],
        requested: [],
      });

      await setDoc(doc(db, "notifications", auth.currentUser.uid), {
        notifications: [],
      });
      updateProfile(auth.currentUser, { displayName: loginDisplayName });
      dispatch(
        createUserProfile({
          userName: loginDisplayName,
          email: loginEmail,
          profilePic: "/Proximity.jpg",
          didUpdate: false,
          posterId: user.uid,
          DateOfBirth: "",
          phoneNumber: "",
          firstName: loginFirstName,
          lastName: loginLastName,
          about: "",
        })
      );


    } catch (error) {
      alert(error.message);
      console.log(error.message);
    }
  };
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    createAccount();
    navigate("/");
  }

  return (
    <Grid
      container
      style={{ minHeight: "100vh", backgroundColor: "WhiteSmoke" }}
    >
      <Grid item xs={12} sm={6}>
        <img
          src="socialGathering.jpeg"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
          alt="title"
        />
      </Grid>
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
          <Grid container justify="center">
            <img src="Proximity.png" width={300} alt="logo" />
          </Grid>
          <TextField
            required
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
            required
            style={{ marginBottom: "20px" }}
            id="signup-password-input"
            label="Password"
            variant="standard"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            margin="normal"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockRounded />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            required
            style={{ marginBottom: "20px" }}
            id="signup-firstName-input"
            label="First Name"
            variant="standard"
            type="text"
            value={firstName}
            onChange={(e) => {
              setFirstName(e.target.value);
            }}
            margin="normal"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockRounded />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            required
            style={{ marginBottom: "20px" }}
            id="signup-lastName-input"
            label="Last Name"
            variant="standard"
            type="text"
            value={lastName}
            onChange={(e) => {
              setlastName(e.target.value);
            }}
            margin="normal"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockRounded />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            required
            id="signup-basic"
            label="User Name"
            variant="standard"
            type="displayName"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
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
            Sign Up
          </Button>
          <Typography marginTop={2}>
            Already have an account?{" "}
            <Link style={{ textDecoration: "none" }} to="/">
              Sign In
            </Link>
          </Typography>
        </div>
      </Grid>
    </Grid>
  );
}
