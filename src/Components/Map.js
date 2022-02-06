import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  GoogleMap,
  LoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import { googleMapsKey } from "../secrets";
import PostCreate from "./PostCreate";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useDispatch, useSelector } from "react-redux";
import { _getUsersPosts } from "../Store/userPostReducer";

const containerStyle = {
  width: "100%",
  height: "90vh",
  marginBottom: "17%",
};

const jerry = {
  post: {
    id: "klmd8an",
    imageUrl:
      "https://images.unsplash.com/photo-1606066889831-35faf6fa6ff6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
    name: "Jacopo",
    location: "La Pizzeria di Giovananni",
    description:
      "yo i'm here lasering it up! come join, i'll be her until 7pm.",
  },
};

function Map() {
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [latitude, setLatitude] = useState(41.25861);
  const [longitude, setLongitude] = useState(-95.93779);
  const [anchorEl, setAnchorEl] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCloseEdit = () => {
    setAnchorEl(null);
    navigate("/post-edit");
  };

  const successPos = (pos) => {
    const { latitude, longitude } = pos.coords;
    setLatitude(latitude);
    setLongitude(longitude);
  };

  useEffect(() => {
    let watchId;
    dispatch(_getUsersPosts()); // is this the leak???
    if (navigator.geolocation) {
      watchId = navigator.geolocation.getCurrentPosition(successPos);
    } else {
      alert("sorry, Geolocation is not supported by this browser.");
    }
    return () => {
      navigator.geolocation.clearWatch(watchId);
    };
  }, []);

  const usersPosts = useSelector((state) => state.usersPosts);

  return (
    <>
      {/* <button onClick={getPosition}>position</button> */}
      <LoadScript googleMapsApiKey={googleMapsKey}>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={{ lat: latitude, lng: longitude }}
          zoom={10}
          options={{ gestureHandling: "cooperative" }}
        >
          {usersPosts.map((post, idx) => (
            <Marker
              key={idx}
              position={{ lat: post.latitude, lng: post.longitude }}
              onClick={() => {
                setSelectedMarker(idx);
              }}
            >
              {selectedMarker === idx ? (
                <InfoWindow
                  position={{ lat: post.latitude, lng: post.longitude }}
                  onCloseClick={() => {
                    setSelectedMarker(null);
                  }}
                >
                  <div>{post.caption}</div>
                </InfoWindow>
              ) : null}
            </Marker>
          ))}

          <Marker
            position={{ lat: latitude, lng: longitude }}
            // icon= {{
            //   url: "https://www.clipartmax.com/png/full/5-51090_this-free-clip-arts-design-of-google-maps-pin-green-google-map.png",
            //   scale: .5
            // }}
            label="me"
            onClick={() => {
              setSelectedMarker(jerry.post.id);
            }}
          />
          {selectedMarker === jerry.post.id ? (
            <InfoWindow
              position={{ lat: latitude, lng: longitude }}
              onCloseClick={() => {
                setSelectedMarker(null);
              }}
            >
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
                        aria-controls={open ? "basic-menu" : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? "true" : undefined}
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
                          "aria-labelledby": "basic-button",
                        }}
                      >
                        <MenuItem onClick={handleCloseEdit}>
                          <EditIcon />
                          edit
                        </MenuItem>
                        <MenuItem onClick={handleClose}>
                          <DeleteIcon />
                          delete
                        </MenuItem>
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
                    you gotta nourish to flourish. #pizzalife come join! be here
                    'til 8
                  </Typography>
                </CardContent>
                <CardActions disableSpacing>
                  <IconButton aria-label="add to favorites">
                    <FavoriteIcon />
                  </IconButton>
                </CardActions>
              </Card>
            </InfoWindow>
          ) : (
            <div />
          )}
          <PostCreate lat={latitude} lng={longitude} />

          {/* Child components, such as markers, info windows, etc. */}
        </GoogleMap>
      </LoadScript>
    </>
  );
}

export default React.memo(Map); //Using memo will cause React to skip rendering a component if its props have not changed.
