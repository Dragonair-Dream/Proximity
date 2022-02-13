import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import {TextField, Button, Grid, InputAdornment, Typography } from "@mui/material";
import { AddLocationAlt, NotesSharp } from "@mui/icons-material";
import { _updateUsersPost } from '../Store/userPostReducer'

function PostEdit() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch()
  const { selectedPostId } = location.state;
  const allPostsData = useSelector((state) => state.usersPosts );
  const selectedPost = allPostsData.filter(post => post.docId === selectedPostId)
  const post = selectedPost[0]
  const [locationName, setLocationName] = useState(post.locationName || '');
  const [caption, setCaption] = useState(post.caption || '');
  console.log('caption$$$$', post)
  const newData = {
    postId: post.docId,
    caption,
    locationName
  }
    
  console.log('locationname$$$$', selectedPost)
  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('handle submit hit from post edit', newData);
    dispatch(_updateUsersPost(newData))
    navigate('/')
  }
 
  return (
    <Grid container style={{ maxHeight: "100vh",   justifyContent:"center"  }}>
      <Grid
        container
        item
        xs={12}
        sm={6}
        style={{ padding: 20 }}
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
            value={locationName}
            onChange={(e) => {setLocationName(e.target.value)}}
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
            id="signup-basic"
            label="Caption..."
            variant="standard"
            type="email"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
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
            onClick={() => navigate("/")}
          >
            Cancel
          </Button>
          <Button
            style={{ padding: "8px" }}
            variant="contained"
            onClick={(e) => handleSubmit(e)}
          >
            Submit Changes
          </Button>
          <br />
          {/* <ProfileImage /> */}
        </div>
      </Grid>
    </Grid>
  );
}

export default PostEdit;
