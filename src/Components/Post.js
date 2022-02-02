import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import { doc, setDoc } from "@firebase/firestore";
import { auth, db } from "../Services/firebase";
import { FormControl } from "@mui/material";

//     const [imageUrl, setImageurl] = useState('');
//     const [location, setLocation] = useState('');
//     const [description, setDescription] = useState('');

export default function FormDialog() {
  const [open, setOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [caption, setCaption] = useState("");
  const [location, setLocation] = useState("");
  const [post, setPost] = useState(null);
  const [postTime, setPostTime] = useState("");

  useEffect(() => {
    var hours = new Date().getHours(); //Current Hours
    var min = new Date().getMinutes(); //Current Minutes
    setPostTime(hours + ":" + min + ":");
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const uid = auth.currentUser.uid;
    try {
      const post = await setDoc(
        doc(db, "Posts", uid),
        {
          imageUrl: imageUrl,
          location: location,
          caption: caption,
          postTime: postTime,
        },
        { merge: true }
      );
      setOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {/* <Button variant="outlined" onClick={handleClickOpen}>
        Create a Post
      </Button> */}
      <Fab
        size="small"
        color="secondary"
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
            fields.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Add an image Url..."
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
            label="Where Are You?"
            type="string"
            value={location}
            fullWidth
            variant="standard"
            onChange={(e) => setLocation(e.target.value)}
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Add a Caption..."
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
