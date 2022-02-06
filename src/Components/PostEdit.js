import React from "react";
// import { useDispatch } from "react-redux";
// import { auth } from "../Services/firebase";
import ProfileImage from "./ProfileImage";
import { useNavigate } from "react-router-dom";

import {
  TextField,
  Button,
  Grid,
  InputAdornment,
  Typography,
} from "@mui/material";
import {AddLocationAlt, NotesSharp, AddAPhoto } from "@mui/icons-material";

export function PostEdit() {
    const navigate = useNavigate();

    return(
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
                    Edit Post
                  </Typography>
                  <TextField
                    required
                    id="signup-basic"
                    label="Location Name..."
                    variant="standard"
                    type="name"
                    value=''
                    // onChange={(e) => setFirstName(e.target.value)}
                    margin="normal"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <AddLocationAlt />
                        </InputAdornment>
                      ),
                    }}
                  />
                  <TextField
                    required
                    id="signup-basic"
                    label="Image url..."
                    variant="standard"
                    type="name"
                    value=''
                    // onChange={(e) => setLastName(e.target.value)}
                    margin="normal"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <AddAPhoto />
                        </InputAdornment>
                      ),
                    }}
                  />
                  <TextField
                    id="signup-basic"
                    label="Caption..."
                    variant="standard"
                    type="email"
                    value=''
                    // onChange={(e) => setEmail(e.target.value)}
                    margin="normal"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <NotesSharp />
                        </InputAdornment>
                      ),
                    }}
                  />
                  <Button
                    style={{ padding: "8px" }}
                    variant="text"
                    onClick={()=> navigate('/')}
                  >
                    Cancel
                  </Button>
                  <Button
                    style={{ padding: "8px" }}
                    variant="contained"
                    // onClick={(e) => handleSubmit(e)}
                  >
                    Submit Changes
                  </Button>
                  <br />
                  <ProfileImage />
                </div>
              </Grid>
            </Grid>
    )
}