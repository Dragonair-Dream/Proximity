import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import { auth, storage } from "../Services/firebase";
import { useDispatch } from "react-redux";
import { _addUsersPost } from "../Store/userPostReducer";
import { uploadBytes, ref, getDownloadURL } from "firebase/storage";

export default function PostCreate(props) {

  const [open, setOpen] = useState(false);
  const [image, setImage] = useState(null);
  const [caption, setCaption] = useState("");
  const [locationName, setLocationName] = useState("");
  const dispatch = useDispatch();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const random = Math.floor(Math.random() * 1000);

    const uid = auth.currentUser.uid;
    const latitude = props.lat;
    const longitude = props.lng;
    const editing = false;
    try {
      const fileRef = ref(storage, "posts/" + random + ".png");
      await uploadBytes(fileRef, image);
      const postImage = await getDownloadURL(fileRef);
      dispatch(
        _addUsersPost(
          postImage,
          locationName,
          caption,
          latitude,
          longitude,
          uid,
          editing
        )
      );
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
          top: (theme) => theme.spacing("auto"),
          right: (theme) => theme.spacing(1),
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
          <input
            style={{ padding: "8px", alignProperty: "center" }}
            variant="contained"
            type="file"
            onChange={handleChange}
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
