import React, { useCallback, useEffect, useState } from 'react'
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import FormDialog from './Post';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import PostEdit from './PostEdit';


const containerStyle = {
  width: "100%",
  height: "90vh",
};

const jerry = {
  post: {
    imageUrl: 'https://images.unsplash.com/photo-1606066889831-35faf6fa6ff6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80',
    name: 'Jacopo',
    location: 'La Pizzeria di Giovananni',
    description: "yo i'm here lasering it up! come join, i'll be her until 7pm."
  }
  
};

const imageUrl = "https://images.unsplash.com/photo-1606066889831-35faf6fa6ff6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"



function Map() {
  const [selectedFriend, setSelectedFriend] = useState(null);
  const [latitude, setLatitude] = useState(41.25861)
  const [longitude, setLongitude] = useState(-95.93779)
  const [anchorEl, setAnchorEl] = useState(null);
  const [editClicked, setEditClicked] = useState(false);

  console.log('selectedfriend', selectedFriend)
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
    setEditClicked(true)
    console.log('eeeeedddddiiiiittttt', editClicked)

  };

    const getPosition = useCallback(() => {
      if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(successPos)
      } else {
        alert("sorry, Geolocation is not supported by this browser.")
      }
    }, [])

    const successPos = (pos) => {
      const {latitude, longitude} = pos.coords;
      setLatitude(latitude);
      setLongitude(longitude);
      console.log('Your current position is:');
      console.log(`Latitude : ${latitude}`);
      console.log(`Longitude: ${longitude}`);
    }

  console.log("---latsssss-", latitude);
  useEffect(() => {
    getPosition();
  }, [getPosition]);

  return (
    <>
    {/* <button onClick={getPosition}>position</button> */}
    <LoadScript
      googleMapsApiKey= "AIzaSyDjD4lGFnY7plUA4lmRqm7k5GOxRWbPwtY"
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={{lat: latitude, lng: longitude}}
        zoom={10}
      >
        <Marker //at some point we will use map to go through the locations of friends to create marker for each
        position={{lat: latitude, lng: longitude}}
        onClick={()=> {setSelectedFriend(jerry.post)}}
        />
         {selectedFriend ? (
          <InfoWindow position={{lat: latitude, lng: longitude}} onCloseClick={()=>{setSelectedFriend(null);}} >
          <Card sx={{ maxWidth: 345 }}>
            <CardHeader
              avatar={
                <Avatar sx={{ bgcolor: red[500] }} aria-label="name">
                  {jerry.post.name.slice(0, 1)}
                </Avatar>
              }
              action={
                <>
                <IconButton 
                  aria-label="settings" 
                  aria-controls={open ? 'basic-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? 'true' : undefined}
                  onClick={handleClick}
                  >
                  <MoreVertIcon />
                </IconButton>
                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  MenuListProps={{
                    'aria-labelledby': 'basic-button',
                  }}>
                  <MenuItem onClick={handleClose}><EditIcon />edit</MenuItem>
                  <MenuItem onClick={handleClose}><DeleteIcon />delete</MenuItem>
                </Menu>
                </>
              }
              title={jerry.post.location}
              subheader="15 minutes ago"
            />
            <CardMedia
              component="img"
              height="194"
              image="socialGathering.jpeg"
              alt=""
            />
            <CardContent>
              <Typography variant="body2" color="text.secondary">
              you gotta nourish to flourish.  #pizzalife come join! be here 'til 8
              </Typography>
            </CardContent>
            <CardActions disableSpacing>
              <IconButton aria-label="add to favorites">
                <FavoriteIcon />
              </IconButton>
            </CardActions>
          </Card>
          </InfoWindow>) : console.log('nothingggggg')}
          <FormDialog />
        { /* Child components, such as markers, info windows, etc. */ }
      </GoogleMap>
    </LoadScript>
    </>
  )
}

export default React.memo(Map); //Using memo will cause React to skip rendering a component if its props have not changed.
