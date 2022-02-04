import React, { useState, useEffect, useCallback } from "react";
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
import getUserData from "../Store/userProfileReducer"

export default function PostCreate(props) {
  const [open, setOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [caption, setCaption] = useState("");
  const [locationName, setLocationName] = useState("");
  // console.log(formatRelative(postTime.getTime(), postTime))
  // console.log(props.lng)
  // useEffect(() => {
  //   var hours = new Date().getHours(); //Current Hours
  //   var min = new Date().getMinutes(); //Current Minutes
  //   setPostTime(hours + ":" + min + ":");
  // }, []);
  
  const handleClickOpen = () => { // have a state to set clicked 'createpost' to false when open and true when we click the 'create' button, handled in handle submit
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const uid = auth.currentUser.uid;
    try {
      const post = await addDoc(
        collection(db, "posts"),
        {
          postersId: uid,
          imageUrl: imageUrl,
          locationName: locationName,
          latitude: props.lat,
          longitude: props.lng,
          caption: caption,
          postTime: new Date(),
        },
        { merge: true }
      );
      await fetchMyPosts();
      setOpen(false);
    } catch (error) {
      console.log(error);
    }
  };
  const docData = []
  let userName = ''

  const fetchMyPosts = useCallback(async() => { // async must go inside anonymous function?
    const uid = auth.currentUser.uid;
    
    const q =  query(collection(db, "posts"), where("postersId", "==", uid));

    const docSnap = await getDocs(q);

    if (docSnap) {
      docSnap.forEach((doc) => {
      docData.push((doc.id, " => ", doc.data()));
      });
      const docRef = doc(db, "users", uid);
      const userSnap = await getDoc(docRef);
      userName = userSnap.data().userName
      console.log("Document data:", docData[0]);
      console.log('user data', userName)

    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
    console.log("Document data:", docData[0]);
    console.log('user data', userName)


  }, [/*some sort of state */]);

  useEffect(()=> {
    fetchMyPosts()
  }, [fetchMyPosts])

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
