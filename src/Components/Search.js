import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { List, ListItem, ListItemText, ListSubheader, Avatar, ListItemAvatar, TextField, Box } from '@mui/material/'
import { decideRequest } from "../Store/relationsReducer";
import { auth, db } from '../Services/firebase'
import { onSnapshot, query, doc, where, collection, updateDoc, addDoc, getDocs } from "firebase/firestore";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useNavigate } from "react-router-dom";

const Search = () => {
  const dispatch = useDispatch()
  const [search, setSearch] = useState('')
  const [filtered, setFiltered] = useState([])
  const [relations, setRelations] = useState([[], [], []])
  const [flatRelations, setFlatRelations] = useState([''])
  const [filteredSearch, setFilteredSearch] = useState([[], [], [], []])
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const [chat, setChat] = useState(null);
  const [friend, setFriend] = useState(null);
  useEffect(() => {
    if (search === '' || search === null || search === undefined) {
      setFilteredSearch([filtered, ...relations])
    } else {
      const searchLower = search.toLowerCase()
      const all = filtered.filter(user => user.userName.toLowerCase().includes(searchLower) || user.firstName.toLowerCase().includes(searchLower) || user.lastName.toLowerCase().includes(searchLower))
      const p = relations[0].filter(user => user.userName.toLowerCase().includes(searchLower) || user.firstName.toLowerCase().includes(searchLower) || user.lastName.toLowerCase().includes(searchLower))
      const a = relations[1].filter(user => user.userName.toLowerCase().includes(searchLower) || user.firstName.toLowerCase().includes(searchLower) || user.lastName.toLowerCase().includes(searchLower))
      const r = relations[2].filter(user => user.userName.toLowerCase().includes(searchLower) || user.firstName.toLowerCase().includes(searchLower) || user.lastName.toLowerCase().includes(searchLower))
      console.log('FILTERED SEARCH IS: ', [all, p, a, r])
      setFilteredSearch([all, p, a, r])
    }
  }, [search, filtered, relations])

  useEffect(() => {
    const relations = onSnapshot(doc(db, 'friends', auth.currentUser.uid), (doc) => {
      const relationsArray = [[], [], []]
      const flatRelationsArray = []
      const document = doc.data()
      document.pending.forEach((relation) => {
        relationsArray[0].push(relation)
        flatRelationsArray.push(relation.uid)
      })
      document.accepted.forEach((relation) => {
        relationsArray[1].push(relation)
        flatRelationsArray.push(relation.uid)
      })
      document.requested.forEach((relation) => {
        relationsArray[2].push(relation)
        flatRelationsArray.push(relation.uid)
      })
      setFlatRelations(flatRelationsArray)
      setRelations(relationsArray)
    })
    return relations
  }, [])

  useEffect(() => {
    const usersSnapshot = onSnapshot(collection(db, 'users'), (allDocs) => {
      const filteredUsers = []
      allDocs.forEach((doc) => {
        const data = doc.data()
        if (!flatRelations.includes(data.posterId) && data.posterId !== auth.currentUser.uid) {
          filteredUsers.push({
            firstName: data.firstName,
            lastName: data.lastName,
            profilePic: data.profilePic,
            uid: data.posterId,
            userName: data.userName
          })
        }
      })
      setFiltered(filteredUsers)
    })
    return usersSnapshot
  }, [flatRelations])

  const handleClickOpen = async (friend) => {
    try {
        const chatRef = collection(db, 'chats');
        const q = query(chatRef, where('users', 'array-contains', auth.currentUser.uid ));
        const snapshot = await getDocs(q);
        let data =[];
        snapshot.forEach(item => {
            data.push(item.data());
        });
        [data] = data.filter(item => (item.users.includes(friend.uid) && item.users.includes(auth.currentUser.uid)));
        setChat(data);
    } catch (error) {
        console.error('Error in PostContent useCallback', error);
    }
    setFriend(friend);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (e, friend) => {
    console.log('HANDLE SUBMIT', friend.uid)
    e.preventDefault();
        if (message !== '') {
            const { uid } = auth.currentUser;
            if (chat) {
                const chatRef = doc(db, 'chats', chat.chatID);
                await updateDoc(chatRef, {
                  latestMessage: {createdAt: new Date(), text: message,},
                });
                const messageRef = collection(chatRef, 'messages');
                await addDoc(messageRef, {
                  createdAt: new Date(),
                  text: message,
                  userId: uid
                });
            } else {
                const chatRef = collection(db, 'chats');
                const data = await addDoc(chatRef, {
                    latestMessage: {createdAt: new Date(), text: message,},
                    users: [uid, friend.uid],
                    // userChatRef: {user1: post.postersId, user2: uid}
                });
                const messageRef = collection(doc(db, 'chats', data.id), 'messages');
                await addDoc(messageRef, {
                    createdAt: new Date(),
                    text: message,
                    userId: uid
                });
                await updateDoc(doc(db, 'chats', data.id), {chatID: data.id});
            }
        }
        setMessage('');
        navigate(`/chats`);
  };

  return (
    <div>
      <Box fullWidth style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        <TextField sx={{ width: 2/3 }} label="Search for Friends..." variant="standard" value={search} onChange={e => setSearch(e.target.value)}/>
      </Box>

      <List
        fullWidth
        style={{display: 'grid', alignItems: 'center', justifyContent: 'space-evenly'}}
        
        subheader={<li />}
      >
        {filteredSearch[0].length ? (
          <li key='notFriends'>
            <ul>
              <ListSubheader>
                {`Add a Friend`}
              </ListSubheader>
              {filteredSearch[0].map((add) => (
                  <ListItem key={`add-${add.uid}`}>
                    <ListItemAvatar>
                      <Avatar
                      src={add.profilePic}
                      sx={{
                        width: 75,
                        height: 75,
                        border: 0.5,
                        margin: "auto",
                      }}
                      />
                    </ListItemAvatar>
                    <ListItemText primary={`${add.firstName} ${add.lastName}`} secondary={`${add.userName}`}/>
                    <Button variant="outlined" onClick={() => dispatch(decideRequest(add.uid, 'add'))}>
                      Add Friend
                    </Button> 
                  </ListItem>
              ))}
            </ul>
          </li>
        ) : ''}

        {filteredSearch[1].length ? (
          <li key='pending'>
            <ul>
              <ListSubheader>
                {`${filteredSearch[1].length} Pending Request(s)`}
              </ListSubheader>
              {filteredSearch[1].map((pending) => (
                <ListItem key={`pending-${pending.uid}`}>
                  <ListItemAvatar>
                    <Avatar
                    src={pending.profilePic}
                    sx={{
                      width: 75,
                      height: 75,
                      border: 0.5,
                      margin: "auto",
                    }}
                    />
                  </ListItemAvatar>
                  <ListItemText primary={`${pending.firstName} ${pending.lastName}`} secondary={`${pending.userName}`}/>
                  <Button variant="outlined" onClick={() => dispatch(decideRequest(pending.uid, 'accept'))}>
                    Accept
                  </Button>
                  <Button variant="outlined" onClick={() => dispatch(decideRequest(pending.uid, 'decline'))}>
                    Decline
                  </Button>
                </ListItem>
              ))}
            </ul>
          </li>
        ) : ''}

        {filteredSearch[2].length ? (
          <li key='accepted'>
            <ul>
              <ListSubheader>
                {`${filteredSearch[2].length} Friend(s)`}
              </ListSubheader>
              {filteredSearch[2].map((accepted) => (
                <ListItem key={`accepted-${accepted.uid}`}>
                  <ListItemAvatar>
                    <Avatar
                    src={accepted.profilePic}
                    sx={{
                      width: 75,
                      height: 75,
                      border: 0.5,
                      margin: "auto",
                    }}
                    />
                  </ListItemAvatar>
                  <ListItemText primary={`${accepted.firstName} ${accepted.lastName}`} secondary={`${accepted.userName}`}/>
                  <Button variant="outlined" onClick={() => handleClickOpen(accepted)}>
                    Message
                  </Button>
                </ListItem>
              ))}
            </ul>
            <Dialog open={open} onClose={handleClose}>
              <DialogTitle> Send message to {friend && friend.userName}</DialogTitle>
              <DialogContent>
                <TextField
                  autoFocus
                  margin="dense"
                  id="name"
                  label="Type Message"
                  type="text"
                  fullWidth
                  variant="standard"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={(e) => handleSubmit(e, friend)}>Send Message</Button>
              </DialogActions>
            </Dialog>
          </li>
        ) : ''}

        {filteredSearch[3].length ? (
          <li key='requested'>
            <ul>
              <ListSubheader>
                {`${filteredSearch[3].length} Sent Request(s)`}
              </ListSubheader>
              {filteredSearch[3].map((request) => (
                <ListItem key={`request-${request.uid}`}>
                  <ListItemAvatar>
                    <Avatar
                    src={request.profilePic}
                    sx={{
                      width: 75,
                      height: 75,
                      border: 0.5,
                      margin: "auto",
                    }}
                    />
                  </ListItemAvatar>
                  <ListItemText primary={`${request.firstName} ${request.lastName}`} secondary={`${request.userName}`}/>
                  <Button variant="outlined">
                    Send a Reminder
                  </Button>
                </ListItem>
              ))}
            </ul>
          </li>
        ) : ''}

      </List>
    </div>
  )
}

export default Search
