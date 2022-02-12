import React, { useState, useEffect, useCallback } from "react";
import { Marker, InfoWindow } from '@react-google-maps/api';
import {Link} from 'react-router-dom'
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
import TextField from "@mui/material/TextField";
import Send from "@mui/icons-material/Send";
import Fab from "@mui/material/Fab";
import { db, auth } from "../Services/firebase";
import { collection, addDoc, doc, updateDoc, query, getDocs, where, deleteDoc } from "firebase/firestore";
import { useSelector } from "react-redux";

export default function PostContent(props) {
    const {post} = props
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedMarker, setSelectedMarker] = useState(null);
    const [toggleMessage, setToggleMessage] = useState(false);
    const [chat, setChat] = useState(null);
    const [message, setMessage] = useState('');
    const open = Boolean(anchorEl);
    console.log('ffffrrrriiiieeeennnnddddsss', props.friends)

   



    const { postersId } = post
    const getChat = useCallback(async () => {
        try {
            const chatRef = collection(db, 'chats');
            const q = query(chatRef, where('users', 'array-contains', auth.currentUser.uid ));
            const snapshot = await getDocs(q);
            let data =[];
            snapshot.forEach(item => {
                data.push(item.data());
            });
            [data] = data.filter(item => (item.users.includes(postersId) && item.users.includes(auth.currentUser.uid)));
            setChat(data);
        } catch (error) {
            console.error('Error in PostContent useCallback', error);
        }
    }, [postersId, toggleMessage]);

    useEffect(() =>{
        getChat();
    }, [getChat]);

    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
      setAnchorEl(null);
    };
    const handleCloseDelete = async (postId) => {
        setAnchorEl(null);
        await deleteDoc(doc(db, "posts", postId))
      };

    const handleCloseEdit = async (postId) => {
      setAnchorEl(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (message !== '') {
            const { uid, photoURL } = auth.currentUser;
            if (chat) {
                const chatRef = doc(db, 'chats', chat.chatID);
                await updateDoc(chatRef, {
                  latestMessage: {createdAt: new Date(), text: message,},
                });
                const messageRef = collection(chatRef, 'messages');
                await addDoc(messageRef, {
                  createdAt: new Date(),
                  text: message,
                  photoURL,
                  userId: uid
                });
            } else {
                const chatRef = collection(db, 'chats');
                const data = await addDoc(chatRef, {
                    latestMessage: {createdAt: new Date(), text: message,},
                    users: [uid, post.postersId],
                    // userChatRef: {user1: post.postersId, user2: uid}
                });
                const messageRef = collection(doc(db, 'chats', data.id), 'messages');
                await addDoc(messageRef, {
                    createdAt: new Date(),
                    text: message,
                    photoURL,
                    userId: uid
                });
                await updateDoc(doc(db, 'chats', data.id), {chatID: data.id});
            }
        }
        setToggleMessage(false);
        setMessage('');
    };

    return(
        <Marker key={post.docId} position={{lat: post.latitude, lng: post.longitude}} onClick={()=> {setSelectedMarker(post.docId)}} >
            {selectedMarker === post.docId ?
                <InfoWindow position={{lat: post.latitude, lng: post.longitude}} onCloseClick={()=>{setSelectedMarker(null);}} >
                  <Card sx={{ maxWidth: 345 }}>
                    <CardHeader
                        avatar={
                            <Avatar sx={{ bgcolor: red[500] }} aria-label="name" src={props.userPhoto ? props.userPhoto : ""} />
                            //     J
                            // {/* {post.name.slice(0, 1)} */}
                            // </Avatar>
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
                                    {/* <MenuItem onClick={() => handleCloseEdit(post.docId)}><EditIcon />edit</MenuItem> */}
                                    <MenuItem onClick={() => handleCloseEdit(post.docId)}><EditIcon /><Link to="/post-edit" state={{selectedPostId: post.docId}}>Edit</Link></MenuItem>
                                    <MenuItem onClick={() => handleCloseDelete(post.docId)}><DeleteIcon />delete</MenuItem>
                                </Menu>
                                </> : null
                            }
                            </>
                        }
                        title={post.locationName}
                        subheader={`${formatRelative(
                            new Date(post.postTime.seconds * 1000),
                            new Date()
                          )}`}
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
                            <IconButton aria-label="chat with poster" onClick={() => setToggleMessage(true)} >
                                <ChatBubble />
                            </IconButton>
                            { toggleMessage && (
                                <form onSubmit={handleSubmit}>
                                    <TextField id="Message" label="Send Message" variant="outlined" value={message} onChange={(e) => setMessage(e.target.value) } />
                                    <Fab type='submit' color="primary" aria-label="add"><Send /></Fab>
                                </form>
                                ) }
                        </CardActions> : null
                    }
                  </Card>
                </InfoWindow> : null }
        </ Marker>
    )
}
