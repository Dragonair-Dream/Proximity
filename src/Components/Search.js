import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, TextField } from '@mui/material'
import { AccountCircle } from '@mui/icons-material'
import { List, ListItem, ListItemText, ListSubheader } from '@mui/material/'
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
  /*
  const relations = useSelector(state => state.relations)
  const flatRelations = [...relations.accepted, ...relations.pending, ...relations.requested].map(user => user.uid)
  console.log('FLATRELATIONS IS: ', flatRelations)
  const users = useSelector(state => state.users)
  const filteredUsers = users.filter(user => !flatRelations.includes(user.posterId))
  */
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
  useEffect(() => {
    if (search === '' || search === null || search === undefined) {
      setFilteredSearch([filtered, ...relations])
    } else {
      const all = filtered.filter(user => user.userName.includes(search) || user.firstName.includes(search) || user.lastName.includes(search))
      const p = relations[0].filter(user => user.userName.includes(search) || user.firstName.includes(search) || user.lastName.includes(search))
      const a = relations[1].filter(user => user.userName.includes(search) || user.firstName.includes(search) || user.lastName.includes(search))
      const r = relations[2].filter(user => user.userName.includes(search) || user.firstName.includes(search) || user.lastName.includes(search))
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
    const usersQuery = query(collection(db, 'users'), where('posterId', 'not-in', flatRelations))
    const usersSnapshot = onSnapshot(usersQuery, (allDocs) => {
      const filteredUsers = []
      allDocs.forEach((doc) => {
        const data = doc.data()
        filteredUsers.push({
          firstName: data.firstName,
          lastName: data.lastName,
          profilePic: data.profilePic,
          uid: data.posterId,
          userName: data.userName
        })
      })
      setFiltered(filteredUsers)
    })
    return usersSnapshot
  }, [])

  const handleClickOpen = async (friendUid) => {
    try {
        const chatRef = collection(db, 'chats');
        const q = query(chatRef, where('users', 'array-contains', auth.currentUser.uid ));
        const snapshot = await getDocs(q);
        let data =[];
        snapshot.forEach(item => {
            data.push(item.data());
        });
        [data] = data.filter(item => (item.users.includes(friendUid) && item.users.includes(auth.currentUser.uid)));
        setChat(data);
    } catch (error) {
        console.error('Error in PostContent useCallback', error);
    }

    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (e, friendUid) => {
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
                    users: [uid, friendUid],
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
      <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
        <TextField id="input-with-sx" label="Search for Friends..." variant="standard" value={search} onChange={e => setSearch(e.target.value)}/>
        <AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
      </Box>

      <List
        sx={{
          width: '100%',
          maxWidth: 360,
          bgcolor: 'background.paper',
          position: 'relative',
          overflow: 'auto',
          maxHeight: 300,
          '& ul': { padding: 0 },
        }}
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
                  <ListItemText primary={`${add.firstName} ${add.lastName}`} />
                  <ListItemText secondary={`${add.userName}`} />
                  <button onClick={() => dispatch(decideRequest(add.uid, 'add'))}>Add Friend</button>
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
                  <ListItemText primary={`${pending.firstName} ${pending.lastName}`} />
                  <ListItemText secondary={`${pending.userName}`} />
                  <button onClick={() => dispatch(decideRequest(pending.uid, 'accept'))}>Accept</button>
                  <button onClick={() => dispatch(decideRequest(pending.uid, 'decline'))}>Decline</button>
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
                  <ListItemText primary={`${accepted.firstName} ${accepted.lastName}`} />
                  <ListItemText secondary={`${accepted.userName}`} />
                  <Button variant="outlined" onClick={() => handleClickOpen(accepted.uid)}>
                    Message
                  </Button>
                  <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>Send message to {accepted.userName}</DialogTitle>
                    <DialogContent>
                      <TextField
                        autoFocus
                        margin="dense"
                        id="message"
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
                      <Button onClick={(e) => handleSubmit(e, accepted.uid)}>Send Message</Button>
                    </DialogActions>
                  </Dialog>
                </ListItem>
              ))}
            </ul>
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
                  <ListItemText primary={`${request.firstName} ${request.lastName}`} />
                  <ListItemText secondary={`${request.userName}`} />
                  <button>Send a Reminder</button>
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
