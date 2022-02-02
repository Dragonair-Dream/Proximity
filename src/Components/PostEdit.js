import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { doc, setDoc } from '@firebase/firestore';
import { auth, db } from '../Services/firebase';

export default function PostEdit() {
    const [open, setOpen] = useState(false)
    const [imageUrl, setImageUrl] = useState(null)
    const [caption, setCaption] = useState(null)
    const [location, setLocation] = useState(null)
    const [post, setPost] = useState(null)


    console.log('imageUrl state', post)




    const handleClickOpen = () => {
        setOpen(true);
      };
    
    const handleClose = () => {
        setOpen(false);
      };

      const handleChange = (event) => {
        console.log(event.target.value)
      }

    // const handleSubmit = async(event) => {
    //   event.preventDefault()
    //   const uid = await auth.currentUser.uid
    //     try {
    //       const post = await setDoc(doc(db,('Posts'), uid), {imageUrl: imageUrl , location: location, caption: caption})
    //     } catch (error) {
    //       console.log(error)
    //     }
    //   };

    return(
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create a post</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To create a post at your current location fill out the following fields.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Add an image Url..."
            type="photo"
            value={imageUrl}
            onChange={handleChange}
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Add a Location..."
            type="location"
            value={location}
            onChange={(event) => setLocation(event.target.value) }
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Add a Caption..."
            type="caption"
            value={caption}
            onChange={(event) => setCaption(event.target.valueAsNumber)}
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" variant="contained" onSubmit={setPost({imageUrl, location, caption})} onClick={handleClose} >Submit Changes</Button>
        </DialogActions>
      </Dialog>
    )
}

// {
//   imageUrl: ahbvkjabv
//   location: kajnf,
//   caption: ijhabfijabf
// }