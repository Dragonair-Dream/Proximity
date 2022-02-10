import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../Services/firebase";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
//import Link from '@mui/material/Link';
import { Link } from "react-router-dom";
import InputAdornment from "@mui/material/InputAdornment";
import { AccountCircle, LockRounded } from "@mui/icons-material";
import { Box, Stack } from "@mui/material";

const PageDoesNotExist = () => {
  return (
    <div
      container
      style={{
        minHeight: "100vh",
        minWidth: "100%",
        backgroundColor: "WhiteSmoke",
        // alignItems: "center",
      }}
    >
      <Stack
        direction="row"
        justifyContent="center"
        textAlign="center"
        spacing={2}
      >
        Page Does Not Exist <br />
        Please navigate to a different page
      </Stack>
    </div>
  );
};

export default PageDoesNotExist;
