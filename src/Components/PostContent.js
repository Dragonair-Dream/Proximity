import React, { useState } from "react";
import { Marker, InfoWindow } from '@react-google-maps/api';
import { auth } from "../Services/firebase";
import {useNavigate} from 'react-router-dom'
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ChatBubble from '@mui/icons-material/ChatBubble';
import formatRelative from "date-fns/formatRelative";

export default function PostContent(props) {
    const {post, idx} = props
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedMarker, setSelectedMarker] = useState(null);
    const open = Boolean(anchorEl);
    const navigate = useNavigate()


    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };
  
    const handleCloseEdit = () => {
      setAnchorEl(null);
      navigate('/post-edit')
    };

    // console.log("0-=-=-=-=0", props.post)

    return(
        <Marker key={post.docId} position={{lat: post.latitude, lng: post.longitude}} onClick={()=> {setSelectedMarker(post.docId)}} >
            {selectedMarker === post.docId ?    
                <InfoWindow position={{lat: post.latitude, lng: post.longitude}} onCloseClick={()=>{setSelectedMarker(null);}} >
                  <Card sx={{ maxWidth: 345 }}>
                    <CardHeader
                        avatar={
                            <Avatar sx={{ bgcolor: red[500] }} aria-label="name">
                                J
                            {/* {post.name.slice(0, 1)} */} 
                            </Avatar>
                        }
                        action={
                            <>
                            { auth.currentUser.uid === post.postersId ?
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
                                    <MenuItem onClick={handleCloseEdit}><EditIcon />edit</MenuItem>
                                    <MenuItem onClick={handleClose}><DeleteIcon />delete</MenuItem>
                                </Menu>
                                </> : null
                            }
                            </>
                        }
                        title={post.locationName}
                        subheader="15 minutes ago"
                    />
                    <CardMedia
                        component="img"
                        height="194"
                        src={post.imageUrl}
                        alt=""
                    />
                    <CardContent>
                        <Typography variant="body2" color="text.secondary">
                            {post.caption}
                        </Typography>
                    </CardContent>
                    { auth.currentUser.uid !== post.postersId ?
                        <CardActions disableSpacing>
                            <IconButton aria-label="chat with poster" >
                                <ChatBubble />
                            </IconButton>
                        </CardActions> : null
                    }
                  </Card>
                </InfoWindow> : null }
        </ Marker>
    )
}
