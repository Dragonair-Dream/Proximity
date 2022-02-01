import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import PostEdit from './PostEdit';


//     const [imageUrl, setImageurl] = useState('');
//     const [location, setLocation] = useState('');
//     const [description, setDescription] = useState('');

export default function FormDialog() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Create a Post
      </Button>
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
            type="email"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Add a Location..."
            type="email"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Add a Caption..."
            type="email"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button variant="contained" onClick={handleClose}>Create Post</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}