import React, { useState, useEffect, useCallback,  } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import { doc, getDoc, addDoc, collection, where, query, getDocs } from "@firebase/firestore";
import { auth, db } from "../Services/firebase";
import {useDispatch, useSelector} from "react-redux";
import { _addUsersPost } from "../Store/userPostReducer";


export default function PostCreate(props) {
  const user = useSelector(state => state.user)
  const [open, setOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [caption, setCaption] = useState("");
  const [locationName, setLocationName] = useState("");
  const dispatch = useDispatch();
  // use this for post console.log(formatRelative(postTime.getTime(), postTime))
  
  
  const handleClickOpen = () => { // have a state to set clicked 'createpost' to false when open and true when we click the 'create' button, handled in handle submit
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const uid = auth.currentUser.uid;
    const latitude = props.lat
    const longitude = props.lng
    try {
      dispatch(_addUsersPost(imageUrl, locationName, caption, latitude, longitude, uid ))
      setOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  
  return (
    <div>
      
      <Fab
        sx={{
          position: "fixed",
          top: (theme) => theme.spacing('auto'),
          right: (theme) => theme.spacing(1)
        }}
        size="small"
        color="primary"
        aria-label="add"
        onClick={handleClickOpen}
      >
        <AddIcon />
      </Fab>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create a post</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To create a post at your current location fill out the following
            fields:
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="image..."
            type="imageUrl"
            value={imageUrl}
            fullWidth
            variant="standard"
            onChange={(e) => setImageUrl(e.target.value)}
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Location name..."
            type="string"
            value={locationName}
            fullWidth
            variant="standard"
            onChange={(e) => setLocationName(e.target.value)}
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Caption..."
            type="email"
            value={caption}
            fullWidth
            variant="standard"
            onChange={(e) => setCaption(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button variant="contained" onClick={(e) => handleSubmit(e)}>
            Create Post
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
