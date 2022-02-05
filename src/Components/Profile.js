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
  Avatar,
  Box,
  Stack,
  ListItem,
} from "@mui/material";
import {
  AccountCircle,
  ContactPhone,
  Cake,
  Badge,
  AddBoxOutlined,
} from "@mui/icons-material";

export default function Profile() {
  const navigate = useNavigate();
  const handleSubmit = () => {
    navigate("/editProfile");
  };
  return (
    <Grid>
      <Avatar
        alt="Remy Sharp"
        src={auth.currentUser.photoURL}
        sx={{
          width: 175,
          height: 175,
          border: 1,
          margin: "auto",
          marginTop: 1,
        }}
      />
      <Typography textAlign="center" style={{ padding: "8px" }}>
        Name
      </Typography>
      <Box textAlign="center" style={{ padding: "10px" }}>
        <Button
          style={{ padding: "8px" }}
          variant="contained"
          onClick={(e) => handleSubmit(e)}
        >
          Edit User
        </Button>
      </Box>

      <Stack
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={2}
      >
        <Stack direction="column" spacing={-1}>
          <ListItem sx={{ fontWeight: "bolder" }}>1010</ListItem>
          <ListItem>Friends</ListItem>
        </Stack>
        <Stack direction="column" spacing={-1}>
          <ListItem sx={{ fontWeight: "bolder" }}>136</ListItem>
          <ListItem>Posts</ListItem>
        </Stack>
      </Stack>
    </Grid>
  );
}
